'use client';

import Chat from '@/app/sections/chat';
import Default from '@/app/sections/default';
import Forms from '@/app/sections/forms';

const Home = () => (
  <div className='max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8'>
    <header className='flex flex-col gap-1'>
      <h1 className='text-3xl font-bold tracking-tight'>Faktion UI</h1>
      <p className='text-muted-foreground'>A custom UI library for Faktion.</p>
    </header>
    <main className='flex flex-col flex-1 gap-8'>
      <Default />
      <Forms />
      <Chat />
    </main>
  </div>
);

export default Home;
