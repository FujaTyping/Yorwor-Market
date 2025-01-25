// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsBagXFill } from "react-icons/bs";
import { Tooltip } from "@nextui-org/tooltip";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { TbSortAscendingShapes } from "react-icons/tb";

import GoodsGrid from "@/components/productGrid";
import marketConfig from "@/market-config.mjs";
import ProductLoaders from "@/components/productLoaders";

export default function SearchPage() {
  const [title] = useState("Yorwor Market");
  const [goodsList, setGoodsList] = useState([]);
  const [filteredGoodsList, setFilteredGoodsList] = useState(goodsList);
  const [pageStatus, setPageStatus] = useState("Loading");
  const [gSearch, setGSearch] = useState("");
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalSort = useDisclosure();
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(0);
  const [sortType, setSortType] = useState("ราคาต่ำไปหาสูง");

  function filterAndSortGoods() {
    if (priceEnd > 0 || priceStart > 0) {
      let filteredGoods = goodsList.filter((item) => {
        return item.price >= priceStart && item.price <= priceEnd;
      });

      if (sortType === "ราคาต่ำไปหาสูง") {
        filteredGoods.sort((a, b) => a.price - b.price);
      } else if (sortType === "ราคาสูงไปต่ำ") {
        filteredGoods.sort((a, b) => b.price - a.price);
      }

      setFilteredGoodsList(filteredGoods);
    } else {
      let filteredGoods = goodsList;

      if (sortType === "ราคาต่ำไปหาสูง") {
        filteredGoods.sort((a, b) => a.price - b.price);
      } else if (sortType === "ราคาสูงไปต่ำ") {
        filteredGoods.sort((a, b) => b.price - a.price);
      }

      setFilteredGoodsList(filteredGoods);
    }
  }

  function searchforItems(GGID) {
    if (GGID == "") {
      router.push("/");
    } else {
      setPageStatus("Loading");
      setGSearch(`${GGID}`);
      axios
        .put(`${marketConfig.apiServer}good/bulk/search`, {
          searchQuery: `${GGID}`,
        })
        .then((response) => {
          setPageStatus("Finish");
          setGoodsList(response.data.Goods);
          setFilteredGoodsList(response.data.Goods);

          if (priceEnd > 0 || priceStart > 0) {
            filterAndSortGoods();
          }
        })
        .catch(() => {
          setPageStatus("Error");
          setGoodsList([]);
          setFilteredGoodsList([]);
        });
    }
  }

  useEffect(() => {
    const GQuery = searchParams.get("query");

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
      <meta content={title} property="og:title" />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">ค้นหาสินค้า</h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
          <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mt-4 mx-10">
        <div>
          {pageStatus == "Loading" ? (
            <>
              <ProductLoaders />
            </>
          ) : (
            <>
              {goodsList.length > 0 ? (
                <>
                  <section className="max-w-6xl mb-5">
                    <div className="w-full text-xl flex justify-between items-center gap-4">
                      <div>
                        เจอสินค้าสำหรับ{" "}
                        <span className="AnakotmaiBOLD">{gSearch}</span> :{" "}
                        <span className="AnakotmaiBOLD">
                          {filteredGoodsList.length}
                        </span>{" "}
                        รายการ
                      </div>
                      <div className="justify-end">
                        <Tooltip content="ปรับแต่งตัวกรอง">
                          <TbSortAscendingShapes
                            className="w-6 h-6 cursor-pointer"
                            onClick={modalSort.onOpen}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      <GoodsGrid goodsList={filteredGoodsList} />
                    </div>
                  </section>
                </>
              ) : (
                <div className="flex flex-col h-72 items-center justify-center mt-4 gap-3 flex-col">
                  <BsBagXFill className="h-8 w-8" />
                  <div className="gap-1">
                    <h1 className="text-xl text-center">
                      ไม่เจอสินค้าสำหรับการค้นหา :{" "}
                      <span className="AnakotmaiBOLD">{gSearch}</span>
                    </h1>
                    <p className="text-center">ลองค้นหาด้วยคำอื่นดูสิ</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalSort.isOpen}
        placement="top"
        onOpenChange={modalSort.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ตัวกรอง</ModalHeader>
              <ModalBody>
                <div>
                  <div className="bg-white rounded-lg">
                    <div>
                      <form className="flex flex-col gap-4">
                        <p>สินค้าอยู่ในระหว่างช่วงราคา</p>
                        <Select
                          label="การเรียงลำดับราคา"
                          placeholder="กรุณาเลือกรูปแบบ"
                          value={sortType}
                          variant="bordered"
                          onChange={(e) => setSortType(e.target.value)}
                        >
                          <SelectItem key="ราคาต่ำไปหาสูง">
                            ราคาต่ำไปหาสูง
                          </SelectItem>
                          <SelectItem key="ราคาสูงไปต่ำ">
                            ราคาสูงไปต่ำ
                          </SelectItem>
                        </Select>
                        <div className="flex gap-3 items-center">
                          <Input
                            label="ตั้งแต่ราคา"
                            placeholder="0"
                            type="number"
                            value={priceStart.toString()}
                            variant="bordered"
                            onChange={(e) =>
                              setPriceStart(parseInt(e.target.value))
                            }
                          />
                          <p className="text-xl AnakotmaiBOLD">-</p>
                          <Input
                            label="ถึง"
                            placeholder="0"
                            type="number"
                            value={priceEnd.toString()}
                            variant="bordered"
                            onChange={(e) =>
                              setPriceEnd(parseInt(e.target.value))
                            }
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={() => {
                    onClose();
                    setFilteredGoodsList(goodsList);
                  }}
                >
                  ล้างตัวกรอง
                </Button>
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={() => {
                    onClose();
                    filterAndSortGoods();
                  }}
                >
                  อัพเดทตัวกรอง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
