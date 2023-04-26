import React, { useState } from 'react';
import {PlusIcon} from "@heroicons/react/20/solid";
import {PartnerForm} from "@/components/PartnerForm";

// types for ShadowPartner
interface ShadowPartner {
    id: number;
    title: string;
    subtitle: string;
}

interface AddPartnerProps {
    shadowPartners: ShadowPartner[];
    setShadowPartners: (players: ShadowPartner[]) => void;
}

export default function AddPartner({ shadowPartners, setShadowPartners }: AddPartnerProps) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <button
                className="duration-150 bg-[#c9bc95] hover:bg-[#a09573] text-white mt-5 px-5 py-1 rounded-md flex justify-between items-center gap-2"
                onClick={() => setShowForm(!showForm)}
            >
                <PlusIcon className="w-5 h-5" />
                Add partner
            </button>
            {showForm && (
                <PartnerForm shadowPartners={shadowPartners}
                            setShadowPartners={setShadowPartners}/>
            )}
        </>
    )
}