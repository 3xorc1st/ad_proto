// app/layout.tsx
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Provider from './Provider';
import { FacebookPostApplet } from '@/components/applets/FacebookPostApplet';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Automatify',
  description: 'Automation tool',
};

const applets = [new FacebookPostApplet()];

// Use applets to handle events and actions
applets.forEach(applet => {
  applet.trigger({ type: 'someEvent' });
  applet.action({ message: 'Hello, Facebook!' });
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3371FF',
          fontSize: '16px',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen font-sans antialiased',
            fontSans.variable
          )}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}