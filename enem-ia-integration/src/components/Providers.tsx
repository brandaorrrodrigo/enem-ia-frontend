'use client';

import { AuthProvider } from '@/hooks';
import ToastContainer from '@/components/ui/ToastContainer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  );
}
