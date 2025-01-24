"use client";

import { useState, useEffect } from "react";
import { MdContactMail } from "react-icons/md";
import { FaMapPin } from "react-icons/fa6";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import { IoSend } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import marketConfig from "@/market-config.mjs";
import useLocalStorge from "@/lib/localstorage-db";
import { FaWpforms } from "react-icons/fa6";
import Turnstile, { useTurnstile } from "react-turnstile";

function ContactPage() {
    const [title] = useState("Yorwor Market - ติดต่อ รายงานปัญหา");
    const { FireUser } = useLocalStorge();
    const turnstile = useTurnstile();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ux, setUX] = useState("");
    const [topic, setTopic] = useState("");
    const [verifyStats, setVerifyStats] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        if (FireUser?.uid) {
            setEmail(`${FireUser.email}`)
        }
    }, [FireUser]);

    function sendRequest() {
        const id = toast.loading("กำลังส่งข้อมูล ...");
        if (verifyStats) {
            axios
                .post(`${marketConfig.apiServer}contact`, {
                    email: `${email}`,
                    name: `${name}`,
                    ux: `${ux}`,
                    topic: `${topic}`,
                    text: `${text}`
                })
                .then((response) => {
                    if (response.data.error) {
                        toast.update(id, {
                            render: `ไม่สามารถส่งข้อมูลได้ กรุณากรอกข้อมูลให้ครบถ้วน`,
                            closeOnClick: true,
                            type: "error",
                            isLoading: false,
                            autoClose: 10000,
                        });
                    } else {
                        turnstile.reset();
                        toast.update(id, {
                            render: `ส่งข้อมูลเรียบร้อยแล้ว`,
                            type: "success",
                            isLoading: false,
                            autoClose: 3000,
                        });
                    }
                })
                .catch((error) => {
                    toast.update(id, {
                        render: `ไม่สามารถส่งข้อมูลได้ ${error.message}`,
                        closeOnClick: true,
                        type: "error",
                        isLoading: false,
                        autoClose: 10000,
                    });
                });
        } else {
            toast.update(id, {
                render: `กรุณายืนยันตัวตน`,
                closeOnClick: true,
                type: "error",
                isLoading: false,
                autoClose: 10000,
            });
        }
    }

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
            <div className="max-w-6xl mx-auto px-10 py-10">
                <div className="text-center px-6">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">ติดต่อเรา</h1>
                        <div className="flex">
                            <div className="h-1 w-20 bg-blue-500 rounded-l-lg"></div><div className="h-1 w-20 bg-red-500 rounded-r-lg"></div>
                        </div>
                    </div>
                    <p className="text-sm mt-3">หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการความช่วยเหลือ สามารถติดต่อเราได้ผ่านช่องทางต่อไปนี้</p>
                </div>

                <div className="grid lg:grid-cols-3 items-start gap-4 rounded-lg mt-6 shadow-lg mb-4">

                    <div className="bg-blue-500 rounded-lg p-6 h-full max-lg:order-1 text-white">
                        <h2 className="text-xl text-white AnakotmaiBOLD">ข้อมูลการติดต่อ</h2>
                        <p className="text-sm mt-4 AnakotmaiBOLD">หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการความช่วยเหลือ สามารถติดต่อเราได้ผ่านช่องทางต่อไปนี้</p>

                        <ul className="mt-16 space-y-4">
                            <li className="flex items-center">
                                <MdContactMail className="w-4 h-4" />
                                <p className="text-sm ml-4">
                                    yorwor@siraphop.me
                                </p>
                            </li>
                            <li className="flex items-center">
                                <FaMapPin className="w-4 h-4" />
                                <p className="text-sm ml-4">
                                    468 ถ.เพชรเกษม ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="p-4 lg:col-span-2">
                        <div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <Input
                                    label="ชื่อ"
                                    placeholder="eg. Ellen Joe"
                                    type="text"
                                    variant="bordered"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    label="อีเมล"
                                    placeholder="eg. 52647@hatyaiwit.ac.th"
                                    type="text"
                                    variant="bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <div className="relative flex items-center sm:col-span-2">
                                    <Select
                                        label="ประสบการณ์ในการใช้ Yorwor Market"
                                        placeholder="กรุณาเลือกตัวเลือก"
                                        variant="bordered"
                                        value={ux}
                                        onChange={(e) => setUX(e.target.value)}
                                    >
                                        <SelectItem
                                            key="ดีมาก"
                                        >
                                            ดีมาก
                                        </SelectItem>
                                        <SelectItem key="ดี">
                                            ดี
                                        </SelectItem>
                                        <SelectItem key="พอได้">
                                            พอได้
                                        </SelectItem>
                                        <SelectItem
                                            key="ใช้ไม่ได้เลย"
                                        >
                                            ใช้ไม่ได้เลย
                                        </SelectItem>
                                        <SelectItem
                                            key="แย่มาก"
                                        >
                                            แย่มาก
                                        </SelectItem>
                                    </Select>
                                </div>

                                <div className="col-span-full">
                                    <RadioGroup label="หัวข้อในการติดต่อ" orientation="horizontal"
                                        onChange={(e) => setTopic(e.target.value)}
                                        value={topic}
                                    >
                                        <Radio value="ปัญหาทั่วไป">ปัญหาทั่วไป</Radio>
                                        <Radio value="ปัญหาด้านเทคนิค">ปัญหาด้านเทคนิค</Radio>
                                        <Radio value="รายงานปัญหา">รายงานปัญหา</Radio>
                                        <Radio value="ข้อเสนอแนะ">ข้อเสนอแนะ</Radio>
                                    </RadioGroup>
                                </div>

                                <div className="relative flex items-center sm:col-span-2">
                                    <Textarea
                                        label="ข้อความที่จะติดต่อ"
                                        placeholder="eg. Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                                        variant="bordered"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center sm:justify-end items-center w-full mt-6">
                                <Turnstile
                                    sitekey="0x4AAAAAAA6IXUSqb0JMvGBQ"
                                    theme="light"
                                    language={"th"}
                                    onVerify={() => {
                                        setVerifyStats(true);
                                    }}
                                />
                            </div>

                            <Button
                                className={`mt-4 flex items-center justify-center text-white text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-3 ${verifyStats ? "bg-blue-500" : "bg-red-500"}`}
                                startContent={<IoSend />}
                                onPress={sendRequest}
                            >
                                ส่งคำขอ
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mx-auto lg:flex lg:items-center justify-between mt-12 mb-2">
                    <h2 className="text-3xl">
                        <span className="block AnakotmaiBOLD tracking-tight">ร่วมประเมิน Yorwor Market เพื่อการพัฒนาที่ดียิ่งขึ้น</span>
                        <span className="block pt-4 text-sm mt-2 max-w-lg">
                            แบบสอบถามนี้จัดทำขึ้นเพื่อเก็บความคิดเห็นของคุณเกี่ยวกับการใช้งาน Yorwor Market ช่วยให้เราสามารถปรับปรุงและพัฒนาบริการให้เหมาะสมกับความต้องการของผู้ใช้งานมากยิ่งขึ้น ขอบคุณสำหรับความร่วมมือ!
                        </span>
                    </h2>
                    <div className="mt-1 flex lg:flex-shrink-0 lg lg:mt-0">
                        <Button
                            className="mt-8 flex bg-red-500 text-white items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-3"
                            startContent={<FaWpforms />}
                            size="lg"
                            as={Link}
                            href="https://tally.so/r/nGXN0e"
                        >
                            ทำแบบประเมิณ
                        </Button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactPage