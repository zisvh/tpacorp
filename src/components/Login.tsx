import { supabase } from "@/lib/supabaseClient";
import {useEffect, useState} from "react";
import Head from "next/head";
import PlayerData from "@/components/PlayerData";

async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error signing in:', error.message);
    } else {
        console.log('User signed in:', data);
        window.location.reload();
    }
}


async function signOut() {
    // @ts-ignore
    const { data, error } = await supabase.auth.signOut()

    if (error) {
        console.error('Error signing in:', error.message);
    } else {
        console.log('User signed out:', data);
        window.location.reload();
    }
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(false);
    const [username, setUsername] = useState("");
    const handleSignIn = async (e : any) => {
        e.preventDefault();
        await signIn(email, password);
    };

    const handleSignOut = async (e: any) => {
        e.preventDefault();
        await signOut();
    }

    const handleEmailChange = (e : any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e : any) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        async function getSession() {
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                console.log('User is logged in, therefore we display!');
                // @ts-ignore
                setUser(true);
                // @ts-ignore
                setUsername(data.session.user.email);
                console.log(data.session);
            } else {
                console.log('User not logged in, please login first!')
            }
            console.log(data);
        }

        // call getSession() only when the location changes
        getSession().then(r => console.log("Retrieved info!"));
    }, []);

    if (user) {
        return (
            <div className="flex-col items-align justify-center">
                <Head>
                    <title>TPA | Dashboard</title>
                </Head>
                <h1 className="mt-32 text-center font-bold text-4xl text-gray-900 dark:text-white">Hello, <span className="text-[#c9bc95]" style={{textTransform: "capitalize"}}>{username.split("@")[0]}</span>.</h1>
                <button
                    onClick={handleSignOut}
                    type="submit"
                    className="duration-150 mx-auto m-5 flex justify-center rounded-md bg-[#c9bc95] px-5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#a09573] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Sign out
                </button>
                <PlayerData />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>TPA | Login</title>
            </Head>
            <div className="flex min-h-full flex-1 flex-col text-gray-900 dark:text-white justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
                        로그인
                    </h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="block w-full bg-gray-500/10 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="block w-full bg-gray-500/10 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleSignIn}
                                type="submit"
                                className="m-2 flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        이 페이지는{' '}
                        <a href="#" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">
                            TPA{' '}
                        </a>
                        에이전트 전용입니다.
                    </p>
                </div>
            </div>
        </>
    )
}
