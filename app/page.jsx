"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import noJobs from "../public/404.svg";

import JobsTable from "./components/jobsTable";

export default function Home() {
    const { data: session, status } = useSession();

    const [jobs, setJobs] = useState([]);

    const getJobs = async () => {
        const res = await fetch(
            `/api/job/getAllJobsByUser/${session.user.id}`,
            {
                cache: "no-store",
                method: "get",
            }
        );

        const obj = await res.json();

        console.log(obj);
        if (obj.jobs.length !== 0) {
            setJobs(obj.jobs);
        }
    };

    useEffect(() => {
        if (session?.user && jobs.length == 0) {
            getJobs();
        }
    }, [session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session?.user) {
        return (
            <>
                {jobs.length !== 0 ? (
                    <JobsTable jobs={jobs}></JobsTable>
                ) : (
                    <div>
                        <Image
                            className="h-[20rem]"
                            src={noJobs}
                            alt="404 no jobs applications yet"
                        ></Image>

                        <p className="text-center text-[1.5rem]">
                            Cannot fish if you dont apply.
                        </p>
                    </div>
                )}
            </>
        );
    }

    return (
        <section className="h-full flex flex-col justify-center items-center gap-[2rem]">
            <h1 className="text-[7rem]">💼</h1>
            <p className="text-center text-gray-main text-[1.2rem]">
                Generate, Send, Organise your job search in one place.
            </p>
            <Link
                href="/auth/register"
                className="rounded-[10px] text-[1.6rem] bg-green-main px-[1rem] py-[5px]"
            >
                Try Now!
            </Link>
        </section>
    );
}
