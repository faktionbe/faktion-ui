import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AppSidebar } from '@/components/blocks/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Registry',
  description: 'Custom registry for components',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='en'>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
            </div>
          </header>
          <main className='m-4 flex h-full flex-col gap-4 overflow-auto'>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </body>
  </html>
);

export default RootLayout;
