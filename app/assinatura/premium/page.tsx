'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AssinaturaPremiumContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      setUsuarioId(user.id);
    }
  }, []);

  const handleAssinar = async () => {
    if (!usuarioId) {
      router.push('/login?redirect=/assinatura/premium');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, plano: 'premium' }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erro ao iniciar checkout');
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/planos" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
          ← Voltar aos planos
        </Link>

        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
          borderRadius: '24px',
          padding: '40px',
          border: '2px solid #a855f7',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
              color: '#fff',
              padding: '4px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}>
              COMPLETO
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '8px', textAlign: 'center' }}>
            Plano Premium
          </h1>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>R$ 69,00</span>
            <span style={{ color: '#94a3b8' }}>/mes</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
            {[
              'Tudo do PRO',
              '30 convites por mes',
              'Simulados personalizados por IA',
              'Plano de estudos adaptativo',
              'Correcao de redacao por IA',
              'Mentoria em grupo',
              'Badge exclusiva Premium',
              '+1000 FP de bonus',
            ].map((feature, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                color: '#cbd5e1',
              }}>
                <span style={{ color: '#a855f7', fontSize: '1.2rem' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#f87171',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleAssinar}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Redirecionando...' : 'Assinar Premium Agora'}
          </button>

          <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginTop: '16px' }}>
            Pagamento seguro via Stripe. Cancele quando quiser.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AssinaturaPremiumPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#fff' }}>Carregando...</div></div>}>
      <AssinaturaPremiumContent />
    </Suspense>
  );
}
