// components/SourceCodeButton.tsx

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaGithubSquare } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'

interface SourceCodeButtonProps {
  githubUrl: string
  projectTitle: string
  className?: string
}

const defaultClassName =
  'flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-[#1e293b] dark:text-slate-100 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 transition-all duration-200'

export default function SourceCodeButton({ githubUrl, projectTitle, className }: SourceCodeButtonProps) {
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  async function handleClick() {
    if (checking || !githubUrl) return

    setChecking(true)
    try {
      const res = await fetch(`/api/check-repo?url=${encodeURIComponent(githubUrl)}`)
      const data = await res.json()

      if (data.available === false) {
        // Confirmed private or missing — send to the custom fallback page.
        router.push(`/source-unavailable?project=${encodeURIComponent(projectTitle)}`)
        return
      }

      // available === true, or null/unknown (couldn't verify, e.g. rate-limited)
      // — fail open rather than blocking the user over something unrelated.
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    } catch {
      window.open(githubUrl, '_blank', 'noopener,noreferrer')
    } finally {
      setChecking(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={checking}
      className={`${className ?? defaultClassName} disabled:opacity-60 disabled:cursor-wait cursor-pointer`}
    >
      {checking ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Checking...
        </>
      ) : (
        <>
          <FaGithubSquare className="w-4 h-4 rounded-md" />
          Source Code
        </>
      )}
    </button>
  )
}

