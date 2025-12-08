'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssinaturaMensalPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a pagina de planos PRO
    router.replace('/assinatura/pro');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ color: '#fff' }}>Redirecionando...</div>
    </div>
  );
}
