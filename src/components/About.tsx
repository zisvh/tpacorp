import Image from "next/image";
import TpaPlayer from "@/assets/tpa_player.png";
import { ArrowUpCircleIcon, DocumentIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

const features = [
    {
        name: 'Player promotion',
        description:
            'We provide a platform for champions to showcase their skills and get discovered by top teams. Our team works to promote our champions and help them reach their full potential.',
        icon: ArrowUpCircleIcon,
    },
    {
        name: 'Contract negotiation',
        description:
            'Our experienced agents negotiate player contracts with top teams to ensure that our champions are compensated fairly and have the support they need to succeed.',
        icon: DocumentIcon,
    },
    {
        name: 'Personalized support',
        description:
            'We offer personalized support to our champions, including coaching, training, and mental health resources. Our team is dedicated to helping our champions perform at their best both in and out of the game.',
        icon: UserGroupIcon,
    },
    {
        name: 'Community building',
        description:
            'Our agency is committed to building a supportive and inclusive community for our champions. We organize events, connect champions with fans, and foster a culture of respect and collaboration.',
        icon: HeartIcon,
    },
];


export default function About() {

    const handleClick = () => {
        window.scrollTo({
            top: 1200,
            behavior: 'smooth'
        });
    };
    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                <div className="space-y-5 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mx-auto sm:text-6xl">
                        The future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9bc95] to-[#55b1ab]">Korean player Agencies</span>
                    </h2>
                    <p className="max-w-2xl mx-auto">
                        We are a korean agency that provides a platform for players to showcase their skills and get discovered by top teams.
                    </p>
                    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                        <button onClick={handleClick} className="block py-2 px-4 text-white font-medium duration-150 bg-[#c9bc95] hover:bg-[#a09573] active:bg-[#857b5e] rounded-lg shadow-lg hover:shadow-none">
                            Why TPA ?
                        </button>
                        <Link href="/champions" className="block py-2 px-4 text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium duration-150 active:bg-gray-100 border dark:border-gray-500 hover:border-gray-900 dark:hover:border-white rounded-lg">
                            See our champions
                        </Link>
                    </div>
                </div>
                <div className="mt-14">
                    <Image src={TpaPlayer} width={2000} height={2000} className="w-full shadow-lg rounded-lg border border-[#c9bc95]" alt="" />
                </div>
            </div>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-teal-600">Why choose us ?</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Here&apos;s what we&apos;re made of
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Our agency is made up of a team of passionate individuals who are dedicated to helping players reach their full potential.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    )
}