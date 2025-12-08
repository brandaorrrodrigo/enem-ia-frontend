// Sistema Anti-Cheat para o Pomodoro
// Detecta quando usuario sai da aba/pagina

type AntiCheatCallback = {
  onBlur: () => void;
  onFocus: () => void;
  onVisibilityHidden: () => void;
  onVisibilityVisible: () => void;
};

let blurTimeout: NodeJS.Timeout | null = null;
const BLUR_PAUSE_DELAY = 3000; // 3 segundos

export function setupAntiCheat(callbacks: AntiCheatCallback) {
  if (typeof window === 'undefined') return () => {};

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Usuario saiu da aba
      blurTimeout = setTimeout(() => {
        callbacks.onVisibilityHidden();
      }, BLUR_PAUSE_DELAY);
    } else {
      // Usuario voltou
      if (blurTimeout) {
        clearTimeout(blurTimeout);
        blurTimeout = null;
      }
      callbacks.onVisibilityVisible();
    }
  };

  const handleBlur = () => {
    blurTimeout = setTimeout(() => {
      callbacks.onBlur();
    }, BLUR_PAUSE_DELAY);
  };

  const handleFocus = () => {
    if (blurTimeout) {
      clearTimeout(blurTimeout);
      blurTimeout = null;
    }
    callbacks.onFocus();
  };

  // Adicionar listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);

  // Cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', handleBlur);
    window.removeEventListener('focus', handleFocus);
    if (blurTimeout) {
      clearTimeout(blurTimeout);
    }
  };
}

// Som de notificacao
export function playNotificationSound() {
  if (typeof window === 'undefined') return;

  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch {
    // Audio nao suportado
  }
}

// Vibracao no mobile
export function vibrate() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
}

// Notificacao do sistema
export async function showNotification(title: string, body: string) {
  if (typeof window === 'undefined') return;

  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/favicon.ico' });
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }
}
