import React from "react";
import Link from "next/link";
import { BsBagXFill } from "react-icons/bs";

interface GoodsItem {
  id: string;
  photoURL: string;
  availability: number;
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
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {goodsList.map((list, index) => (
            <Link key={index} href={`/product?id=${list.id}`}>
              <article className="relative shadow-lg rounded-lg border-2 border-slate-200 border-solid">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    alt="Product"
                    className="hover:scale-110 h-full w-full object-cover transition-all duration-200 rounded-lg"
                    loading="lazy"
                    src={list.photoURL}
                  />
                </div>
                <div
                  className="absolute top-0 m-1 rounded-full bg-white backdrop-blur-sm bg-opacity-50"
                  style={{ zIndex: 11 }}
                >
                  {list.availability ? (
                    <>
                      {list.availability == -1 ? (<><p className="text-[12px] rounded-full bg-blue-400 p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">ไม่จำกัด</p></>) : (<><p className="text-[12px] rounded-full bg-blue-400 p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">ขาย</p></>)}
                    </>
                  ) : (
                    <p className="text-[12px] rounded-full bg-red-400 p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">หมดแล้ว</p>
                  )}
                </div>
                <div className="mt-4 px-3 pb-3 flex flex-col items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="AnakotmaiBOLD leading-tight break-words">
                      {list.title}
                    </h3>
                    <h1 className="leading-tight break-words">
                      โดย : {list.author.displayName}
                    </h1>
                  </div>
                  <div className="text-right mt-2">
                    <p>{list.price.toLocaleString()} ฿</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center flex-col h-72 justify-center md:flex-row md:gap-6 mt-5">
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
