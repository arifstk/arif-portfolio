// components/Helper/Home/Navbar/Nav.tsx

'use client'
import Link from 'next/link'
import ThemeToggler from '../../ThemeToggler'
import { NavLinks } from '@/Constant/Constant'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import MobileNav from './MobileNav'

const Nav = () => {
  const pathname = usePathname()

  return (
    <div>
      <div className='transition-all duration-200 h-[12vh] z-100 fixed w-full backdrop-blur-sm border-b border-gray-300 dark:border-gray-500'>
        <div className='flex items-center justify-between w-[90%] xl:w-[80%] mx-auto h-full'>
          {/* Logo */}
          {/* <div className='text-2xl font-bold'>Logo</div> */}
          <Logo />
          {/* Desktop Navigation Links */}
          <nav className='hidden md:flex items-center gap-6'>
            {NavLinks.map((link) => {
              const active = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative group text-sm font-medium transition-colors duration-200 py-1
                    ${active
                      ? 'text-blue-800 dark:text-blue-400'
                      : 'text-gray-800 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400'
                    }`}
                >
                  {link.name}
                  {/* Underline spans for active/hover effect */}
                  <span className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-indigo-500 transition-all duration-300 ease-out ${active ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                  <span className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-indigo-500 transition-all duration-300 ease-out ${active ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} />
                </Link>
              )
            })}
          </nav>
          <div className='flex items-center gap-4'>
            <ThemeToggler />
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
