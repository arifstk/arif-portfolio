// components/Helper/Home/Navbar/Nav.tsx

'use client'
import Link from 'next/link'
import ThemeToggler from '../../ThemeToggler'
import { NavLinks } from '@/Constant/Constant'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import MobileNav from './MobileNav'
import { useSession, signOut } from 'next-auth/react'
import LinkedInNavBtn from '@/components/LinkedInNavBtn'

const Nav = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = (session?.user as any)?.role

  return (
    <div>
      <div className='transition-all duration-200 py-1.5 z-100 fixed w-full bg-white/90 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-600'>
        <div className='flex items-center justify-between w-[92%] xl:w-[80%] mx-auto h-full'>
          {/* Logo */}
          <Logo />
          <div className='flex items-center gap-0 md:gap-4'>

            {/* Desktop Navigation Links */}
            <nav className='hidden sm:flex items-center gap-6'>
              {NavLinks.map((link) => {
                const active = pathname === link.path
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className='relative group text-sm font-semibold transition-colors duration-200 py-1 text-gray-800 dark:text-gray-300'
                  >
                    {link.name}
                    {/* Underline spans for active/hover effect */}
                    <span className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-violet-700 transition-all duration-300 ease-out ${active ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                    <span className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-violet-700 transition-all duration-300 ease-out ${active ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                  </Link>
                )
              })}
            </nav>

            {/* LinkedIn Nav Button */}
            <div className='hidden md:flex'>
              <LinkedInNavBtn />
            </div>

            {/* contact */}
            <Link href={'/contact'}
              className='text-sm bg-violet-700 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 font-medium px-3 py-1.5 rounded-xl text-white transition-colors duration-200 dark:backdrop-blur-sm'
            >
              Contact
            </Link>
            <ThemeToggler />

            {/* Auth actions — desktop only */}
            {session && (
              <div className='hidden md:flex items-center gap-3'>
                {role === 'admin' && (
                  <Link
                    href='/admin/dashboard'
                    className='text-sm font-medium px-3 py-1.5 rounded-md bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors duration-200'
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className='text-sm font-medium px-3 py-1.5 rounded-md  text-gray-100 dark:text-gray-300  bg-red-500  hover:bg-red-600 transition-colors duration-200 cursor-pointer'
                >
                  Logout
                </button>
              </div>
            )}
            {/* Mobile Navigation */}
            <div className='md:hidden'>
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav 
