// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { User } from "@nextui-org/user";
import { IoFlag } from "react-icons/io5";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { ToastContainer, toast } from "react-toastify";
import { BsBagXFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import Link from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  LineIcon,
  LineShareButton,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { IoBagHandle } from "react-icons/io5";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import marketConfig from "@/market-config.mjs";

export default function ProductPage() {
  const [title, setTitle] = useState("Yorwor Market");
  const [goodsList, setGoodsList] = useState({});
  const [pageStatus, setPageStatus] = useState("Loading");
  const modalReport = useDisclosure();
  const modalShare = useDisclosure();
  const [Gid, setGid] = useState("");
  const [reportRadio, setReportRadio] = useState("");
  const [oneReport, setOneReport] = useState(false);
  const [thisURL, setThisUrl] = useState("");
  const [thisDecs, setThisDecs] = useState("เช็กเลย! <NAME> บน Yorwor Market!");

  function submitNewReport() {
    const id = toast.loading("กำลังรายงานสินค้า ...");

    axios
      .post(`${marketConfig.apiServer}report/good`, {
        gID: `${Gid}`,
        reason: `${reportRadio}`,
      })
      .then((response) => {
        if (response.data.error) {
          toast.update(id, {
            render: `ไม่สามารถรายงานสินค้าได้ กรุณาเลือกเหตุผล`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        } else {
          toast.update(id, {
            render: `รายงานลินค้าสำเร็จแล้ว`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setOneReport(true);
        }
      })
      .catch((error: any) => {
        toast.update(id, {
          render: `ไม่สามารถรายงานสินค้าได้  ${error.message}`,
          closeOnClick: true,
          type: "error",
          isLoading: false,
          autoClose: 10000,
        });
      });
  }

  const isValidUrl = (string) => {
    try {
      new URL(string);

      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    setPageStatus("Loading");
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get("id");

    setGid(productId);
    setThisUrl(`https://market.yorwor.siraphop.me/product?id=${productId}`);
    axios
      .put(`${marketConfig.apiServer}good/item`, { goodId: productId })
      .then((response) => {
        setPageStatus("Finish");
        setGoodsList(response.data);
        setTitle(`Yorwor Market - ${response.data.title}`);
        setThisDecs(`🛒 เช็กเลย! ${response.data.title} บน Yorwor Market!`);
      })
      .catch(() => {
        setPageStatus("Error");
        setGoodsList({});
      });
  }, []);

  return (
    <>
      <title>{title}</title>
      <meta content={title} property="og:title" />
      <ToastContainer
        closeOnClick
        newestOnTop
        hideProgressBar={false}
        position="bottom-right"
      />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-2xl md:text-3xl mb-2 AnakotmaiBOLD">ข้อมูลสินค้า</h1>
        <div className="flex">
          <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 my-5 mt-2 mx-10">
        <div className="p-5">
          {pageStatus == "Loading" ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4 mt-5 h-72">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                  <div className="w-28 h-28 border-4 text-blue-500 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-500 rounded-full">
                    <img src="/favicon.ico" className="animate-ping" alt="YW-Loading" />
                  </div>
                </div>
                <p className="AnakotmaiBOLD">กำลังโหลด</p>
              </div>
            </>
          ) : (
            <>
              <div>
                {goodsList.title ? (
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="md:flex-1">
                      <div className="rounded-lg">
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <PhotoProvider
                            bannerVisible={false}
                            maskOpacity={0.5}
                          >
                            <PhotoView src={goodsList.photoURL}>
                              <img
                                alt="Product"
                                className="h-full w-full object-cover max-w-full sm:max-w-md rounded-lg cursor-pointer"
                                loading="lazy"
                                src={goodsList.photoURL}
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </div>
                      </div>
                    </div>
                    <div className="md:flex-1">
                      <h2 className="text-2xl AnakotmaiBOLD mb-2 flex items-center gap-2">
                        {goodsList.title}
                        <Dropdown>
                          <DropdownTrigger>
                            <IoMdMore className="cursor-pointer" />
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              key="new"
                              startContent={<IoMdShare />}
                              onPress={modalShare.onOpen}
                            >
                              แชร์
                            </DropdownItem>
                            <DropdownItem
                              key="report"
                              className="text-danger"
                              color="danger"
                              startContent={<IoFlag />}
                              onPress={modalReport.onOpen}
                            >
                              รายงาน
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 whitespace-pre-line">
                        {goodsList.decs}
                      </p>
                      <div className="flex flex-col md:flex-row mb-4 gap-2 md:gap-4">
                        <div>
                          <span className="AnakotmaiBOLD text-gray-700">
                            ราคา :
                          </span>
                          <span className="text-gray-600">
                            {` ${goodsList.price.toLocaleString()} ฿`}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-700">
                            จำนวนสินค้า :
                          </span>
                          <span className="text-gray-600">
                            {goodsList.availability
                              ? (<>{goodsList.availability == -1 ? (<> ไม่จำกัด</>) : (<>{" "}{goodsList.availability}</>)}</>)
                              : ` หมดแล้ว`}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start cursor-pointer">
                        <span className="AnakotmaiBOLD text-gray-700">
                          ข้อมูลผู้ขาย :
                        </span>
                        <Link href={`/store?email=${goodsList.author.email}`}>
                          <Tooltip content="คลิกเพื่อดูร้านค้า">
                            <User
                              avatarProps={{
                                src: goodsList.author.photoURL,
                                size: "sm",
                              }}
                              className="mt-2"
                              description={`ลงสินค้าวันที่ : ${goodsList.addDate}`}
                              name={goodsList.author.displayName}
                            />
                          </Tooltip>
                        </Link>
                      </div>
                      {goodsList.social.platform ? (
                        <>
                          <div className="flex flex-col sm:flex-row mt-5 gap-3">
                            <Tooltip content="สั่งชื้อสินค้ากับผู้ขายโดยตรง">
                              <Button
                                color="primary"
                                startContent={<IoBagHandle />}
                                {...(isValidUrl(goodsList.social.platformName)
                                  ? {
                                    as: "a",
                                    href: goodsList.social.platformName,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                  : {})}
                              >
                                ติดต่อผู้ขายผ่าน {goodsList.social.platform}{" "}
                                {!isValidUrl(goodsList.social.platformName) &&
                                  `: ${goodsList.social.platformName}`}
                              </Button>
                            </Tooltip>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col sm:flex-row mt-5 gap-3">
                            <Button
                              isDisabled
                              startContent={<IoBagHandle />}
                            >
                              ผู้ขายไม่ได้ให้ช่องทางติดต่อไว้
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center flex-col h-screen justify-center md:gap-6">
                    <BsBagXFill className="w-8 h-8" />
                    <div className="flex flex-col gap-1 justify-center">
                      <h1 className="text-xl mt-3 AnakotmaiBOLD">
                        ไม่มีสินค้านี้
                      </h1>
                      <p>
                        กรุณาเช็คไอดีของสินค้าให้ดี{" "}
                        <span className="AnakotmaiBOLD">{`(${Gid})`}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalReport.isOpen}
        placement="top"
        onOpenChange={modalReport.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {oneReport ? (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {"You can't report this item !"}
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <div className="bg-white rounded-lg">
                        <div>
                          <form>
                            <h1>{`You're already report for ${goodsList.title}`}</h1>
                          </form>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter />
                </>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    รายงาน {goodsList.title} ?
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <div className="bg-white rounded-lg">
                        <div>
                          <form className="flex flex-col gap-4">
                            <RadioGroup
                              label="เหตุผลที่คุณรายงานสินค้านี้"
                              onChange={(e) => setReportRadio(e.target.value)}
                            >
                              <Radio value="ฉันไม่ชอบสินค้านี้">
                                ฉันไม่ชอบสินค้านี้
                              </Radio>
                              <Radio value="สินค้าละเมิดลิขสิทธิ์">
                                สินค้าละเมิดลิขสิทธิ์
                              </Radio>
                              <Radio value="สินค้าต้องห้าม">
                                สินค้าต้องห้าม
                              </Radio>
                              <Radio value="ผู้ขายมีการฉ้อโกง">
                                ผู้ขายมีการฉ้อโกง
                              </Radio>
                              <Radio value="การขายสินค้าของผู้อื่น">
                                การขายสินค้าของผู้อื่น
                              </Radio>
                            </RadioGroup>
                          </form>
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        if (!reportRadio == "") {
                          onClose();
                        }
                        submitNewReport();
                      }}
                    >
                      รายงาน
                    </Button>
                    <Button
                      color="primary"
                      variant="bordered"
                      onPress={onClose}
                    >
                      ยกเลิก
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modalShare.isOpen}
        placement="top"
        onOpenChange={modalShare.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                แชร์ {goodsList.title} ?
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="bg-white rounded-lg">
                    <div>
                      <h1 className="AnakotmaiBOLD">แชร์ด้วยข้อความ</h1>
                      <div className="mb-5 mt-1">
                        <p>
                          {thisDecs} : {thisURL}
                        </p>
                      </div>
                      <h1 className="AnakotmaiBOLD">แชร์ด้วยโซเชียลมีเดีย</h1>
                      <form className="flex justify-center gap-4 mt-3">
                        <FacebookShareButton title={thisDecs} url={thisURL}>
                          <FacebookIcon round size={40} />
                        </FacebookShareButton>
                        <LineShareButton title={thisDecs} url={thisURL}>
                          <LineIcon round size={40} />
                        </LineShareButton>
                        <RedditShareButton
                          className="Demo__some-network__share-button"
                          title={thisDecs}
                          url={thisURL}
                        >
                          <RedditIcon round size={40} />
                        </RedditShareButton>
                        <TwitterShareButton
                          className="Demo__some-network__share-button"
                          title={thisDecs}
                          url={thisURL}
                        >
                          <XIcon round size={40} />
                        </TwitterShareButton>
                      </form>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
