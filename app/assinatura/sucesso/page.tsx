'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AssinaturaSucessoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Simular verificacao do pagamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }} />
          <p style={{ fontSize: '1.2rem' }}>Confirmando seu pagamento...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

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
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px',
        }}>
          ✓
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: '2rem',
          marginBottom: '16px',
          fontWeight: 'bold',
        }}>
          Assinatura Ativada!
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          Parabens! Sua assinatura foi ativada com sucesso.
          Voce ja pode aproveitar todos os recursos exclusivos.
        </p>

        {/* Bonus FP */}
        <div style={{
          background: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
        }}>
          <p style={{ color: '#eab308', fontSize: '1rem', margin: 0 }}>
            <strong>+500 a +1000 FP</strong> foram adicionados a sua conta como bonus de boas-vindas!
          </p>
        </div>

        {/* Features unlocked */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          textAlign: 'left',
        }}>
          <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '1rem' }}>
            Recursos desbloqueados:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Simulados ilimitados
            </li>
            <li style={{ color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Batalhas ilimitadas
            </li>
            <li style={{ color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Todas questoes comentadas
            </li>
            <li style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#22c55e' }}>✓</span> Relatorios de desempenho
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            href="/enem/dashboard"
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
            Ir para o Dashboard
          </Link>
          <Link
            href="/enem/simulado"
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
            Comecar um Simulado
          </Link>
        </div>
      </div>
    </div>
  );
}
