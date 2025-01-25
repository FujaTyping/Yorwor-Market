// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BsBagXFill } from "react-icons/bs";
import { User } from "@nextui-org/user";
import { Skeleton } from "@nextui-org/skeleton";

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";

export default function StorePage() {
  const [title] = useState("Yorwor Market");
  const [uList, setUList] = useState([]);
  const [duckList, setDuckList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [emailQ, setEmailQ] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const GMail = queryParams.get("email");

    setEmailQ(GMail);
    axios
      .put(`${marketConfig.apiServer}store/user`, { uID: GMail })
      .then((response) => {
        setUList(response.data.User);
        axios
          .put(`${marketConfig.apiServer}good/bulk`, {
            goodsIds: response.data.User.goods,
          })
          .then((response) => {
            if (response.data.error) {
              setPageStatus("Error");
              setDuckList([]);
            } else {
              setPageStatus("Finish");
              setDuckList(response.data.Goods);
            }
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
      <meta content={title} property="og:title" />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">
          ข้อมูลร้านค้า
        </h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
          <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5  mx-10">
        <div className="flex flex-col justify-center">
          {pageStatus == "Loading" ? (
            <>
              <div className="w-full flex items-center justify-center mb-4 mt-2">
                <div className="max-w-[300px] w-full flex flex-row items-center gap-3">
                  <div>
                    <Skeleton className="flex rounded-full w-16 h-16" />
                  </div>
                  <div className="w-full flex flex-col items-left gap-2">
                    <Skeleton className="h-4 w-3/5 rounded-lg" />
                    <Skeleton className="h-4 w-4/5 rounded-lg" />
                  </div>
                </div>
              </div>
              <ProductLoaders />
            </>
          ) : (
            <>
              {duckList.length > 0 ? (
                <>
                  <User
                    avatarProps={{
                      src: uList.photoURL,
                      size: "lg",
                    }}
                    className="my-2"
                    description={<p>{uList.bio}</p>}
                    name={<p className="text-xl">{uList.displayName}</p>}
                  />
                  <section className="max-w-6xl mb-2">
                    <div>
                      <h1 className="text-xl my-2">
                        สินค้าของ{" "}
                        <span className="AnakotmaiBOLD">
                          {uList.displayName}
                        </span>{" "}
                        : ทั้งหมด{" "}
                        <span className="AnakotmaiBOLD">{duckList.length}</span>{" "}
                        รายการ
                      </h1>
                      <GoodsGrid goodsList={duckList} />
                    </div>
                  </section>
                </>
              ) : (
                <div className="flex items-center justify-center flex-col h-72 my-3 gap-3 flex-col">
                  <BsBagXFill className="h-8 w-8" />
                  <div className="gap-1">
                    <h1 className="text-xl text-center">
                      ร้านค้าของ <span className="AnakotmaiBOLD">{emailQ}</span>{" "}
                      ยังไม่มีสินค้า
                    </h1>
                    <p className="text-center">
                      เจ้าของอาจจะเพิ่มสินค้ามาเร็วๆนี้ ก็ได้
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
