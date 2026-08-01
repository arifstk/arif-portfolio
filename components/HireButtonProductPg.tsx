import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import HireButtonModel from "@/models/HireButton";

async function getHireButtonData() {
  try {
    await connectDB();
    const doc = await HireButtonModel.findOne().lean();
    return (doc as any) ?? { logo: "", text: "Hire on Upwork", link: "#" };
  } catch {
    return { logo: "", text: "Hire on Upwork", link: "#" };
  }
}

export default async function HireButtonProductPg() {
  const hireButton = await getHireButtonData();

  return (
    <div className="relative overflow-hidden mt-3 mb-0 rounded-2xl bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 shadow-[0_10px_50px_rgba(139,92,246,0.15)] dark:shadow-[0_10px_50px_rgba(139,92,246,0.1)] px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-between border border-violet-200 dark:border-slate-800">

      <span className="absolute -bottom-1.5 sm:-bottom-6 -left-1.5 sm:-left-6 text-6xl sm:text-8xl md:text-9xl font-black text-violet-900/5 dark:text-violet-100/5 select-none pointer-events-none tracking-tighter uppercase z-0">
        Works
      </span>

      <div className='col-span-2'>
        {/* <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">Let's Work Together</p> */}
        <h2 className="text-2xl md:text-4xl font-semibold text-slate-700 dark:text-slate-200 tracking-wider mb-3">
          Selected <span className='text-violet-600 dark:text-violet-400 font-extrabold'>Next Js, Typescript, Tailwind, Mongodb</span> Projects
        </h2>
        <p className="text-base text-gray-600 dark:text-slate-300 flex items-center tracking-normal leading-relaxed">
          Share the scope, blockers, timeline, and outcome you're looking for. I'll review the context and follow up with clear next steps.
        </p>
      </div>
      <div className='flex flex-col gap-3 sm:pl-4 items-start sm:items-end w-full'>
        <Link href="/contact">
          <button className='group bg-violet-700 hover:bg-violet-600 text-white shadow-md shadow-violet-700/20 dark:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-200 font-semibold text-sm py-2.5 px-5 rounded-full cursor-pointer flex items-center justify-center gap-2'>
            Let's Talk <MoveRight className="w-6 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
          </button>
        </Link>
        <Link href={hireButton.link || "#"} target="_blank" rel="noopener noreferrer">
          <button className='group bg-transparent hover:bg-violet-100 dark:hover:bg-violet-950/40 text-gray-800 dark:text-white font-semibold text-sm py-2.5 px-5 rounded-full cursor-pointer flex items-center justify-center gap-1 ring-1 ring-violet-500/50 transition-all duration-200'>
            {hireButton.logo && (
              <Image src={hireButton.logo} alt="" width={16} height={16} className="object-contain rounded-sm" />
            )}
            {hireButton.text || "Hire on Upwork"} <MoveRight className="w-6 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

