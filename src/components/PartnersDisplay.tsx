import { supabase } from "@/lib/supabaseClient";
import {useEffect, useState} from "react";

// types for ShadowPlayer
interface ShadowPartner {
    id: number;
    title: string;
    subtitle: string;
}


export default function PartnersDisplay() {
    const [shadowPartners, setShadowPartners] = useState<ShadowPartner[]>([]);

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
        <div className="py-24 sm:py-32 flex justify-center items-center">
            <div className="mx-auto my-24 md:my-48 max-w-7xl px-6 lg:px-8">
                <h2 className="mb-10 text-lg opacity-50 text-center leading-8 text-gray-900 dark:text-white">
                    Our partners make sure our players focus on performance:
                </h2>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 py-5">
                        {
                            shadowPartners.map((item, idx) => (
                            <div key={idx} className={"flex flex-col items-center hover:animate-pulse cursor-pointer"}>
                                <h1 className="text-gray-900 dark:text-white font-bold text-xl md:text-4xl tracking-tight">
                                    {item.title}
                                </h1>
                                <h3 className="text-gray-900 dark:text-white text-sm md:text-md tracking-tight opacity-50">
                                    {item.subtitle}
                                </h3>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
