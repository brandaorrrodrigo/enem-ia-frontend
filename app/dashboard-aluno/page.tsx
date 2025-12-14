/**
 * PÁGINA DE DEMONSTRAÇÃO - Dashboard Central do Aluno
 * Acesso: /dashboard-aluno
 */

import DashboardAluno from '@/components/dashboard/DashboardAluno';

export default function DashboardAlunoPage() {
  // TODO: Pegar userId real do sistema de autenticação
  // import { auth } from '@/lib/auth';
  // const session = await auth();
  // const userId = session?.user?.id || 'demo';

  const userId = 'demo'; // Usando ID demo para teste

  return <DashboardAluno userId={userId} />;
}
