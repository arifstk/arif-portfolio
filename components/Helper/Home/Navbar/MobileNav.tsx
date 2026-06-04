// components/Helper/Home/Navbar/MobileNav.tsx

'use client'
// components/Helper/Home/Navbar/MobileNav.tsx
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLinks } from '@/Constant/Constant'

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

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
        className={`fixed top-20 left-0 right-0 h-[calc(100vh-4.25rem)] w-full z-50 md:hidden
          bg-white/90 dark:bg-gray-950/90 
          shadow-2xl border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >

        {/* Nav Links */}
        <nav className="flex flex-col px-4 py-6 gap-1">
          {NavLinks.map((link, index) => {
            const active = pathname === link.path
            return (
              <Link
                key={link.path}
                href={link.path}
                style={{ transitionDelay: open ? `${index * 50}ms` : '0ms' }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                  ${active
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {/* <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${active ? 'bg-blue-500 dark:bg-blue-400' : 'bg-transparent'}`}
                /> */}
                {link.name}
                {active && (
                  <span className="ml-auto w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-400" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
