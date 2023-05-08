import { createPortal } from "react-dom";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import send from "../../public/send.svg";
import wait from "../../public/wait.svg";

export default function Modal({ children, closeModal }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [loadingEmail, setLoadingEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [intro, setIntro] = useState("(Intro Here)");
    const [outro, setOutro] = useState("(Outro Here)");
    const [emailPreview, setEmailPreview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingEmail(true);
        const res = await fetch("/api/generate-email", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify(email),
        });
        const json = await res.json();

        setLoadingEmail(false);
        setEmailPreview(json.res.choices[0].message.content);
    };

    const handleEmail = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/email", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify({
                intro,
                outro,
                main: emailPreview,
                email,
            }),
        });

        const json = await res.json();

        if (json.success) {
            const res2 = await fetch("/api/job/addJob", {
                cache: "no-store",
                method: "POST",
                body: JSON.stringify({
                    email,
                    user: session?.user,
                }),
            });

            const _json2 = await res2.json();

            router.reload();
        }
    };
    return (
        <>
            {createPortal(
                <>
                    <div
                        onClick={closeModal}
                        className="absolute z-50 h-screen w-screen top-0 left-0 bg-black opacity-40"
                    ></div>
                    <div
                        className="
                        w-[250px]
                        h-[450px]
                        absolute z-[100]
                        top-[50%]
                        left-[50%]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        dark:bg-blue-main
                        flex
                        flex-col
                        rounded-[10px]"
                    >
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email."
                                type="email"
                                className="rounded-t-[10px] w-full p-[.5rem] text-black"
                            />
                            <button
                                type="submit"
                                className="absolute top-[.5rem] right-[.5rem]"
                            >
                                <Image
                                    src={send}
                                    alt="generate email for business"
                                ></Image>
                            </button>
                        </form>
                        <div className="w-full flex flex-col items-center justify-center gap-[1rem] flex-1 overflow-auto">
                            {loadingEmail ? (
                                <div>Loading...</div>
                            ) : (
                                <>
                                    {emailPreview ? (
                                        <form
                                            onSubmit={handleEmail}
                                            className="h-full flex flex-col justify-center items-center gap-[1rem] dark:bg-blue-main w-full text-[.7rem]"
                                        >
                                            <input
                                                value={intro}
                                                onChange={(e) =>
                                                    setIntro(e.target.value)
                                                }
                                                className="w-full p-4 dark:bg-blue-main"
                                                type="text"
                                            />
                                            <textarea
                                                value={emailPreview}
                                                onChange={(e) =>
                                                    setEmailPreview(
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    whiteSpace: "break-spaces",
                                                }}
                                                className="p-4 flex-1 dark:bg-blue-main w-full text-[.7rem]"
                                            ></textarea>
                                            <input
                                                value={outro}
                                                onChange={(e) =>
                                                    setOutro(e.target.value)
                                                }
                                                className="w-full p-4 dark:bg-blue-main"
                                                type="text"
                                            />

                                            <button
                                                type="submit"
                                                className="w-[10rem] mb-[1rem] bg-green-main rounded p-2"
                                            >
                                                Send Email
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <Image
                                                src={wait}
                                                alt="waiting for input"
                                            ></Image>
                                            <p>Waiting for input...</p>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>,
                document.getElementById("terminal")
            )}
        </>
    );
}
