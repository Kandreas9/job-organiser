"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Login() {
    const { data: session, status } = useSession();

    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleUserChange = (e, type) => {
        setUser({ ...user, [type]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            ...user,
        });

        if (!result.ok) {
            setError("Wrong credentials! Please retry.");
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session?.user) {
        redirect("/");
    }

    return (
        <div className="h-screen overflow-hidden w-screen top-0 left-0 absolute flex justify-center items-center">
            <div className="ripples">
                <div className="ripple-1 ripple"></div>
                <div className="ripple-2 ripple"></div>
                <div className="ripple-3 ripple"></div>
            </div>

            <div className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-[30px] glass py-[3rem] px-[2rem] absolute z-10">
                <h2 className="text-[32px] font-bold text-center">Login</h2>
                <form
                    className="flex flex-col items-center gap-[20px]"
                    onSubmit={handleSubmit}
                >
                    <label className="flex flex-col gap-[5px]">
                        Email:
                        <input
                            className="rounded-[10px] glass-input opacity-50 dark:text-black p-1"
                            value={user.email}
                            onChange={(e) => handleUserChange(e, "email")}
                            type="email"
                        />
                    </label>

                    <label className="flex flex-col gap-[5px]">
                        Password:
                        <input
                            className="rounded-[10px] glass-input opacity-50 dark:text-black p-1"
                            value={user.password}
                            onChange={(e) => handleUserChange(e, "password")}
                            type="password"
                        />
                    </label>

                    <div className="text-[.8rem]">
                        Do not have an account yet,{" "}
                        <Link href="/auth/register" className="text-green-main">
                            Click here!
                        </Link>
                    </div>

                    <button
                        className="bg-green-main px-[2rem] py-[.5rem] rounded-[10px]"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

                <div>{error}</div>
            </div>
        </div>
    );
}
