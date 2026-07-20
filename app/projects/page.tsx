// app/projects/page.tsx

import HireButtonProductPg from '@/components/HireButtonProductPg'
import Projects from '@/components/Projects'
import React from 'react'

const page = () => {
  return (
    <div className="pt-15 md:pt-25 mb-10">
      <div className='w-[92%] xl:w-[80%] mx-auto'>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6d7f98] mb-2">
          Selected Works
        </p>
        <h4 className="text-sm tracking-wide text-[#6d7f98] mb-2 pb-3">
          Selected Next.js Full-Stack Projects to work across production systems and internal tools
        </h4>
        <HireButtonProductPg />
      </div>
      <Projects />
    </div>
  )
}

export default page

