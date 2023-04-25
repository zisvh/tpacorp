import Image from "next/image";
import {
    CakeIcon,
    DocumentCheckIcon,
    TrashIcon,
    UserIcon
} from "@heroicons/react/20/solid";
import {useEffect, useState, Fragment} from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Dialog, Transition } from '@headlessui/react'
import AddPlayer from "@/components/AddPlayer";

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

export default function PlayerData ()
{
    const [shadowPlayers, setShadowPlayers] = useState<ShadowPlayer[]>([]);
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const deletePlayer = async (playerId: number) => {
        try {
            const { error } = await supabase
                .from("tpa_players")
                .delete()
                .eq("id", playerId);
            // Remove the deleted player from the shadowPlayers array
            setShadowPlayers(shadowPlayers.filter((player) => player.id !== playerId));
        } catch (error) {
            console.error("Error deleting player:", error);
        }
    };

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

    // @ts-ignore
    return (
        <section className="py-14">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8">
                <ul className="divide-y space-y-3">
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
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="duration-150 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-900 text-gray-700 dark:text-white mt-5 px-10 py-1 rounded-md flex justify-between items-center gap-2"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                    Delete
                                </button>
                                <Transition appear show={isOpen} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 overflow-y-auto">
                                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-zinc-900 bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                                        >
                                                            Are you sure you want to delete this champion ?
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 dark:text-gray-700">
                                                                By deleting, you remove this champion from your <br/>Champion Database.
                                                            </p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 dark:bg-red-400 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 dark:hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                                onClick={() => {
                                                                    closeModal();
                                                                    deletePlayer(item.id);
                                                                }}                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </li>
                        ))
                    }
                </ul>
                <AddPlayer
                    shadowPlayers={shadowPlayers}
                    setShadowPlayers={setShadowPlayers}/>
            </div>
        </section>
    )
}
