'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvatarUsuario from './AvatarUsuario';

interface AvatarUploaderProps {
  userName: string;
  currentAvatarUrl?: string | null;
  onAvatarChange?: (newUrl: string | null) => void;
}

export default function AvatarUploader({
  userName,
  currentAvatarUrl,
  onAvatarChange,
}: AvatarUploaderProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tamanho maximo: 2MB
  const MAX_SIZE = 2 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Tipo invalido. Use JPG, PNG ou WebP.');
      return;
    }

    // Validar tamanho
    if (file.size > MAX_SIZE) {
      setError('Foto muito pesada. Tamanho maximo: 2MB.');
      return;
    }

    // Fazer upload
    setIsUploading(true);
    setShowMenu(false);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.avatarUrl) {
        setAvatarUrl(data.avatarUrl);
        setSuccess('Foto atualizada com sucesso!');
        onAvatarChange?.(data.avatarUrl);
      } else {
        setError(data.error || 'Erro ao enviar foto.');
      }
    } catch (err) {
      setError('Erro de conexao. Tente novamente.');
    } finally {
      setIsUploading(false);
      // Limpar input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async () => {
    setError(null);
    setSuccess(null);
    setIsRemoving(true);
    setShowMenu(false);

    try {
      const response = await fetch('/api/profile/avatar', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setAvatarUrl(null);
        setSuccess('Foto removida com sucesso!');
        onAvatarChange?.(null);
      } else {
        setError(data.error || 'Erro ao remover foto.');
      }
    } catch (err) {
      setError('Erro de conexao. Tente novamente.');
    } finally {
      setIsRemoving(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
    setShowMenu(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Avatar clicavel */}
      <div style={{ position: 'relative' }}>
        <AvatarUsuario
          userName={userName}
          avatarUrl={avatarUrl}
          size="lg"
          showBorder
          onClick={() => setShowMenu(!showMenu)}
        />

        {/* Icone de camera/editar */}
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'var(--accent-yellow)',
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span style={{ fontSize: '14px' }}>📷</span>
        </motion.button>

        {/* Overlay de loading */}
        <AnimatePresence>
          {(isUploading || isRemoving) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'var(--accent-yellow)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Menu dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: 8,
              backgroundColor: 'rgba(30, 60, 40, 0.95)',
              border: '2px solid rgba(255, 217, 102, 0.3)',
              borderRadius: 12,
              padding: 8,
              minWidth: 160,
              zIndex: 50,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <button
              onClick={openFileDialog}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '10px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 8,
                color: 'var(--chalk-white)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-kalam)',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>📤</span>
              {avatarUrl ? 'Trocar foto' : 'Enviar foto'}
            </button>

            {avatarUrl && (
              <button
                onClick={handleRemoveAvatar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fca5a5',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-kalam)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 100, 100, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span>🗑️</span>
                Remover foto
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input file escondido */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Mensagens de feedback */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: showMenu ? 60 : 8,
              padding: '8px 16px',
              borderRadius: 8,
              backgroundColor: error ? 'rgba(239, 68, 68, 0.9)' : 'rgba(34, 197, 94, 0.9)',
              color: 'white',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-kalam)',
              whiteSpace: 'nowrap',
              zIndex: 51,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            {error || success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside para fechar menu */}
      {showMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
          }}
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
