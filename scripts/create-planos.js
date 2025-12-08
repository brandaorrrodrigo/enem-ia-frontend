const fs = require('fs');

const content = `'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PLANS } from '@/lib/stripe/config';

export default function PlanosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      setUsuarioId(user.id);
    }
  }, []);

  const handleAssinar = async (plano: 'pro' | 'premium') => {
    if (!usuarioId) {
      router.push('/login?redirect=/planos');
      return;
    }

    setLoading(plano);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, plano }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Erro ao iniciar checkout');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(null);
    }
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '16px',
          }}>
            Escolha seu Plano
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Desbloqueie todo o potencial dos seus estudos com recursos exclusivos
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}>
          {/* Free Plan */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>
                {PLANS.free.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>R$ 0</span>
                <span style={{ color: '#94a3b8' }}>/mes</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
              {PLANS.free.features.map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  color: '#cbd5e1',
                }}>
                  <span style={{ color: '#22c55e' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              disabled
              style={{
                marginTop: '24px',
                padding: '14px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'transparent',
                color: '#94a3b8',
                fontSize: '1rem',
                cursor: 'not-allowed',
              }}
            >
              Plano Atual
            </button>
          </div>

          {/* PRO Plan */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
            borderRadius: '16px',
            padding: '32px',
            border: '2px solid #3b82f6',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transform: 'scale(1.02)',
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#3b82f6',
              color: '#fff',
              padding: '4px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}>
              MAIS POPULAR
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>{PLANS.pro.name}</h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>{formatPrice(PLANS.pro.price)}</span>
                <span style={{ color: '#94a3b8' }}>/mes</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
              {PLANS.pro.features.map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  color: '#cbd5e1',
                }}>
                  <span style={{ color: '#3b82f6' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleAssinar('pro')}
              disabled={loading === 'pro'}
              style={{
                marginTop: '24px',
                padding: '14px 24px',
                borderRadius: '8px',
                border: 'none',
                background: '#3b82f6',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading === 'pro' ? 'wait' : 'pointer',
              }}
            >
              {loading === 'pro' ? 'Processando...' : 'Assinar PRO'}
            </button>
          </div>

          {/* Premium Plan */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
            borderRadius: '16px',
            padding: '32px',
            border: '2px solid #a855f7',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>{PLANS.premium.name}</h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>{formatPrice(PLANS.premium.price)}</span>
                <span style={{ color: '#94a3b8' }}>/mes</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
              {PLANS.premium.features.map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  color: '#cbd5e1',
                }}>
                  <span style={{ color: '#a855f7' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleAssinar('premium')}
              disabled={loading === 'premium'}
              style={{
                marginTop: '24px',
                padding: '14px 24px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading === 'premium' ? 'wait' : 'pointer',
              }}
            >
              {loading === 'premium' ? 'Processando...' : 'Assinar Premium'}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '60px', textAlign: 'center', color: '#94a3b8' }}>
          <h3 style={{ color: '#fff', marginBottom: '16px' }}>Duvidas Frequentes</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            textAlign: 'left',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ color: '#fff', marginBottom: '8px' }}>Posso cancelar a qualquer momento?</h4>
              <p style={{ fontSize: '0.9rem' }}>Sim! Voce pode cancelar quando quiser, sem multas.</p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ color: '#fff', marginBottom: '8px' }}>Como funciona o pagamento?</h4>
              <p style={{ fontSize: '0.9rem' }}>Cobranca mensal automatica no cartao via Stripe (100% seguro).</p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ color: '#fff', marginBottom: '8px' }}>Ganho FP ao assinar?</h4>
              <p style={{ fontSize: '0.9rem' }}>Sim! PRO ganha 500 FP e Premium ganha 1000 FP de bonus.</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => router.back()}
            style={{
              padding: '10px 24px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
`;

fs.mkdirSync('D:/enem-ia/enem-pro/app/planos', { recursive: true });
fs.writeFileSync('D:/enem-ia/enem-pro/app/planos/page.tsx', content);
console.log('Created planos page');
