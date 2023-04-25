import axios from "axios";
import React, {useState} from "react";
import { RiLoader5Fill } from "react-icons/ri";
import { validate } from "@/lib/validate";
import Input from "./Input";
import TextArea from "./TextArea";
interface IValues {
    name: string;
    email: string;
    message: string;
}
interface IErrors extends Partial<IValues> {}
export const Form = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<IErrors>({});
    const [loading, setLoading] = useState(false);
    const [messageState, setMessageState] = useState("");
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(values);
        if (errors && Object.keys(errors).length > 0) {
            return setErrors(errors);
        }
        setErrors({});
        setLoading(true);
        axios
            .post("/api/mail", {
                name: values.name,
                email: values.email,
                message: values.message,
            })
            .then((res) => {
                if (res.status === 200) {
                    setValues({ name: "", email: "", message: "" });
                    setLoading(false);
                    setSuccess(true);
                    setMessageState(res.data.message);
                } else {
                    setLoading(false);
                    setMessageState(res.data.message);
                }
            })
            .catch((err) => {
                setLoading(false);
                setMessageState(String(err.message));
            });
        setLoading(false);
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
        <form className="xl:m-52 m-22" onSubmit={handleSubmit}>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Contact Us</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-500">
                    Please fill this form to contact us.
                </p>
            </div>
            <Input
                value={values.name}
                onChange={handleChange}
                id="name"
                name="name"
                label="Your Name"
                placeholder="Your name..."
                error={!!errors.name}
                errorMessage={!!errors.name ? errors.name : ""}
            />
            <Input
                value={values.email}
                onChange={handleChange}
                id="email"
                name="email"
                label="Your Email"
                placeholder="your@email.com"
                error={!!errors.email}
                errorMessage={!!errors.email ? errors.email : ""}
            />
            <TextArea
                value={values.message}
                onChange={handleChange}
                id="message"
                name="message"
                label="Your Message"
                placeholder="Your message here..."
                error={!!errors.message}
                errorMessage={!!errors.message ? errors.message : ""}
            />
            <button
                className="mt-4 w-full rounded-md bg-teal-600 py-3 px-5 text-lg text-white outline-none hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-opacity-60"
                type="submit"
                disabled={loading}
            >
                {!loading ? (
                    "Submit"
                ) : (
                    <div className="flex h-full w-full items-center justify-center ">
                        <RiLoader5Fill className="h-8 w-8 animate-spin" />
                    </div>
                )}
            </button>
            <p className="mt-5 text-green-500 dark:text-green-500">
                {success ? (
                    messageState
                ) : (
                    <span className="text-red-500 dark:text-red-500">{messageState}</span>
                )}
            </p>
        </form>
    );
};