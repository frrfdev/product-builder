import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-between p-24"></main>
  );
}
