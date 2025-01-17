// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import { Spinner } from "@nextui-org/spinner";
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
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
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

import marketConfig from "@/market-config.mjs";


export default function ProductPage() {
    const [title, setTitle] = useState("Yorwor Market");
    const [goodsList, setGoodsList] = useState([]);
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
            .post(`${marketConfig.apiServer}report/good`,
                { gID: `${Gid}`, reason: `${reportRadio}` }
            )
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

    useEffect(() => {
        setPageStatus("Loading");
        const queryParams = new URLSearchParams(window.location.search);
        const productId = queryParams.get('id');
        setGid(productId);
        setThisUrl(`https://market.yorwor.siraphop.me/product?id=${productId}`);
        axios
            .put(`${marketConfig.apiServer}good/item`, { goodId: productId })
            .then((response) => {
                setPageStatus("Finish");
                setGoodsList(response.data.Goods);
                setTitle(`Yorwor Market - ${response.data.Goods[0].title}`)
                setThisDecs(`🛒 เช็กเลย! ${response.data.Goods[0].title} บน Yorwor Market!`)
            })
            .catch(() => {
                setPageStatus("Error");
                setGoodsList([]);
            });
    }, []);

    return (
        <>
            <title>{title}</title>
            <ToastContainer
                closeOnClick
                newestOnTop
                hideProgressBar={false}
                position="bottom-right"
            />
            <div className="flex flex-col items-center justify-center gap-5 my-5 mx-10">
                <div className="p-5">
                    {pageStatus == "Loading" ? (
                        <>
                            <div className="flex items-center justify-center gap-4 mt-5">
                                <Spinner color="default" />
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl AnakotmaiBOLD">กำลังโหลดข้อมูลสินค้า</h1>
                                    <p>กรุณารอสักครู่</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                {goodsList && goodsList.length > 0 ? (
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <div className="md:flex-1">
                                            <div className="rounded-lg">
                                                <div className="aspect-square overflow-hidden rounded-lg">
                                                    <img loading="lazy" className="h-full w-full object-cover max-w-full sm:max-w-md rounded-lg" src={goodsList[0].photoURL} alt="Product" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex-1">
                                            <h2 className="text-2xl AnakotmaiBOLD text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                                                {goodsList[0].title}
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button isIconOnly startContent={<IoMdMore />} variant="bordered" className="w-2"></Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Static Actions">
                                                        <DropdownItem startContent={< IoMdShare />} key="new" onPress={modalShare.onOpen}>แชร์</DropdownItem>
                                                        <DropdownItem startContent={<IoFlag />} key="report" className="text-danger" color="danger" onPress={modalReport.onOpen}>
                                                            รายงาน
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 whitespace-pre-line">
                                                {goodsList[0].decs}
                                            </p>
                                            <div className="flex flex-col md:flex-row mb-4 gap-2 md:gap-4">
                                                <div>
                                                    <span className="AnakotmaiBOLD text-gray-700 dark:text-gray-300">
                                                        ราคา :
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {` ${goodsList[0].price.toLocaleString()} ฿`}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                                        จำนวนสินค้า :
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {goodsList[0].availability ? (` ${goodsList[0].availability}`) : (` หมดแล้ว`)}
                                                    </span>
                                                </div>
                                            </div>


                                            <div className="flex flex-col items-start cursor-pointer">
                                                <span className="AnakotmaiBOLD text-gray-700 dark:text-gray-300">
                                                    ข้อมูลผู้ขาย :
                                                </span>
                                                <Link href={`/store?email=${goodsList[0].author.email}`}>
                                                    <Tooltip content="คลิกเพื่อดูร้านค้า">
                                                        <User
                                                            className="mt-2"
                                                            avatarProps={{
                                                                src: goodsList[0].author.photoURL,
                                                                size: "sm",
                                                            }}
                                                            name={goodsList[0].author.displayName}
                                                            description={`ลงสินค้าวันที่ : ${goodsList[0].addDate}`}
                                                        />
                                                    </Tooltip>
                                                </Link>
                                            </div>
                                            <div className="flex flex-col sm:flex-row mt-5 gap-3">
                                                <Tooltip content="ไม่สามารถชื้อได้ในขณะนี้">
                                                    <Button
                                                        isDisabled={!goodsList[0].availability}
                                                        color="danger"
                                                        variant="bordered"
                                                        className="cursor-not-allowed"
                                                        startContent={<FaCartPlus />}
                                                    >
                                                        ชื้อเลย
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center flex-col md:flex-row md:gap-6">
                                        <BsBagXFill className="w-8 h-8" />
                                        <div className="flex flex-col gap-1 justify-center">
                                            <h1 className="text-xl mt-3 AnakotmaiBOLD">ไม่มีสินค้านี้</h1>
                                            <p>กรุณาเช็คไอดีของสินค้าให้ดี <span className="AnakotmaiBOLD">{`(${Gid})`}</span></p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal isOpen={modalReport.isOpen} onOpenChange={modalReport.onOpenChange} placement="top">
                <ModalContent>
                    {(onClose) => (
                        <>
                            {oneReport ? (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">{"You can't report this item !"}</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <div className="bg-white rounded-lg">
                                                <div>
                                                    <form>
                                                        <h1>{`You're already report for ${goodsList[0].title}`}</h1>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                    </ModalFooter>
                                </>
                            ) : (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">รายงาน {goodsList[0].title} ?</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <div className="bg-white rounded-lg">
                                                <div>
                                                    <form className="flex flex-col gap-4">
                                                        <RadioGroup onChange={(e) => setReportRadio(e.target.value)} label="เหตุผลที่คุณรายงานสินค้านี้">
                                                            <Radio value="ฉันไม่ชอบสินค้านี้">ฉันไม่ชอบสินค้านี้</Radio>
                                                            <Radio value="สินค้าละเมิดลิขสิทธิ์">สินค้าละเมิดลิขสิทธิ์</Radio>
                                                            <Radio value="สินค้าต้องห้าม">สินค้าต้องห้าม</Radio>
                                                            <Radio value="ผู้ขายมีการฉ้อโกง">ผู้ขายมีการฉ้อโกง</Radio>
                                                            <Radio value="การขายสินค้าของผู้อื่น">การขายสินค้าของผู้อื่น</Radio>
                                                        </RadioGroup>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={() => { if (!reportRadio == "") { onClose() }; submitNewReport() }}>
                                            รายงาน
                                        </Button>
                                        <Button variant="bordered" color="primary" onPress={onClose}>
                                            ยกเลิก
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={modalShare.isOpen} onOpenChange={modalShare.onOpenChange} placement="top">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">แชร์ {goodsList[0].title} ?</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="bg-white rounded-lg">
                                        <div>
                                            <h1 className="AnakotmaiBOLD">แชร์ด้วยข้อความ</h1>
                                            <div className="mb-5 mt-1">
                                                <p>{thisDecs} : {thisURL}</p>
                                            </div>
                                            <h1 className="AnakotmaiBOLD">แชร์ด้วยโซเชียลมีเดีย</h1>
                                            <form className="flex justify-center gap-4 mt-3">
                                                <FacebookShareButton url={thisURL} title={thisDecs}>
                                                    <FacebookIcon size={40} round />
                                                </FacebookShareButton>
                                                <LineShareButton url={thisURL} title={thisDecs}>
                                                    <LineIcon size={40} round />
                                                </LineShareButton>
                                                <RedditShareButton url={thisURL} title={thisDecs} className="Demo__some-network__share-button">
                                                    <RedditIcon size={40} round />
                                                </RedditShareButton>
                                                <TwitterShareButton url={thisURL} title={thisDecs} className="Demo__some-network__share-button">
                                                    <XIcon size={40} round />
                                                </TwitterShareButton>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
