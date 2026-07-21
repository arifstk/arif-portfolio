
'use client'
import { SocialItem } from '@/types'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LinkedInNavBtn = () => {
  const [linkedinUrl, setLinkedinUrl] = useState<string>('#');

  useEffect(() => {
    fetch('/api/socials')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Check 'name' or 'iconName' matching your SocialItem interface
          const linkedIn = data.find(
            (item: SocialItem) =>
              item.name?.toLowerCase() === 'linkedin' ||
              item.iconName?.toLowerCase() === 'linkedin'
          )
          if (linkedIn?.href) {
            setLinkedinUrl(linkedIn.href)
          }
        }
      })
      .catch(() => { })
  }, [])

  return (
    <div>

      <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <div className='relative group text-sm font-semibold flex items-center justify-center gap-1 text-gray-800 dark:text-gray-300 py-1 cursor-pointer'>
          <span>LinkedIn</span>
          {/* External Link Icon */}
          <ExternalLink className='w-4 h-4 opacity-80' />

          {/* Underline spans for hover effect ONLY */}
          <span className="absolute -bottom-0.5 right-1/2 h-0.5 w-0 bg-violet-700 transition-all duration-300 ease-out group-hover:w-1/2" />
          <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 bg-violet-700 transition-all duration-300 ease-out group-hover:w-1/2" />
        </div>
      </Link>
    </div>
  )
}

export default LinkedInNavBtn

// to use in the navbar (nav item)