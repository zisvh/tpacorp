import React, { useState, useEffect } from 'react';
import {PlusIcon} from "@heroicons/react/20/solid";
import {PlayerForm} from "@/components/PlayerForm";

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

export default function AddPlayer({ shadowPlayers, setShadowPlayers }: AddPlayerProps) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
        <button
            className="duration-150 bg-[#c9bc95] hover:bg-[#a09573] text-white mt-5 px-5 py-1 rounded-md flex justify-between items-center gap-2"
            onClick={() => setShowForm(!showForm)}
        >
            <PlusIcon className="w-5 h-5" />
            Add Champion
        </button>
            {showForm && (
                <PlayerForm shadowPlayers={shadowPlayers}
                            setShadowPlayers={setShadowPlayers}/>
            )}
        </>
    )
}