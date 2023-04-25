import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import { RiLoader5Fill } from "react-icons/ri";
import { validate } from "@/lib/validate";
import Input from "./Input";
import TextArea from "./TextArea";
import {Dialog, Transition} from "@headlessui/react";
import {supabase} from "@/lib/supabaseClient";
interface IValues {
    name: string;
    email: string;
    message: string;
}
interface IErrors extends Partial<IValues> {}

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

interface AddPlayerProps {
    shadowPlayers: ShadowPlayer[];
    setShadowPlayers: (players: ShadowPlayer[]) => void;
}

export const PlayerForm = ({ shadowPlayers, setShadowPlayers }: AddPlayerProps) => {
    // Modal stuff
    let [isOpen, setIsOpen] = useState(true)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    // Add Player
    const handleAdd = async (event : any) => {
        event.preventDefault();
        await addPlayer();
    };

    const addPlayer = async () => {
        try {
            // Set up the new player's data
            const newPlayerData = {
                player_icon: values.player_icon, // Player's picture
                player_ign: values.player_ign, // Player's in-game name
                player_name: values.player_name, // Player's full name
                player_desc: values.player_desc, // Player's description
                player_born: values.player_born, // Player's date of birth
                player_team: values.player_team, // Player's current team
                path: values.path, // Leaguepedia URL
            };

            // Insert the new player into the database
            const { data, error } = await supabase
                .from('tpa_players')
                .insert(newPlayerData);

            if (data) {
                // Add the new player to the shadowPlayers array
                setShadowPlayers([...shadowPlayers, data[0]]);
            } else {
                console.error("Error adding player:", error);
            }
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };

    const [values, setValues] = useState({
        player_icon: "",
        player_ign: "",
        player_name: "",
        player_desc: "",
        player_born: "",
        player_team: "",
        path: "",

    });
    const [errors, setErrors] = useState<IErrors>({});
    const [loading, setLoading] = useState(false);
    const [messageState, setMessageState] = useState("");
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValues((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <>
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
                                <Dialog.Panel className="w-[80%] transform overflow-hidden rounded-2xl dark:bg-zinc-900 bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                    >
                                        Add Champion
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-700">
                                            By filling this form, you are adding a champion to the database.
                                        </p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <Input
                                            value={values.player_icon}
                                            onChange={handleChange}
                                            id="player_icon"
                                            name="player_icon"
                                            label="Player Icon (leaguepedia)"
                                            placeholder="Icon URL... (nothing for default icon)"
                                        />
                                        <Input
                                            value={values.player_ign}
                                            onChange={handleChange}
                                            id="player_ign"
                                            name="player_ign"
                                            label="Player Username"
                                            placeholder="Username..."
                                        />
                                        <Input
                                            value={values.player_name}
                                            onChange={handleChange}
                                            id="player_name"
                                            name="player_name"
                                            label="Player Name"
                                            placeholder="Name (한글)..."
                                        />
                                        <Input
                                            value={values.player_born}
                                            onChange={handleChange}
                                            id="player_born"
                                            name="player_born"
                                            label="Player Birth"
                                            placeholder="YYYY/MM/DD... (format)"
                                        />
                                        <Input
                                            value={values.player_team}
                                            onChange={handleChange}
                                            id="player_team"
                                            name="player_team"
                                            label="Player Team"
                                            placeholder="Team (or FA)..."
                                        />
                                        <Input
                                            value={values.path}
                                            onChange={handleChange}
                                            id="path"
                                            name="path"
                                            label="Player Leaguepedia"
                                            placeholder="Leaguepedia URL..."
                                        />
                                        <TextArea
                                            value={values.player_desc}
                                            onChange={handleChange}
                                            id="message"
                                            name="player_desc"
                                            label="Player description"
                                            placeholder="Description..."
                                        />
                                    </form>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-teal-100 dark:bg-teal-400 px-4 py-2 text-sm font-medium text-teal-900 hover:bg-teal-200 dark:hover:bg-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                closeModal();
                                                addPlayer();
                                            }}>
                                            Add
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
