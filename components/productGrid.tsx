"use client";

import { useState } from "react";
import Link from "next/link";
import { BsBagXFill } from "react-icons/bs";
import { Button } from "@heroui/button";
import { BiLoader } from "react-icons/bi";

interface GoodsItem {
  id: string;
  photoURL: string;
  availability: number;
  title: string;
  decs: string;
  author: {
    displayName: string;
  };
  price: number;
}

interface GoodsListProps {
  goodsList: GoodsItem[];
}

const GoodsGrid: React.FC<GoodsListProps> = ({ goodsList }) => {
  const ITEMS_PER_LOAD = 10;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD);

  const handleLoadMore = () => {
    setVisibleItems((prevVisible) => prevVisible + ITEMS_PER_LOAD);
  };

  return (
    <>
      {goodsList.length > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {goodsList.slice(0, visibleItems).map((list, index) => (
              <Link key={index} href={`/product?id=${list.id}`}>
                <div className="relative bg-white rounded p-3 cursor-pointer hover:-translate-y-1 transition-all border-solid border-inherit border-2">
                  <div
                    className="absolute top-0 mt-2 -ml-1 rounded-full bg-white backdrop-blur-sm bg-opacity-50"
                    style={{ zIndex: 11 }}
                  >
                    {list.availability ? (
                      <>
                        {list.availability === -1 ? (
                          <p className="text-[12px] rounded-full bg-blue-400 p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                            ไม่จำกัด
                          </p>
                        ) : (
                          <p className="text-[12px] rounded-full bg-blue-400 p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                            ขาย
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-[12px] rounded-full bg-red-400 p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
                        หมดแล้ว
                      </p>
                    )}
                  </div>

                  <div className="mb-4 rounded">
                    <img
                      alt="Product"
                      className="aspect-square w-full object-cover rounded-md"
                      src={list.photoURL}
                    />
                  </div>

                  <div>
                    <h5 className="text-base AnakotmaiBOLD">{list.title}</h5>
                    <p className="text-[13px] mt-2">
                      {list.decs.length > 40
                        ? list.decs.slice(0, 40) + "..."
                        : list.decs}
                    </p>
                    <h6 className="text-base AnakotmaiBOLD ml-auto mt-2">
                      {list.price.toLocaleString()} ฿
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {visibleItems < goodsList.length && (
            <div className="mt-4 text-center">
              <Button
                color="primary"
                startContent={<BiLoader />}
                onPress={handleLoadMore}
              >
                โหลดสินค้าเพิ่มเติม
              </Button>
            </div>
          )}
        </>
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
