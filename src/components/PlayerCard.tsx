import Image from "next/image";
import {CakeIcon, DocumentCheckIcon, UserIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

// types for ShadowPlayer
interface ShadowPlayer {
    id: number;
    player_icon: string; // url of the player's icon
    player_ign: string;
    player_name: string;
    player_desc: string;
    player_born: string;
    player_team: string;
    path: string;

    // add more properties here as needed
}

export default function PlayerCard ()
{
    const [shadowPlayers, setShadowPlayers] = useState<ShadowPlayer[]>([]);

    useEffect(() => {
        const fetchShadowPlayers = async () => {
            try {
                const {data, error} = await supabase
                .from('tpa_players')
                .select('*');
                setShadowPlayers(data as ShadowPlayer[]);
                console.log(data);
            } catch {
                console.log('error');
            }

        };

        fetchShadowPlayers().then(r => console.log(r));
    }, []);

    //Calculate a player's age dynamically:
    function getAge(date : string) {
        let today = new Date();
        let birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
    <section className="py-28">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8">
            <div className="max-w-md">
                <h1 className="text-zinc-900 dark:text-white text-2xl font-bold sm:text-3xl">Champions</h1>
                <p className="text-zinc-600 dark:text-gray-400 mt-2">These are our champions, made to conquer.</p>
            </div>
            <ul className="mt-12 divide-y space-y-3">
                {
                    shadowPlayers.map((item, idx) => (
                        <li key={idx}
                            className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800">
                            <Link href={item.path} className="space-y-3">
                                <div className="flex items-center gap-x-3">
                                    <div
                                        className="bg-[#a09573] w-16 h-16 rounded-full flex items-center justify-center">
                                        { item.player_icon ?
                                        <Image alt="player photo"
                                            src={item.player_icon}
                                           width={50}
                                           height={50} className="rounded-full"/>
                                            :
                                            <UserIcon className="w-16 text-[#c9bc95]" />
                                        }
                                    </div>
                                    <div>
                                        <span
                                            className="block text-sm text-[#c9bc95] font-medium">{item.player_ign}</span>
                                        <h3 className="text-base text-zinc-800 dark:text-white font-semibold mt-1">{item.player_name}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-600 sm:text-sm">
                                    {item.player_desc}
                                </p>
                                <div className="text-sm text-zinc-900 dark:text-white font-semibold -tracking-tight flex items-center gap-6">
                                    <CakeIcon className="w-6 text-[#c9bc95]" />
                                    {item.player_born ? getAge(item.player_born) + " Years old" : '???'}
                                    <DocumentCheckIcon className="w-6 text-[#c9bc95]" />
                                        {item.player_team}
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </section>
)
}