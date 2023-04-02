import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from "../components/Navbar"
import Keyboard from "@/assets/kbd.png";
import Headset from "@/assets/headset.png";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <div>
            <Head>
                <title>쉐도우 코퍼레이션</title>
            </Head>
            <Navbar />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FF0035] to-[#FF0035] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="transition transform relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400 ring-1 ring-zinc-900/10 dark:ring-zinc-200/10 dark:hover:ring-zinc-200/20 hover:ring-zinc-900/20">
                            T1 Qualifies for MSI.{' '}
                            <a href="#" className="font-semibold text-red-500">
                                <span className="absolute inset-0" aria-hidden="true" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <Image
                        className="absolute blur-sm md:blur-0 top-44 left-36 h-1/4 w-auto -rotate-45 opacity-10 z-50"
                        src={Keyboard}
                        alt="test"
                        width={70}
                        height={70}
                    />
                    <Image
                        className="absolute blur-sm md:blur-0 bottom-32 right-36 h-1/4 w-auto rotate-0 opacity-10 z-50"
                        src={Headset}
                        alt="test"
                        width={70}
                        height={70}
                    />
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                            Shadow Corporation
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-zinc-600">
                            N°1 professional esports global agency. Based in Korea.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="transition transform rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                SEE PLAYERS
                            </a>
                            <a href="#" className="transition transform text-sm opacity-30 hover:opacity-100 font-semibold leading-6 text-zinc-900 dark:text-white">
                                LEARN MORE <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FF0035] to-[#FF0035] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}