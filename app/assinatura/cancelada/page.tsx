'use client';

import Link from 'next/link';

export default function AssinaturaCanceladaPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '500px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {/* Cancel Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px',
          color: '#fff',
        }}>
          ✕
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: '2rem',
          marginBottom: '16px',
          fontWeight: 'bold',
        }}>
          Pagamento Cancelado
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          Voce cancelou o processo de pagamento.
          Nao se preocupe, nenhuma cobranca foi realizada.
        </p>

        {/* Info Box */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
        }}>
          <p style={{ color: '#93c5fd', fontSize: '0.95rem', margin: 0 }}>
            Ainda tem duvidas sobre os planos?
            Estamos aqui para ajudar!
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            href="/planos"
            style={{
              padding: '14px 24px',
              background: '#3b82f6',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'block',
            }}
          >
            Ver Planos Novamente
          </Link>
          <Link
            href="/enem/dashboard"
            style={{
              padding: '14px 24px',
              background: 'transparent',
              color: '#94a3b8',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
