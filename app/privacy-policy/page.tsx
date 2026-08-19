// app/privacy-policy/page.tsx

import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// Metadata
export const metadata: Metadata = {
  title: "Privacy Policy | Shaikh Arif",
  description:
    "Learn how Shaikh Arif collects, uses, and protects your personal information. Read our privacy policy to understand your rights.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Shaikh Arif",
    description:
      "Learn how Shaikh Arif collects, uses, and protects your personal information. Read our privacy policy to understand your rights.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Privacy Policy | Shaikh Arif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Shaikh Arif",
    description:
      "Learn how Shaikh Arif collects, uses, and protects your personal information. Read our privacy policy to understand your rights.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <section className='w-[92%] xl:w-[80%] mx-auto mt-1 pt-20 md:pt-25 mb-10'>
      <div className="inline-flex px-3 py-1 rounded-full text-sm sm:text-md font-semibold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-900/40 mb-4 transition-colors duration-300">
        Legal
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-3 sm:gap-5" >

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-3xl sm:text-4xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Privacy Policy
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-400 leading-relaxed tracking-wide">
            We are committed to protecting and respecting your privacy. This policy explains what data we collect, how we use it, and your rights regarding your information.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Information we collect and process
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-400 leading-relaxed tracking-wide">
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, <Link href="https://arif-portfolio-eosin.vercel.app/" className='text-sm hover:underline hover:text-violet-800 dark:hover:text-violet-400 font-mono'>https://arif-portfolio-eosin.vercel.app/</Link>, and other sites we own and operate. <br /> <br />
            We may collect and process the following data about you: <br />
          </p>

          <p className="text-lg font-semibold py-1 mt-3 text-[#1e293b] dark:text-gray-200">
            Information you provide
          </p>

          <p className="text-md text-zinc-700 dark:text-zinc-400 leading-relaxed tracking-wide">
            ✦ Information provided through forms on our site, such as contact details. <br />
            ✦ Correspondence records if you contact us. <br />
            ✦ Responses to surveys or questions, though responding is voluntary.
          </p>

          <p className="text-lg font-semibold py-1 mt-3 text-[#1e293b] dark:text-gray-200">
            Usage data
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            Details about your visits to our site, including pages viewed, time spent, and referring websites. This data helps us improve our website.
          </p>

          <p className="text-lg font-semibold py-1 mt-3 text-[#1e293b] dark:text-gray-200">
            Cookies
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            Our site uses cookies to enhance your browsing experience and provide essential functionalities. Cookies collect non-identifiable data, such as browser type, visitor location, and operating system. By using our website, you consent to cookie usage as described in this policy. If you prefer, you can adjust your browser settings to disable cookies, but some features may not work as intended. See <Link href="https://allaboutcookies.org" className='text-sm text-violet-800 dark:text-violet-400 underline font-mono'>www.allaboutcookies.org </Link> for more on cookies.
          </p>

          <p className="text-lg font-semibold py-1 mt-3 text-[#1e293b] dark:text-gray-200">
            IP Addresses
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            We may collect information about your device, such as IP address, operating system, and browser type, for system administration and analytical purposes. This data is anonymized and not used to identify any individual.
          </p>
        </div>


        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            How we use your information
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            We may use the information held about you for the following purposes:
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            ✦ Website Experience: To ensure content is presented effectively on your device. <br />
            ✦ Communication: To respond to any inquiries, contact you via WhatsApp or email, and provide requested information or services. <br />
            ✦ Improvement: To collect statistical data that helps us improve site management and enhance user experience. <br />
            ✦ Notifications: To inform you of any changes to our services, with your consent.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Data security
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            We implement strict procedures and security features to protect your personal information. However, please note that online transmission is not entirely secure, and we cannot guarantee the security of information sent to our site. Once we receive your data, we use appropriate security measures to prevent unauthorized access.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Disclosure of your information
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            WWe will not share your personal data with third parties except:
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            ✦ Where we have your consent. <br />
            ✦ Where necessary to fulfill a legal obligation. <br />
            ✦ For fraud prevention and credit risk reduction, if required by law. <br />
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Your rights
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            Under GDPR, you have the following rights:
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            ✦ Access: You may request access to the personal data we hold about you. <br />
            ✦ Rectification: You may request correction of inaccurate or incomplete personal data. <br />
            ✦ Deletion: You have the right to request deletion of your data under certain conditions. <br />
            ✦ Restriction and Objection: You may restrict our processing of your data or object to certain types of processing, such as direct marketing. <br />
            ✦ Data Portability: You may request a copy of your data in a structured, machine-readable format.
          </p>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            To exercise these rights, please use the <Link href="/contact" className='hover:underline text-violet-800 dark:text-violet-400 font-semibold font-mono'>contact form</Link> on our website.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Data retention
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            We retain your data only as long as necessary for the purposes stated in this policy or as required by law. If you wish to have your information deleted or updated, please contact us as described above.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Third-party links
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            Our site may contain links to external websites. Please be aware that these sites have their own privacy policies. We are not responsible for these policies and recommend reviewing them before submitting personal data to external websites.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Changes to this policy
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            Any updates to our privacy policy will be posted on this page, and, where appropriate, notified to you by email.
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <div className="text-xl sm:text-2xl font-bold text-[#1e293b] dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Acceptance of this policy
          </div>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed tracking-wide">
            Your continued use of our website will be regarded as acceptance of our practices regarding privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to <Link href="/contact" className='text-sm underline text-violet-800 dark:text-violet-400 font-mono'>contact us</Link>.
          </p>
        </div>

      </div>
    </section>
  )
}

export default page

