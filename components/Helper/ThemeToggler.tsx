// components/Helper/ThemeToggler.tsx

'use client'
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    const mountCheck = () => {
      setMounted(true);
    }
    mountCheck();
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className='p-2 transition w-10 h-10 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center'>
      {
        currentTheme === "dark" ? (
          <Sun className='text-white w-5 h-5 cursor-pointer' />
        ) : (
          <Moon className='text-gray-800 w-5 h-5 cursor-pointer' />
        )
      }
    </button>
  )
}

export default ThemeToggler
