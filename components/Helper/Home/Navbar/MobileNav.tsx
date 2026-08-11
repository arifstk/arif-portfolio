// components/Helper/Home/Navbar/MobileNav.tsx

'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLinks } from '@/Constant/Constant'
import SocialLinks from '@/components/SocialLinks'
import { useSession, signOut } from 'next-auth/react'

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const role = (session?.user as any)?.role

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const totalLinks = NavLinks.length

  return (
    <>
      {/* ── Hamburger button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 bg-slate-800 dark:bg-slate-100 transition-all duration-300 ease-in-out ${open ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
        <span className={`block h-0.5 bg-slate-800 dark:bg-slate-100 transition-all duration-300 ease-in-out ${open ? 'w-0 opacity-0' : 'w-4'}`} />
        <span className={`block h-0.5 bg-slate-800 dark:bg-slate-100 transition-all duration-300 ease-in-out ${open ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
      </button>

      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* ── Sidebar ── */}
      <div
        ref={sidebarRef}
        className={`fixed top-13 left-0 right-0 h-screen w-full z-50 md:hidden
          bg-violet-100/90 dark:bg-gray-950/90 
          shadow-2xl border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >

        {/* Nav Links */}
        <nav className="flex flex-col px-2 py-6 gap-1">
          {NavLinks.map((link, index) => {
            const active = pathname === link.path
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)
                style={{ transitionDelay: open ? `${index * 50}ms` : '0ms' }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                  ${active
                    ? 'font-semibold bg-violet-100 hover:bg-violet-200 border border-violet-200 dark:border-violet-800 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {link.name}
                {active && (
                  <span className="ml-auto w-1 h-4 rounded-full bg-violet-800 dark:bg-violet-200" />
                )}
              </Link>
            )
          })}

          {/* ── Admin Dashboard link ── */}
          {session && role === 'admin' && (
            <Link
              href="/admin/dashboard"
              onClick={() => setOpen(false)
              style={{ transitionDelay: open ? `${totalLinks * 50}ms` : '0ms' }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                ${pathname === '/admin/dashboard'
                  ? 'bg-violet-600 dark:bg-violet-900/60 text-white'
                  : 'text-violet-500 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30'
                }`}
            >
              Admin Dashboard
              {pathname === '/admin/dashboard' && (
                <span className="ml-auto w-1 h-4 rounded-full bg-white dark:bg-violet-400" />
              )}
            </Link>
          )}

          {/* ── Logout button ── */}
          {session && (
            <button
              onClick={() => {
  setOpen(false)
  signOut({ callbackUrl: '/' })
}}
              style={{ transitionDelay: open ? `${(totalLinks + (role === 'admin' ? 1 : 0)) * 50}ms` : '0ms' }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 w-full text-left
                ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30`}
            >
              Logout
            </button>
          )}

        </nav>
        <div className='px-6'>
          <SocialLinks />
        </div>
      </div>
    </>
  )
}

export default MobileNav

