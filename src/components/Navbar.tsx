import {useEffect, useState} from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import shadowcorpLogo from "../assets/shadowcorp_logo.png";
import shadowcorpLogoW from "../assets/shadowcorp_logow.png";
import Keyboard from "../assets/kbd.png";
import Headset from "../assets/headset.png";

const navigation = [
    { name: 'ABOUT', href: '#' },
    { name: 'PLAYERS', href: '/players' },
    { name: 'PARTNERS', href: '#' },
    { name: 'CONTACT', href: '#' },
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(false);
    const logoPath = isDark ? shadowcorpLogoW : shadowcorpLogo;

    useEffect(() => {
        const isDarkMode = localStorage.getItem('isDarkMode');
        if (isDarkMode === 'true') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    function toggleDarkMode() {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('isDarkMode', newIsDark.toString());
        document.documentElement.classList.toggle('dark');
    }

    return (
        <div className="all">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Image
                                className="h-8 w-auto"
                                src={logoPath}
                                alt="test"
                                width={70}
                                height={70}
                            />
                        </a>
                        <button
                            onClick={toggleDarkMode}
                            type="button"
                            className="transition transform ml-5 rounded-full dark:hover:bg-zinc-800 hover:bg-zinc-200 p-1 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            {isDark ? <MoonIcon className="h-6 w-6" aria-hidden="true" /> : <SunIcon className="h-6 w-6" aria-hidden="true" />}
                        </button>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="transition transform text-sm font-semibold leading-6 text-zinc-900 dark:text-white opacity-30 hover:opacity-100">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="transition transform text-sm font-semibold leading-6 dark:text-white text-zinc-900 opacity-30 hover:opacity-100">
                            LOG IN <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-zinc-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <Image
                                    className="h-8 w-auto"
                                    src={logoPath}
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-zinc-700 dark:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-zinc-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.name.toLowerCase()}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 dark:text-white dark:hover:bg-zinc-800 hover:bg-zinc-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-zinc-900 dark:text-white dark:hover:bg-zinc-800 hover:bg-zinc-50"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    )
}
