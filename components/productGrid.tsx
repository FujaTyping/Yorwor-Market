import React from "react";
import Link from "next/link";
import { BsBagXFill } from "react-icons/bs";

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
    <>
      {goodsList.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {goodsList.map((list, index) => (
            <Link key={index} href={`/product?id=${list.id}`}>
              <article className="relative">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    alt="Product"
                    className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg"
                    loading="lazy"
                    src={list.photoURL}
                  />
                </div>
                <div
                  className="absolute top-0 m-1 rounded-full bg-white"
                  style={{ zIndex: 11 }}
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
      ) : (
        <div className="flex items-center flex-col md:flex-row md:gap-6 mt-5">
          <BsBagXFill className="w-8 h-8" />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-center mt-3 AnakotmaiBOLD">
              ยังไม่มีสินค้า ณ ตอนนี้
            </h1>
            <p className="text-center">ลองเป็นคนแรกที่ลงขายของดูสิ !</p>
          </div>
        </div>
      )}
    </>
  );
};

export default GoodsGrid;
