import React, {Fragment, useState} from "react";
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

// types for ShadowPartner
interface ShadowPartner {
    id: number;
    title: string;
    subtitle: string;
}

interface AddPartnerProps {
    shadowPartners: ShadowPartner[];
    setShadowPartners: (partners: ShadowPartner[]) => void;
}

export const PartnerForm = ({ shadowPartners, setShadowPartners }: AddPartnerProps) => {
    // Modal stuff
    let [isOpen, setIsOpen] = useState(true)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    // Add partner
    const handleAdd = async (event : any) => {
        event.preventDefault();
        await addPartner();
    };

    const addPartner = async () => {
        try {
            // Set up the new prtners's data
            const newPartnerData = {
                title: values.title, // Partner's title
                subtitle: values.subtitle, // Partner's subtitle
            };

            // Insert the new partner into the database
            const { data, error } = await supabase
                .from('tpa_partners')
                .insert(newPartnerData);

            if (data) {
                // Add the new partner to the shadowPartner array
                setShadowPartners([...shadowPartners, data[0]]);
            } else {
                console.error("Error adding partner:", error);
            }
        } catch (error) {
            console.error("Error adding partner:", error);
        }
    };

    const [values, setValues] = useState({
        title: "",
        subtitle: "",
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
                                        Add Partner
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-700">
                                            By filling this form, you are adding a partner to the database.
                                        </p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <Input
                                            value={values.title}
                                            onChange={handleChange}
                                            id="title"
                                            name="title"
                                            label="Partner's title"
                                            placeholder="Partner's title..."
                                        />
                                        <Input
                                            value={values.subtitle}
                                            onChange={handleChange}
                                            id="subtitle"
                                            name="subtitle"
                                            label="Partner's subtitle"
                                            placeholder="Partner's subtitle..."
                                        />
                                    </form>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-teal-100 dark:bg-teal-400 px-4 py-2 text-sm font-medium text-teal-900 hover:bg-teal-200 dark:hover:bg-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                closeModal();
                                                addPartner();
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
