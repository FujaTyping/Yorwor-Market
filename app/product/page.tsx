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


export default function Home() {
    const [title, setTitle] = useState("Yorwor Market");
    const [goodsList, setGoodsList] = useState([]);
    const [pageStatus, setPageStatus] = useState("Loading");
    const modalReport = useDisclosure();
    const modalShare = useDisclosure();
    const [Gid, setGid] = useState("");
    const [reportRadio, setReportRadio] = useState("");
    const [oneReport, setOneReport] = useState(false);
    const [thisURL, setThisUrl] = useState("");
    const [thisDecs, setThisDecs] = useState("Check out <NAME> on Yorwor Market!");

    function submitNewReport() {
        const id = toast.loading("Adding new product ...");
        axios
            .post(`${marketConfig.apiServer}report/good`,
                { gID: `${Gid}`, reason: `${reportRadio}` }
            )
            .then((response) => {
                if (response.data.error) {
                    toast.update(id, {
                        render: `Failed report this product (Fill in all input)`,
                        closeOnClick: true,
                        type: "error",
                        isLoading: false,
                        autoClose: 10000,
                    });
                } else {
                    toast.update(id, {
                        render: `Successfully report this product`,
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    setOneReport(true);
                }
            })
            .catch((error: any) => {
                toast.update(id, {
                    render: `Failed report this product ${error.message}`,
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
                setThisDecs(`🛒 Check out ${response.data.Goods[0].title} on Yorwor Market!`)
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
                                    <h1 className="text-xl">Loading product details</h1>
                                    <p>This may take a few second</p>
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
                                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                                                {goodsList[0].title}
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button isIconOnly startContent={<IoMdMore />} variant="bordered" className="w-2"></Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Static Actions">
                                                        <DropdownItem startContent={< IoMdShare />} key="new" onPress={modalShare.onOpen}>Share</DropdownItem>
                                                        <DropdownItem startContent={<IoFlag />} key="report" className="text-danger" color="danger" onPress={modalReport.onOpen}>
                                                            Report
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 whitespace-pre-line">
                                                {goodsList[0].decs}
                                            </p>
                                            <div className="flex flex-col md:flex-row mb-4 gap-2 md:gap-4">
                                                <div>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                                        Price :
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {` ${goodsList[0].price} ฿`}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                                        Quantity :
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-300">
                                                        {goodsList[0].availability ? (` In stocks (${goodsList[0].availability})`) : (` Out of stocks`)}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/store?email=${goodsList[0].author.email}`}>
                                                <div className="flex flex-col items-start cursor-pointer">
                                                    <span className="font-bold text-gray-700 dark:text-gray-300">
                                                        Author info :
                                                    </span>
                                                    <User
                                                        className="mt-2"
                                                        avatarProps={{
                                                            src: goodsList[0].author.photoURL,
                                                            size: "sm",
                                                        }}
                                                        name={goodsList[0].author.displayName}
                                                        description={`Added : ${goodsList[0].addDate}`}
                                                    />
                                                </div>
                                            </Link>
                                            <div className="flex flex-col sm:flex-row mt-5 gap-3">
                                                <Tooltip content="You cannot buy this right now">
                                                    <Button
                                                        isDisabled={!goodsList[0].availability}
                                                        color="danger"
                                                        variant="bordered"
                                                        className="cursor-not-allowed"
                                                        startContent={<FaCartPlus />}
                                                    >
                                                        Buy now
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center flex-col md:flex-row md:gap-6">
                                        <BsBagXFill className="w-8 h-8" />
                                        <div className="flex flex-col gap-1 justify-center">
                                            <h1 className="text-xl mt-3">No Product Available</h1>
                                            <p>Check the id of the product <b>{`(${Gid})`}</b></p>
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
                                    <ModalHeader className="flex flex-col gap-1">Report {goodsList[0].title} ?</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <div className="bg-white rounded-lg">
                                                <div>
                                                    <form className="flex flex-col gap-4">
                                                        <RadioGroup onChange={(e) => setReportRadio(e.target.value)} label="Why you report this product">
                                                            <Radio value="I dont like it">{"I don't like it"}</Radio>
                                                            <Radio value="Copyright infringement">Copyright infringement</Radio>
                                                            <Radio value="Prohibited goods">Prohibited goods</Radio>
                                                            <Radio value="It is considered fraudulent">It is considered fraudulent</Radio>
                                                            <Radio value="Selling other people products">{"Selling other people's products"}</Radio>
                                                        </RadioGroup>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={() => { if (!reportRadio == "") { onClose() }; submitNewReport() }}>
                                            Submit
                                        </Button>
                                        <Button variant="bordered" color="primary" onPress={onClose}>
                                            Close
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
                            <ModalHeader className="flex flex-col gap-1">Share {goodsList[0].title} ?</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="bg-white rounded-lg">
                                        <div>
                                            <h1><b>Share with text</b></h1>
                                            <div className="mb-5 mt-1">
                                                <p>{thisDecs} : {thisURL}</p>
                                            </div>
                                            <h1><b>Share with platform</b></h1>
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
