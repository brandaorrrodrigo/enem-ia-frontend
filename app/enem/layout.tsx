'use client';

import PomodoroFloating from '@/components/PomodoroFloating';

export default function EnemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PomodoroFloating />
    </>
  );
}
