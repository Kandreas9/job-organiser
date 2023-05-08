"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import term from "../../public/term.svg";

import Modal from "./modal";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session, status } = useSession();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (status === "loading") {
        return;
    }

    return (
        <header className="px-[1rem] flex items-center justify-between py-[.5rem] max-w-[1440px] mx-auto w-full relative z-20">
            {session ? (
                <>
                    <Link href="/">
                        <h1 className="text-[2.5rem]">💼</h1>
                    </Link>

                    <nav className="flex align-center">
                        <button onClick={() => setIsModalOpen(true)}>
                            <Image alt="open terminal" src={term} />
                        </button>
                    </nav>
                    {isModalOpen && <Modal closeModal={closeModal}></Modal>}
                </>
            ) : (
                <nav className="ml-auto flex gap-2">Job-Organiser</nav>
            )}
        </header>
    );
}
