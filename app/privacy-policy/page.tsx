// app/privacy-policy/page.tsx

const page = () => {
  return (
    <section className='w-[92%] xl:w-[80%] mx-auto mt-1 pt-20 md:pt-25 mb-10'>
      <div className="inline-flex px-3 py-1 rounded-full text-md font-semibold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-900/40 mb-4 transition-colors duration-300">
        Legal
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-4 sm:gap-10" >
        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-3xl sm:text-4xl font-bold text-[#1e293b] dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Privacy Policy
          </div>
          <p className="text-md text-[#64748b] dark:text-gray-400 leading-relaxed">
            We are committed to protecting and respecting your privacy. This policy explains what data we collect, how we use it, and your rights regarding your information.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Information we collect and process
          </div>
          <p className="text-md text-[#64748b] dark:text-gray-400 leading-relaxed">
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, https://alaminshaikh.com/, and other sites we own and operate. 
            We may collect and process the following data about you:
          </p>
        </div>
      </div>

    </section>
  )
}

export default page
