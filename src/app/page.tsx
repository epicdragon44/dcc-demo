import Link from "next/link";

export default async function Home() {
    return (
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
                <p className='text-2xl tracking-tighter'>
                    <b>Welcome to the Live Grading system.</b>
                    <br />
                    Please select your role to proceed.
                </p>

                <div className='flex gap-4 items-center flex-col sm:flex-row'>
                    <Link
                        className='rounded-none border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
                        href='/applicant'
                    >
                        Enter as Applicant
                    </Link>
                    <Link
                        className='rounded-none border border-solid border-black/10 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44'
                        href='/recruiter'
                    >
                        Enter as Recruiter
                    </Link>
                </div>
            </main>
        </div>
    );
}
