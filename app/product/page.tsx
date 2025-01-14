// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import axios from "axios"
import { FaCartPlus } from "react-icons/fa";
import { Spinner } from "@nextui-org/spinner";

import marketConfig from "@/market-config.mjs";


export default function Home() {
    const [title, setTitle] = useState("Yorwor Market");
    const [goodsList, setGoodsList] = useState([]);
    const [pageStatus, setPageStatus] = useState("Loading");

    useEffect(() => {
        setPageStatus("Loading");
        const queryParams = new URLSearchParams(window.location.search);
        const productId = queryParams.get('id');
        axios
            .put(`${marketConfig.apiServer}good/item`, { goodId: productId })
            .then((response) => {
                setPageStatus("Finish");
                setGoodsList(response.data.Goods);
                setTitle(`Yorwor Market - ${response.data.Goods[0].title}`)
            })
            .catch(() => {
                setPageStatus("Error");
                setGoodsList([]);
            });
    }, []);

    return (
        <>
            <title>{title}</title>
            <div className="flex flex-col items-center justify-center gap-5 m-10">
                <div className="text-center">
                    <h1 className="text-3xl">Yorwor Market</h1>
                    <h3>Hatyaiwittayalai School</h3>
                </div>
                <div className="p-5">
                    {pageStatus == "Loading" ? (
                        <>
                            <div className="flex items-center justify-center gap-4 mt-5">
                                <Spinner color="default" />
                                <h1 className="text-xl">Loading product details</h1>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                {goodsList && goodsList.length > 0 ? (
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <div className="md:flex-1">
                                            <div className="rounded-lg">
                                                <img
                                                    className="object-cover rounded-lg max-w-full sm:max-w-md"
                                                    src={goodsList[0].photoURL}
                                                    alt="Product"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:flex-1">
                                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                                {goodsList[0].title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                                {goodsList[0].decs}
                                            </p>
                                            <div className="flex mb-4">
                                                <div className="mr-4">
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                                        Price :
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {` ${goodsList[0].price} Baht`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                                    Author info:
                                                </span>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                                    {goodsList[0].title} by : {goodsList[0].author.displayName}
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row mt-5 gap-3">
                                                <Button
                                                    style={{ backgroundColor: "white" }}
                                                    variant="bordered"
                                                >
                                                    <Link href="/">Back to home</Link>
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    variant="bordered"
                                                    isDisabled
                                                    startContent={<FaCartPlus />}
                                                >
                                                    Add to cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-800 dark:text-white">
                                        <h2 className="text-2xl mb-4">No Product Available</h2>
                                        <p className="text-gray-600">
                                            {"We couldn't find any products at the moment. Please check back later!"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
