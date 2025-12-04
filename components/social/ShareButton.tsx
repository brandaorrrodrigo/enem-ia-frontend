'use client';

import { useState } from 'react';

interface ShareButtonProps {
  tipo: 'conquista' | 'nota' | 'streak' | 'liga' | 'desafio' | 'convite';
  valor?: string | number;
  titulo?: string;
  descricao?: string;
}

const gerarMensagemWhatsApp = (tipo: ShareButtonProps['tipo'], valor?: string | number, titulo?: string): string => {
  const mensagens: Record<ShareButtonProps['tipo'], string> = {
    conquista: `🏆 ACABEI DE DESBLOQUEAR: ${titulo || 'Nova Conquista'}!\n\n✨ Estou mandando muito bem no ENEM-IA!\n\n🚀 Bora estudar junto? Entre no ENEM-IA e me desafie!\n\n👉 enem-ia.com.br`,
    nota: `📝 FUI MUITO BEM NO SIMULADO!\n\n🎯 Tirei ${valor} pontos no ENEM-IA!\n\n📚 A plataforma e incrivel para treinar!\n\n🔥 Vem estudar comigo: enem-ia.com.br`,
    streak: `🔥 ${valor} DIAS SEGUIDOS ESTUDANDO!\n\n💪 Minha sequencia no ENEM-IA ta on fire!\n\n📖 Bora manter o ritmo? Me desafie!\n\n👉 enem-ia.com.br`,
    liga: `🏆 SUBI PARA ${valor?.toString().toUpperCase()}!\n\n⬆️ Nova liga desbloqueada no ENEM-IA!\n\n🎮 A competicao ta pegando fogo!\n\n🚀 Vem competir: enem-ia.com.br`,
    desafio: `⚡ VENCI O DESAFIO "${titulo}"!\n\n🏅 Mais uma vitoria no ENEM-IA!\n\n💥 Voce consegue me superar?\n\n👉 Entre e me desafie: enem-ia.com.br`,
    convite: `📚 To estudando pro ENEM de um jeito diferente!\n\n🎮 O ENEM-IA transforma estudo em game!\n✅ Mais de 100.000 questoes\n🏆 Ranking e desafios\n🤖 IA que explica tudo\n\n🔥 Vem comigo: enem-ia.com.br`,
  };

  return encodeURIComponent(mensagens[tipo]);
};

const gerarCodigoConvite = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = 'ENEM-';
  for (let i = 0; i < 5; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
};

export default function ShareButton({ tipo, valor, titulo, descricao }: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const codigoConvite = gerarCodigoConvite();

  const compartilharWhatsApp = () => {
    const mensagem = gerarMensagemWhatsApp(tipo, valor, titulo);
    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
  };

  const copiarTexto = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const getEmojiPorTipo = () => {
    const emojis: Record<ShareButtonProps['tipo'], string> = {
      conquista: '🏆',
      nota: '📝',
      streak: '🔥',
      liga: '💎',
      desafio: '⚡',
      convite: '📲',
    };
    return emojis[tipo];
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-ia-secondary flex items-center gap-2"
      >
        <span>📤</span>
        <span>Compartilhar</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card-ia max-w-md w-full p-6 relative">
            {/* Fechar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white/80"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{getEmojiPorTipo()}</div>
              <h3 className="title-ia-sm">Compartilhar Conquista</h3>
              <p className="text-white/60 text-sm mt-1">Mostre pros seus amigos!</p>
            </div>

            {/* Preview do que sera compartilhado */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white/80 text-sm leading-relaxed">
                {tipo === 'conquista' && `🏆 Nova conquista: ${titulo || 'Desbloqueada'}!`}
                {tipo === 'nota' && `📝 Nota: ${valor} pontos no simulado!`}
                {tipo === 'streak' && `🔥 ${valor} dias seguidos estudando!`}
                {tipo === 'liga' && `💎 Subiu para Liga ${valor}!`}
                {tipo === 'desafio' && `⚡ Venceu o desafio: ${titulo}!`}
                {tipo === 'convite' && `📚 Convite para estudar no ENEM-IA!`}
              </p>
            </div>

            {/* Botoes de compartilhamento */}
            <div className="space-y-3">
              <button
                onClick={compartilharWhatsApp}
                className="w-full py-3 rounded-xl font-semibold bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 transition"
              >
                <span>📱</span>
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => copiarTexto(`Bora estudar no ENEM-IA! Use meu codigo: ${codigoConvite}\n\n👉 enem-ia.com.br`)}
                className="w-full py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 transition"
              >
                <span>{copiado ? '✅' : '📋'}</span>
                <span>{copiado ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>

            {/* Codigo de convite */}
            {tipo === 'convite' && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs text-center mb-2">Seu codigo de convite:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-yellow-300 font-mono text-xl font-bold tracking-wider">
                    {codigoConvite}
                  </span>
                  <button
                    onClick={() => copiarTexto(codigoConvite)}
                    className="text-white/50 hover:text-white/80"
                  >
                    📋
                  </button>
                </div>
                <p className="text-white/40 text-xs text-center mt-2">
                  Ganhe 50 FP por cada amigo que usar seu codigo!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
