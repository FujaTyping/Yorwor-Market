// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { BsBagXFill } from "react-icons/bs";
import { User } from "@nextui-org/user";

import marketConfig from "@/market-config.mjs";

export default function Home() {
    const [title] = useState("Yorwor Market");
    const [uList, setUList] = useState([]);
    const [duckList, setDuckList] = useState([]);
    const [pageStatus, setPageStatus] = useState("Loading");
    const [emailQ, setEmailQ] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const GMail = queryParams.get('email');
        setEmailQ(GMail);
        axios
            .put(`${marketConfig.apiServer}store/user`, { uID: GMail })
            .then((response) => {
                setUList(response.data.User);
                axios
                    .put(`${marketConfig.apiServer}good/bulk`, { goodsIds: response.data.User.goods })
                    .then((response) => {
                        setPageStatus("Finish");
                        setDuckList(response.data.Goods);
                    })
                    .catch(() => {
                        setPageStatus("Error");
                        setDuckList([]);
                    });
            })
            .catch(() => {
                setPageStatus("Error");
                setUList([]);
            });
    }, []);

    return (
        <>
            <title>{title}</title>
            <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
                <div className="text-center">
                    <h1 className="text-3xl">Yorwor Market</h1>
                    <h3>Hatyaiwittayalai School</h3>
                </div>
                <div className="flex flex-col justify-center">
                    {pageStatus == "Loading" ? (
                        <>
                            <div className="flex items-center gap-4 mt-5">
                                <Spinner color="default" />
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl">Getting store info</h1>
                                    <p>This may take a few second</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {
                                duckList.length > 0 ? (
                                    <>
                                        <User
                                            avatarProps={{
                                                src: uList.photoURL,
                                                size: "lg",
                                            }}
                                            description={<p>{uList.bio}</p>}
                                            name={<p className="text-xl">{uList.displayName}</p>}
                                            className="my-2"
                                        />
                                        <section className="max-w-6xl">
                                            <div>
                                                <h1 className="text-xl">All <b>{`${uList.displayName}'s`}</b> product : {duckList.length} items</h1>
                                                <div className="mt-3 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
                                                    {duckList.map((list, index) => (
                                                        <>
                                                            <Link href={`/product?id=${list.id}`}>
                                                                <article key={index} className="relative">
                                                                    <div className="aspect-square overflow-hidden rounded-lg">
                                                                        <img loading="lazy" className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg" src={list.photoURL} alt="Product" />
                                                                    </div>
                                                                    <div className="absolute top-0 m-1 rounded-full bg-white">
                                                                        <p className="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">Sale</p>
                                                                    </div>
                                                                    <div className="mt-4 flex flex-col md:flex-row items-start justify-between">
                                                                        <div className="flex flex-col">
                                                                            <h3 className="font-bold leading-tight break-words">
                                                                                {list.title}
                                                                            </h3>
                                                                            <h1 className="leading-tight break-words">By : {list.author.displayName}</h1>
                                                                        </div>

                                                                        <div className="text-right mt-2 md:mt-0">
                                                                            <p>{list.price} ฿</p>
                                                                        </div>
                                                                    </div>
                                                                </article>
                                                            </Link>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </section>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center mt-8 gap-3 flex-col">
                                        <BsBagXFill className="h-8 w-8" />
                                        <div className="gap-1">
                                            <h1 className="text-xl text-center">{`${emailQ}'s store has no product`}</h1>
                                            <p className="text-center">Maybe the owner will add soon</p>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
