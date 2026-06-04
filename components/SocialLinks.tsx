// components/SocialLinks.tsx

'use client'
import Link from 'next/link'
import { FaGithubSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: FaGithubSquare,
    tooltip: 'GitHub',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: FaLinkedin,
    tooltip: 'LinkedIn',
    color: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: FaXTwitter,
    tooltip: 'Twitter / X',
    color: 'hover:text-sky-500 dark:hover:text-sky-400',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/yourusername',
    icon: FaInstagramSquare,
    tooltip: 'Instagram',
    color: 'hover:text-pink-500 dark:hover:text-pink-400',
  },
]

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-2">
      {socials.map(({ name, href, icon: Icon, tooltip, color }) => (
        <Link
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`relative group p-2 rounded-lg
            text-gray-500 dark:text-gray-400
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200 ${color}`}
        >
          <Icon size={18} strokeWidth={1.75} />

          {/* Tooltip */}
          <span className="
            absolute -bottom-9 left-1/2 -translate-x-1/2
            px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
            bg-gray-900 dark:bg-gray-100
            text-white dark:text-gray-900
            opacity-0 scale-95 pointer-events-none
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-200 ease-out
            shadow-lg
          ">
            {tooltip}
            {/* Tooltip arrow */}
            <span className="
              absolute -top-1 left-1/2 -translate-x-1/2
              w-2 h-2 rotate-45
              bg-gray-900 dark:bg-gray-100
            " />
          </span>
        </Link>
      ))}
    </div>
  )
}

export default SocialLinks