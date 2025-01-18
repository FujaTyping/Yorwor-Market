// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { BsBagXFill } from "react-icons/bs";
import GoodsGrid from "@/components/productGrid";

import marketConfig from "@/market-config.mjs";

export default function SearchPage() {
  const [title] = useState("Yorwor Market");
  const [goodsList, setGoodsList] = useState([]);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [gSearch, setGSearch] = useState("");
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  function searchforItems(GGID) {
    if (GGID == "") {
      router.push("/");
    } else {
      setPageStatus("Loading");
      setGSearch(`${GGID}`);
      axios
        .put(`${marketConfig.apiServer}good/bulk/search`, { searchQuery: `${GGID}` })
        .then((response) => {
          setPageStatus("Finish");
          setGoodsList(response.data.Goods);
        })
        .catch(() => {
          setPageStatus("Error");
          setGoodsList([]);
        });
    }
  }

  useEffect(() => {
    const GQuery = searchParams.get('query');
    if (GQuery) {
      setQuery(GQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      searchforItems(query);
    }
  }, [query]);

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
        <div className="text-center">
          <h1 className="text-3xl AnakotmaiBOLD">Yorwor Market</h1>
          <h3>โรงเรียนหาดใหญ่วิทยาลัย</h3>
        </div>
        <div>
          {pageStatus == "Loading" ? (
            <>
              <div className="flex items-center gap-4 mt-5">
                <Spinner color="default" />
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl AnakotmaiBOLD">กำลังค้นหาสินค้า</h1>
                  <p>กรุณารอสักครู่</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {
                goodsList.length > 0 ? (
                  <>
                    <section className="max-w-6xl">
                      <p className="w-full text-xl">เจอสินค้าสำหรับ <span className="AnakotmaiBOLD">{gSearch}</span> : <span className="AnakotmaiBOLD">{goodsList.length}</span> รายการ</p>
                      <div>
                        <GoodsGrid goodsList={goodsList} />
                      </div>
                    </section>
                  </>
                ) : (
                  <div className="flex items-center justify-center mt-4 gap-3 flex-col">
                    <BsBagXFill className="h-8 w-8" />
                    <div className="gap-1">
                      <h1 className="text-xl text-center">ไม่เจอสินค้าสำหรับการค้นหา : <span className="AnakotmaiBOLD">{gSearch}</span></h1>
                      <p className="text-center">ลองค้นหาด้วยคำอื่นดูสิ</p>
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
