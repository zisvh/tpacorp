import Image from "next/image";
import {ArrowTrendingUpIcon, BoltIcon, DocumentCheckIcon} from "@heroicons/react/20/solid";

const members = [
    {
        player_icon: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/03/EDG_Viper_2022_Worlds.png",
        player_ign: "Viper",
        player_name: "Park Do-hyeon (박도현)\n",
        player_desc: "Park \"Viper\" Do-hyeon (Hangul: 박도현) is a League of Legends esports player, currently bot laner for Hanwha Life Esports.",
        player_rank: "Challenger - 1,537LP",
        player_team: "Hanwha Life Esports",
        path: "javascript:void(0)"
    }, {
        player_icon: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1a/T1_Oner_2022_Split_2.png",
        player_ign: "Oner",
        player_name: "Mun Hyeon-jun (문현준)\n",
        player_desc: "Mun \"Oner\" Hyeon-jun (Hangul: 문현준) is a League of Legends esports player, currently jungler for T1.",
        player_rank: "Challenger - 957LP",
        player_team: "T1 Esports",
        path: "javascript:void(0)"
    }, {
        player_icon: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9f/DRX_SOLKA_2021_Split_2.png",
        player_ign: "Quad",
        player_name: "Song Su-hyeong (송수형)\n",
        player_desc: "Song \"Quad\" Su-hyeong (Hangul: 송수형) is a League of Legends esports player, currently streamer for Gen.G. He was previously known as SOLKA and SOLCA.",
        player_rank: "Challenger - 1,721LP",
        player_team: "GENG Esports",
        path: "javascript:void(0)",
    }
]

export default function CreatorCard ()
{
    return (
        <section className="py-28">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                <div className="max-w-md">
                    <h1 className="text-zinc-900 dark:text-white text-2xl font-extrabold sm:text-3xl">Content Creators</h1>
                    <p className="text-zinc-600 dark:text-gray-400 mt-2">Our list of outstanding content creators.</p>
                </div>
                <ul className="mt-12 divide-y space-y-3">
                    {
                        members.map((item, idx) => (
                            <li key={idx}
                                className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800">
                                <a href={item.path} className="space-y-3">
                                    <div className="flex items-center gap-x-3">
                                        <div
                                            className="bg-white w-14 h-14 border rounded-full flex items-center justify-center">
                                            <Image alt="player photo"
                                                   src={item.player_icon}
                                                   width={50}
                                                   height={50} className="rounded-full"/>
                                        </div>
                                        <div>
                                        <span
                                            className="block text-sm text-red-500 font-medium">{item.player_ign}</span>
                                            <h3 className="text-base text-zinc-800 dark:text-white font-semibold mt-1">{item.player_name}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 sm:text-sm">
                                        {item.player_desc}
                                    </p>
                                    <div className="text-sm text-gray-50 font-semibold -tracking-tight flex items-center gap-6">
                                        <BoltIcon className="w-6 text-red-500" />
                                        {item.player_rank}
                                        <DocumentCheckIcon className="w-6 text-red-500" />
                                        {item.player_team}
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}