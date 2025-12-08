import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PomodoroStatus = 'idle' | 'running' | 'paused' | 'break' | 'longBreak';

interface PomodoroState {
  // Estado principal
  status: PomodoroStatus;
  timeRemaining: number; // em segundos
  currentCycle: number;
  totalCycles: number;
  isCompact: boolean;

  // Configuracoes
  workDuration: number; // 25 min em segundos
  breakDuration: number; // 5 min em segundos
  longBreakDuration: number; // 15 min em segundos
  cyclesUntilLongBreak: number;

  // Anti-cheat
  tabSwitchCount: number;
  totalPausedTime: number;
  pauseStartTime: number | null;
  lastTickTime: number;

  // Acoes
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
  toggleCompact: () => void;
  startBreak: () => void;
  skipBreak: () => void;
  recordTabSwitch: () => void;

  // Helpers
  canEarnFP: () => boolean;
  getProgressPercent: () => number;
  formatTime: () => string;
}

const WORK_DURATION = 25 * 60; // 25 minutos
const BREAK_DURATION = 5 * 60; // 5 minutos
const LONG_BREAK_DURATION = 15 * 60; // 15 minutos
const CYCLES_UNTIL_LONG_BREAK = 4;

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      status: 'idle',
      timeRemaining: WORK_DURATION,
      currentCycle: 1,
      totalCycles: 4,
      isCompact: false,

      // Configuracoes
      workDuration: WORK_DURATION,
      breakDuration: BREAK_DURATION,
      longBreakDuration: LONG_BREAK_DURATION,
      cyclesUntilLongBreak: CYCLES_UNTIL_LONG_BREAK,

      // Anti-cheat
      tabSwitchCount: 0,
      totalPausedTime: 0,
      pauseStartTime: null,
      lastTickTime: Date.now(),

      // Iniciar pomodoro
      start: () => {
        set({
          status: 'running',
          timeRemaining: get().workDuration,
          tabSwitchCount: 0,
          totalPausedTime: 0,
          pauseStartTime: null,
          lastTickTime: Date.now(),
        });
      },

      // Pausar
      pause: () => {
        const now = Date.now();
        set({
          status: 'paused',
          pauseStartTime: now,
        });
      },

      // Retomar
      resume: () => {
        const { pauseStartTime, totalPausedTime } = get();
        const now = Date.now();
        const pausedDuration = pauseStartTime ? (now - pauseStartTime) / 1000 : 0;

        set({
          status: 'running',
          pauseStartTime: null,
          totalPausedTime: totalPausedTime + pausedDuration,
          lastTickTime: now,
        });
      },

      // Parar/Resetar
      stop: () => {
        set({
          status: 'idle',
          timeRemaining: WORK_DURATION,
          currentCycle: 1,
          tabSwitchCount: 0,
          totalPausedTime: 0,
          pauseStartTime: null,
        });
      },

      // Tick do timer (chamado a cada segundo)
      tick: () => {
        const { status, timeRemaining, currentCycle, cyclesUntilLongBreak } = get();

        if (status !== 'running' && status !== 'break' && status !== 'longBreak') {
          return;
        }

        const now = Date.now();
        set({ lastTickTime: now });

        if (timeRemaining <= 1) {
          // Ciclo terminou
          if (status === 'running') {
            // Fim do trabalho - iniciar descanso
            const isLongBreak = currentCycle % cyclesUntilLongBreak === 0;
            set({
              status: isLongBreak ? 'longBreak' : 'break',
              timeRemaining: isLongBreak ? get().longBreakDuration : get().breakDuration,
            });
          } else {
            // Fim do descanso - proximo ciclo ou idle
            const nextCycle = currentCycle + 1;
            set({
              status: 'idle',
              currentCycle: nextCycle > get().totalCycles ? 1 : nextCycle,
              timeRemaining: get().workDuration,
              tabSwitchCount: 0,
              totalPausedTime: 0,
            });
          }
        } else {
          set({ timeRemaining: timeRemaining - 1 });
        }
      },

      // Alternar modo compacto
      toggleCompact: () => {
        set({ isCompact: !get().isCompact });
      },

      // Iniciar descanso manualmente
      startBreak: () => {
        const { currentCycle, cyclesUntilLongBreak } = get();
        const isLongBreak = currentCycle % cyclesUntilLongBreak === 0;
        set({
          status: isLongBreak ? 'longBreak' : 'break',
          timeRemaining: isLongBreak ? get().longBreakDuration : get().breakDuration,
        });
      },

      // Pular descanso
      skipBreak: () => {
        const { currentCycle, totalCycles } = get();
        const nextCycle = currentCycle + 1;
        set({
          status: 'idle',
          currentCycle: nextCycle > totalCycles ? 1 : nextCycle,
          timeRemaining: get().workDuration,
          tabSwitchCount: 0,
          totalPausedTime: 0,
        });
      },

      // Registrar troca de aba
      recordTabSwitch: () => {
        set({ tabSwitchCount: get().tabSwitchCount + 1 });
      },

      // Verificar se pode ganhar FP
      canEarnFP: () => {
        const { tabSwitchCount, totalPausedTime, workDuration } = get();
        const maxPausedPercent = 0.2; // 20%
        const maxTabSwitches = 2;

        const pausedPercent = totalPausedTime / workDuration;
        return tabSwitchCount <= maxTabSwitches && pausedPercent <= maxPausedPercent;
      },

      // Porcentagem de progresso
      getProgressPercent: () => {
        const { status, timeRemaining, workDuration, breakDuration, longBreakDuration } = get();
        let totalDuration = workDuration;

        if (status === 'break') totalDuration = breakDuration;
        if (status === 'longBreak') totalDuration = longBreakDuration;

        return ((totalDuration - timeRemaining) / totalDuration) * 100;
      },

      // Formatar tempo
      formatTime: () => {
        const { timeRemaining } = get();
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      },
    }),
    {
      name: 'pomodoro-storage',
      partialize: (state) => ({
        status: state.status,
        timeRemaining: state.timeRemaining,
        currentCycle: state.currentCycle,
        tabSwitchCount: state.tabSwitchCount,
        totalPausedTime: state.totalPausedTime,
        lastTickTime: state.lastTickTime,
        isCompact: state.isCompact,
      }),
    }
  )
);
