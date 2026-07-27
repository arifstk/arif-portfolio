// components/SocialLinks.tsx 

'use client'
import { SocialItem } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaGithubSquare, FaLinkedin, FaInstagramSquare, FaYoutube, FaDribbble, FaWhatsapp } from "react-icons/fa"
import { FaXTwitter, FaTiktok, FaBehance } from "react-icons/fa6"
import { SiUpwork } from 'react-icons/si'


const iconMap: Record<string, React.ElementType> = {
  github: FaGithubSquare,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  instagram: FaInstagramSquare,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  dribbble: FaDribbble,
  behance: FaBehance,
  upwork: SiUpwork,
  whatsapp: FaWhatsapp,
}

const colorMap: Record<string, string> = {
  github: 'hover:text-gray-900 dark:hover:text-white',
  linkedin: 'hover:text-blue-600 dark:hover:text-blue-600 hover:bg-blue-100 hover:dark:bg-blue-900/30',
  twitter: 'hover:text-sky-500 dark:hover:text-sky-400',
  instagram: 'hover:text-pink-500 dark:hover:text-pink-400',
  youtube: 'hover:text-red-600 dark:hover:text-red-400',
  tiktok: 'hover:text-slate-900 dark:hover:text-slate-100',
  dribbble: 'hover:text-pink-400 dark:hover:text-pink-300',
  behance: 'hover:text-blue-700 dark:hover:text-blue-400',
  upwork: 'hover:text-black dark:hover:text-white',
  whatsapp: 'hover:text-green-800 hover:bg-green-100 hover:dark:bg-green-900/30',
}

export default function SocialLinks() {
  const [socials, setSocials] = useState<SocialItem[]>([])

  useEffect(() => {
    fetch('/api/socials')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSocials(data) })
      .catch(() => { })
  }, [])

  return (
    <div className="flex items-center gap-1.5">
      {socials.map(({ _id, name, href, iconName }) => {
        const Icon = iconMap[iconName.toLowerCase()] ?? FaGithubSquare
        const color = colorMap[iconName.toLowerCase()] ?? ''
        return (
          <Link
            key={_id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className={`relative group p-1 rounded-full border border-slate-400 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ${color}`}
          >
            <Icon size={18} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out shadow-lg z-10">
              {name}
              {/* Little triangle arrow pointing down */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-100" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}

