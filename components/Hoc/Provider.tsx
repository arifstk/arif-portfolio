// components/Hoc/Provider.tsx
'use client'
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes'
import React from 'react'

const Provider = ({ children, session }: { children: React.ReactNode; session: any }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider >
  )
}

export default Provider
