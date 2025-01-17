import React from "react";
import Link from "next/link";

interface GoodsItem {
    id: string;
    photoURL: string;
    availability: boolean;
    title: string;
    author: {
        displayName: string;
    };
    price: number;
}

interface GoodsListProps {
    goodsList: GoodsItem[];
}

const GoodsGrid: React.FC<GoodsListProps> = ({ goodsList }) => {
    return (
        <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {goodsList.map((list, index) => (
                <Link key={index} href={`/product?id=${list.id}`}>
                    <article className="relative">
                        <div className="aspect-square overflow-hidden rounded-lg">
                            <img
                                loading="lazy"
                                className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg"
                                src={list.photoURL}
                                alt="Product"
                            />
                        </div>
                        <div
                            style={{ zIndex: 11 }}
                            className="absolute top-0 m-1 rounded-full bg-white"
                        >
                            <p className="text-[12px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                                {list.availability ? "ขาย" : "หมดแล้ว"}
                            </p>
                        </div>
                        <div className="mt-4 flex flex-col md:flex-row items-start justify-between">
                            <div className="flex flex-col">
                                <h3 className="AnakotmaiBOLD leading-tight break-words">
                                    {list.title}
                                </h3>
                                <h1 className="leading-tight break-words">
                                    โดย : {list.author.displayName}
                                </h1>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <p>{list.price.toLocaleString()} ฿</p>
                            </div>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
};

export default GoodsGrid;
