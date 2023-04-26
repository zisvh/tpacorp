import { supabase } from "@/lib/supabaseClient";
import {Fragment, useEffect, useState} from "react";
import {TrashIcon} from "@heroicons/react/20/solid";
import {Dialog, Transition} from "@headlessui/react";

// types for ShadowPlayer
interface ShadowPartner {
    id: number;
    title: string;
    subtitle: string;
}


export default function PartnersData() {
    const [shadowPartners, setShadowPartners] = useState<ShadowPartner[]>([]);
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const deletePartner = async (partnerId: number) => {
        try {
            const { error } = await supabase
                .from("tpa_partners")
                .delete()
                .eq("id", partnerId);
            // Remove the deleted player from the shadowPlayers array
            setShadowPartners(shadowPartners.filter((partner) => partner.id !== partnerId));
        } catch (error) {
            console.error("Error deleting player:", error);
        }
    };

    useEffect(() => {
        const fetchShadowPartners = async () => {
            try {
                const {data, error} = await supabase
                    .from('tpa_partners')
                    .select('*');
                setShadowPartners(data as ShadowPartner[]);
                console.log(data);
            } catch {
                console.log('error');
            }

        };

        fetchShadowPartners().then(r => console.log(r));
    }, []);
    return (
        <div className="flex justify-center items-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="mb-10 text-lg opacity-50 text-center leading-8 text-gray-900 dark:text-white">
                    Current partners:
                </h2>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 py-5">
                        {
                            shadowPartners.map((item, idx) => (
                                <div key={idx} className={"flex flex-col items-center cursor-pointer"}>
                                    <h1 className="text-gray-900 dark:text-white font-bold text-xl md:text-4xl tracking-tight">
                                        {item.title}
                                    </h1>
                                    <h3 className="text-gray-900 dark:text-white text-sm md:text-md tracking-tight opacity-50">
                                        {item.subtitle}
                                    </h3>
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
                                                                Are you sure you want to delete this partner ?
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500 dark:text-gray-700">
                                                                    By deleting, you remove this partner from your <br/>Partner Database.
                                                                </p>
                                                            </div>

                                                            <div className="mt-4">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 dark:bg-red-400 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 dark:hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                                    onClick={() => {
                                                                        closeModal();
                                                                        deletePartner(item.id);
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
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
