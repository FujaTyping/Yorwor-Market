// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { BsBagXFill } from "react-icons/bs";
import { User } from "@nextui-org/user";

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";

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
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <div className="text-center">
          <h1 className="text-3xl AnakotmaiBOLD">Yorwor Market</h1>
          <h3>โรงเรียนหาดใหญ่วิทยาลัย</h3>
        </div>
        <div className="flex flex-col justify-center">
          {pageStatus == "Loading" ? (
            <>
              <div className="flex items-center gap-4 mt-5">
                <Spinner color="default" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl AnakotmaiBOLD">
                    กำลังโหลดข้อมูลร้านค้า
                  </h1>
                  <p>อาจจะใช้เวลาสักครู่</p>
                </div>
              </div>
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
                  <section className="max-w-6xl">
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
                <div className="flex items-center justify-center my-3 gap-3 flex-col">
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
