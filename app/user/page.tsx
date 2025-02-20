// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import NoAcc from "@/assets/media/icon/Animated/Key.gif";
import NoLogin from "@/assets/media/icon/Animated/User.gif"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { MdDeleteForever } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { Tooltip } from "@heroui/tooltip";
import { Select, SelectItem } from "@heroui/select";
import { FaLine } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import Turnstile, { useTurnstile } from "react-turnstile";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { FaShop } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdSwitchAccount } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { FaMoneyBill } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserLock } from "react-icons/fa";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Chip } from "@heroui/chip";
import { GrTest } from "react-icons/gr";

import { signInWithGoogle } from "../../lib/firebase-auth";

import useLocalStorge from "@/lib/localstorage-db";
import marketConfig from "@/market-config.mjs";
import firebaseConfig from "@/lib/firebase-config";
import Loaders from "@/components/loaders";

export default function UserPage() {
  const [title, setTitle] = useState("Yorwor Market");
  const router = useRouter();
  const { FireUser } = useLocalStorge();
  const app = initializeApp(firebaseConfig);
  const [userDetails, setUserDetails] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [filePrv, setFilePrv] = useState("");
  const [fileUrlPrv, setFileUrlPrv] = useState("");
  const [userState, setUserState] = useState("NoMember");
  const [inputForm, setInputForm] = useState("");
  const [inputBioForm, setInputBioForm] = useState("");
  const [realUserName, setRealUserName] = useState("");
  const [realUserBio, setRealUserBio] = useState("");
  const modalProduct = useDisclosure();
  const modalDelete = useDisclosure();
  const modalQuan = useDisclosure();
  const [pageStatus, setPageStatus] = useState("Loading");
  const [goodsID, setGoodsID] = useState("");
  const [platformD, setPlatformD] = useState("");
  const [platformNameD, setPlatformNameD] = useState("");
  const [goodsQuan, setGoodsQuan] = useState(0);
  const turnstile = useTurnstile();

  const [Gprice, setGPrice] = useState(0);
  const [Gtitle, setGTitle] = useState("");
  const [carG, setCarG] = useState("ไม่มี");
  const [Gdecs, setGDecs] = useState("");
  const [GphotoURL, setGPhotoURL] = useState("");
  const [verifyStats, setVerifyStats] = useState(false);

  function createNewUser() {
    const id = toast.loading("กำลังสมัครสมาชิก ...");

    if (verifyStats) {
      axios
        .post(`${marketConfig.apiServer}user/new`, {
          displayNAME: `${inputForm}`,
          email: `${FireUser.email}`,
          bio: `${inputBioForm}`,
          photoURL: `${FireUser.photoURL}`,
        })
        .then((response) => {
          if (response.data.error) {
            toast.update(id, {
              render: `ไม่สามารถสมัครสมาชิกได้ กรุณากรอกข้อมูลให้ครบถ้วน`,
              closeOnClick: true,
              type: "error",
              isLoading: false,
              autoClose: 10000,
            });
          } else {
            if (response.data == "You already have an account") {
              toast.update(id, {
                render: `อีเมลนี้เป็นสมาชิกอยู่แล้ว`,
                closeOnClick: true,
                type: "error",
                isLoading: false,
                autoClose: 10000,
              });
            } else {
              turnstile.reset();
              toast.update(id, {
                render: `สมัครสมาชิกสำเร็จ`,
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          }
        })
        .catch(() => {
          toast.update(id, {
            render: `ไม่สามารถสมัครสมาชิกได้ ${Error.message}`,
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

  function submitNewGoods() {
    const id = toast.loading("กำลังเพิ่มสินค้า ...");

    if (
      !Gtitle ||
      !Gdecs ||
      !Gprice ||
      !file ||
      !goodsQuan ||
      !platformD ||
      !platformNameD
    ) {
      toast.update(id, {
        render: `กรุณากรอกข้อมูลให้ครบถ้วน`,
        closeOnClick: true,
        type: "error",
        isLoading: false,
        autoClose: 10000,
      });
    } else {
      axios
        .post(
          `https://api.imgbb.com/1/upload`,
          { key: "2dd550a902838594c15570cc01632214", image: filePrv },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then((response) => {
          const imageLInk = response.data.data.image.url;

          axios
            .post(`${marketConfig.apiServer}good/new`, {
              email: `${FireUser.email}`,
              title: `${Gtitle}`,
              decs: `${Gdecs}`,
              photoURL: `${imageLInk}`,
              price: Gprice,
              displayName: `${realUserName}`,
              AuthorphotoURL: `${FireUser.photoURL}`,
              quantity: goodsQuan,
              platform: `${platformD}`,
              platfomName: `${platformNameD}`,
              category: `${carG}`
            })
            .then((response) => {
              if (response.data.error) {
                toast.update(id, {
                  render: `ไม่สามารถเพิ่มสินค้าได้`,
                  closeOnClick: true,
                  type: "error",
                  isLoading: false,
                  autoClose: 10000,
                });
              } else {
                toast.update(id, {
                  render: `เพิ่มสินค้าเรียบร้อยแล้ว`,
                  type: "success",
                  isLoading: false,
                  autoClose: 3000,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }
            })
            .catch((error) => {
              toast.update(id, {
                render: `ไม่สามารถเพิ่มสินค้าได้ ${error.message}`,
                closeOnClick: true,
                type: "error",
                isLoading: false,
                autoClose: 10000,
              });
            });
        })
        .catch((error: any) => {
          toast.update(id, {
            render: `ไม่สามารถอัพโหลดรูปภาพได้ ${error.message}`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        });
    }
  }

  function confirmDelete(ProductID) {
    modalDelete.onOpen();
    setGoodsID(ProductID);
  }

  function updateQuantity(ProductID, Quantity) {
    modalQuan.onOpen();
    setGoodsID(ProductID);
    setGoodsQuan(Quantity);
  }

  function deleteGoods() {
    const id = toast.loading("กำลังลบสินค้า ...");

    axios
      .delete(`${marketConfig.apiServer}good/delete`, {
        data: { email: FireUser.email, pID: goodsID },
      })
      .then((response) => {
        if (response.data.error) {
          toast.update(id, {
            render: `ไม่สามารถลบสินค้าได้`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        } else {
          toast.update(id, {
            render: `ลบสินค้าเรียบร้อยแล้ว`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        toast.update(id, {
          render: `ไม่สามารถลบสินค้าได้ ${error.message}`,
          closeOnClick: true,
          type: "error",
          isLoading: false,
          autoClose: 10000,
        });
      });
  }

  function updateQuantityGood() {
    const id = toast.loading("กำลังแก้ไขสินค้า ...");

    axios
      .patch(`${marketConfig.apiServer}good/item/quantity`, {
        email: FireUser.email,
        gID: goodsID,
        Quan: goodsQuan,
      })
      .then((response) => {
        if (response.data.error) {
          toast.update(id, {
            render: `ไม่สามารถแก้ไขสินค้าได้`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        } else {
          toast.update(id, {
            render: `แก้ไขสินค้าเรียบร้อยแล้ว`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        toast.update(id, {
          render: `ไม่สามารถแก้ไขสินค้าได้ ${error.message}`,
          closeOnClick: true,
          type: "error",
          isLoading: false,
          autoClose: 10000,
        });
      });
  }

  useEffect(() => {
    if (FireUser?.uid) {
      setPageStatus("Loading");
      setRealUserName(FireUser.displayName);
      setRealUserBio(FireUser.email);
      if (FireUser.email.includes("@hatyaiwit.ac.th")) {
        setTitle(`Yorwor Market - ${FireUser.email}`);
        axios
          .put(`${marketConfig.apiServer}user`, { uID: `${FireUser.email}` })
          .then((response) => {
            setPageStatus("Finish");
            if (response.data.message == "No such parent document") {
              setUserState("NoMember");
              setUserDetails([]);
            } else {
              setUserDetails(response.data.User);
              setRealUserName(response.data.User.displayName);
              setRealUserBio(response.data.User.bio);
              setUserState("YesMember");
            }
          })
          .catch(() => {
            setPageStatus("Error");
            setUserDetails([]);
          });
      } else {
        setUserState("NoYorwor");
        setPageStatus("Finish");
      }
    }
  }, [FireUser]);

  return (<>
    <title>{title}</title>
    <meta content={title} property="og:title" />
    <ToastContainer
      closeOnClick
      newestOnTop
      hideProgressBar={false}
      position="bottom-right"
    />
    <div className="flex flex-col items-center justify-center mt-8 mb-1">
      <h1 className="text-3xl md:text-4xl mb-2 AnakotmaiBOLD">
        ข้อมูลผู้ใช้
      </h1>
      <div className="flex">
        <div className="h-1 w-20 bg-blue-500 rounded-l-lg" />
        <div className="h-1 w-20 bg-red-500 rounded-r-lg" />
      </div>
    </div>
    <div className="flex flex-col gap-5 my-6 mx-10">
      {FireUser.uid ? (
        <>
          <Dropdown>
            <DropdownTrigger>
              <User
                avatarProps={{
                  src: FireUser.photoURL,
                  size: "lg",
                }}
                className="cursor-pointer"
                description={"คลิกเพื่อดูเมนูเพิ่มเติม"}
                name={<p className="AnakotmaiBOLD text-xl">{realUserName}</p>}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="switch"
                startContent={<MdSwitchAccount />}
                onPress={() => {
                  const id = toast.loading("กำลังสลับบัญชี ...");

                  signInWithGoogle()
                    .then(() => {
                      toast.update(id, {
                        render: `สลับบัญชีสำเร็จ`,
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1500);
                    })
                    .catch((error) => {
                      toast.update(id, {
                        render: `สลับบัญชีไม่สำเร็จ ${error.message}`,
                        closeOnClick: true,
                        type: "error",
                        isLoading: false,
                        autoClose: 10000,
                      });
                    });
                }}
              >
                สลับบัญชี
              </DropdownItem>
              <DropdownItem
                key="report"
                className="text-danger"
                color="danger"
                startContent={<MdLogout />}
                onPress={() => {
                  const id = toast.loading("กำลังออกจากระบบ ...");
                  const auth = getAuth(app);

                  signOut(auth)
                    .then(() => {
                      toast.update(id, {
                        render: `ออกจากระบบสำเร็จ`,
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                      });
                      setTimeout(() => {
                        router.push("/");
                        window.location.reload();
                      }, 1500);
                    })
                    .catch((error) => {
                      toast.update(id, {
                        render: `ไม่สามารถออกจากระบบได้ ${error.message}`,
                        closeOnClick: true,
                        type: "error",
                        isLoading: false,
                        autoClose: 10000,
                      });
                    });
                }}
              >
                ออกจากระบบ
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {pageStatus == "Loading" ? (
            <>
              <Loaders />
            </>
          ) : (
            <>
              {userState == "NoMember" ? (
                <>
                  <div className="max-w-lg mx-auto mb-5">
                    <div className="bg-white rounded-lg shadow-lg">
                      <div className="p-6">
                        <h2 className="text-2xl AnakotmaiBOLD text-gray-800 mb-2">
                          สมัครสมาชิก !
                        </h2>
                        <p className="text-gray-700 mb-4">
                          ดูเหมือนว่ายังไม่มีบัญชีที่เชื่อมกับอีเมลนี้
                          <br />
                          ** ข้อมูลหลังจากกดสมัครไปแล้วจะแก้ไขไม่ได้
                          หากต้องการแก้ไขกรุณาติดต่อผู้ดูและระบบ
                        </p>
                        <form>
                          <div className="flex flex-col gap-3 mb-4">
                            <Input
                              isRequired
                              label="ชื่อผู้ใช้"
                              placeholder="eg. John Doe"
                              type="text"
                              value={inputForm}
                              variant="bordered"
                              onChange={(e) => setInputForm(e.target.value)}
                            />
                            <Input
                              isRequired
                              isDisabled
                              label="อีเมล"
                              type="text"
                              value={FireUser.email}
                              variant="bordered"
                              onChange={(e) => setInputForm(e.target.value)}
                            />
                            <Textarea
                              isRequired
                              label="Bio"
                              placeholder="eg. about you"
                              value={inputBioForm}
                              variant="bordered"
                              onChange={(e) =>
                                setInputBioForm(e.target.value)
                              }
                            />
                            <Turnstile
                              language={"th"}
                              sitekey="0x4AAAAAAA6IXUSqb0JMvGBQ"
                              theme="light"
                              onVerify={() => {
                                setVerifyStats(true);
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Button
                              className={`${verifyStats ? "bg-blue-500" : "bg-red-500"}`}
                              color="primary"
                              startContent={<FiLogIn />}
                              onPress={createNewUser}
                            >
                              สมัครสมาชิก
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {userState == "NoYorwor" ? (
                    <>
                      <div className="max-w-lg mx-auto mt-5 flex flex-col justify-center items-center gap-4 h-72">
                        <img src={NoAcc.src} alt="AnimatedIcon" className="w-24 h-24" />
                        <div>
                          <h1 className="text-xl AnakotmaiBOLD">
                            บุคคลภายนอก @hatyaiwit.ac.th
                          </h1>
                          <h1>กรุณาใช้อีเมลโรงเรียน</h1>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="max-w-4xl w-full mx-auto mt-1 mb-6">
                        <Accordion variant="splitted" defaultExpandedKeys={["2"]}>
                          <AccordionItem
                            startContent={
                              <FaShoppingCart />
                            }
                            key="1" title="สำหรับผู้ชื้อสินค้า">
                            <div className="pb-5">
                              <div className="max-w-3xl mx-auto">
                                <div className="mb-3 mt-2 mx-auto">
                                  <h1 className="AnakotmaiBOLD">การสั่งชื้อสินค้า <Chip size="sm" color="warning" startContent={<GrTest />}>อยู่ระหว่างการทดลอง</Chip></h1>
                                </div>
                                <Table aria-label="Goods table">
                                  <TableHeader>
                                    <TableColumn>{"<:ชื่อ>"}</TableColumn>
                                    <TableColumn>{"<:ไอดี>"}</TableColumn>
                                    <TableColumn>{"<:สถานะสินค้า>"}</TableColumn>
                                    <TableColumn>{"<:รูปสินค้า>"}</TableColumn>
                                  </TableHeader>
                                  <TableBody
                                    emptyContent={"คุณยังไม่มีคำสั่งชื้อที่ดำเนินการอยู่!"}
                                  >
                                    {[]}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </AccordionItem>
                          <AccordionItem startContent={<FaShop />} key="2" title="สำหรับผู้ขาย (ร้านค้า)">
                            <div>
                              <div className="max-w-3xl mx-auto mt-1">
                                <h1 className="AnakotmaiBOLD mb-2">สถิติผู้ขาย <Chip size="sm" color="warning" startContent={<GrTest />}>อยู่ระหว่างการทดลอง</Chip></h1>
                                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                                  <div className="bg-white rounded-xl border px-7 py-6">
                                    <p className="text-base AnakotmaiBOLD mb-1 flex gap-2 items-center">
                                      <LuPackage /> จำนวนสินค้า
                                    </p>
                                    <h3 className="text-blue-600 text-3xl AnakotmaiBOLD">
                                      {Object.keys(userDetails.goods).length}
                                    </h3>
                                  </div>
                                  <div className="bg-white rounded-xl border px-7 py-6">
                                    <p className="text-base AnakotmaiBOLD mb-1 flex gap-2 items-center">
                                      <FaMoneyBill /> รายได้
                                    </p>
                                    <h3 className="text-blue-600 text-3xl AnakotmaiBOLD">
                                      0
                                    </h3>
                                  </div>
                                  <div className="bg-white rounded-xl border px-7 py-6">
                                    <p className="text-base AnakotmaiBOLD mb-1 flex gap-2 items-center">
                                      <MdSell /> ขายไปทั้งหมด
                                    </p>
                                    <h3 className="text-blue-600 text-3xl AnakotmaiBOLD">
                                      0
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="pb-5 pt-3">
                              <div className="max-w-3xl mx-auto">
                                <div className="flex items-center mb-3 mt-2 gap-2 mx-auto">
                                  <h1 className="AnakotmaiBOLD">สินค้าของคุณ</h1>
                                  <Tooltip content="เพิ่มสินค้าใหม่">
                                    <IoMdAddCircleOutline
                                      className="w-6 h-6 cursor-pointer"
                                      onClick={modalProduct.onOpen}
                                    />
                                  </Tooltip>
                                </div>
                                <Table aria-label="Goods table">
                                  <TableHeader>
                                    <TableColumn>{"<:ไอดี>"}</TableColumn>
                                    <TableColumn>{"<:ชื่อ>"}</TableColumn>
                                    <TableColumn>{"<:จำนวนสินค้า>"}</TableColumn>
                                    <TableColumn className="text-red-500 text-center">
                                      ลบ
                                    </TableColumn>
                                  </TableHeader>
                                  {userDetails.goods &&
                                    Object.keys(userDetails.goods).length > 0 ? (
                                    <TableBody>
                                      {Object.entries(userDetails.goods).map(
                                        ([id, { title, availability }], index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              <Link href={`/product?id=${id}`}>
                                                <p className="AnakotmaiBOLD cursor-pointer">
                                                  {id}
                                                </p>
                                              </Link>
                                            </TableCell>
                                            <TableCell>{title}</TableCell>
                                            <TableCell>
                                              <div className="flex items-center gap-2">
                                                {availability}{" "}
                                                <MdOutlineEdit
                                                  className="cursor-pointer"
                                                  onClick={() =>
                                                    updateQuantity(id, availability)
                                                  }
                                                />
                                              </div>
                                            </TableCell>
                                            <TableCell
                                              className="cursor-pointer flex justify-center text-red-500"
                                              onClick={() => confirmDelete(id)}
                                            >
                                              <MdDeleteForever />
                                            </TableCell>
                                          </TableRow>
                                        ),
                                      )}
                                    </TableBody>
                                  ) : (
                                    <TableBody
                                      emptyContent={"คุณยังไม่มีสินค้าที่ขายอยู่!"}
                                    >
                                      {[]}
                                    </TableBody>
                                  )}
                                </Table>
                              </div>
                            </div>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="max-w-lg mx-auto mt-5 flex flex-col justify-center items-center h-72 gap-4">
            <img src={NoLogin.src} alt="AnimatedIcon" className="w-24 h-24" />
            <div>
              <h1 className="text-xl AnakotmaiBOLD">
                คุณยังไม่ได้เข้าสู่ระบบ
              </h1>
              <h1>กรุณาเข้าสู่ระบบ</h1>
            </div>
          </div>
        </>
      )}
    </div>
    <Modal
      isOpen={modalProduct.isOpen}
      placement="top"
      onOpenChange={modalProduct.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              เพิ่มสินค้าใหม่
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="bg-white rounded-lg">
                  <div>
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        label="ชื่อสินค้า"
                        placeholder="eg. Cookie"
                        type="text"
                        value={Gtitle}
                        variant="bordered"
                        onChange={(e) => setGTitle(e.target.value)}
                      />
                      <Textarea
                        isRequired
                        label="คำอธิบายสินค้า"
                        placeholder="eg. Lorem Ipsum is simply dummy text of the printing and typesetting industry"
                        value={Gdecs}
                        variant="bordered"
                        onChange={(e) => setGDecs(e.target.value)}
                      />
                      <Select
                        label="หมวดหมู่สินค้า"
                        placeholder="กรุณาเลือก 1 หมวดหมู่"
                        variant="bordered"
                        onChange={(e) => setCarG(e.target.value)}
                      >
                        <SelectItem
                          key="อุปกรณ์การเรียน"
                        >
                          อุปกรณ์การเรียน
                        </SelectItem>
                        <SelectItem key="อาหาร">
                          อาหาร
                        </SelectItem>
                        <SelectItem key="เครื่องดื่ม">
                          เครื่องดื่ม
                        </SelectItem>
                        <SelectItem key="สินค้าแฟชั่น">
                          สินค้าแฟชั่น
                        </SelectItem>
                        {FireUser.email && /\d/.test(FireUser.email) ? (
                          <></>
                        ) : (
                          <>
                            <SelectItem key="สินค้าจาก คุณครู">
                              สินค้าจาก คุณครู
                            </SelectItem>
                          </>
                        )}
                        <SelectItem key="ของตกแต่ง">
                          ของตกแต่ง
                        </SelectItem>
                        <SelectItem key="แกดเจ็ต">
                          แกดเจ็ต
                        </SelectItem>
                        <SelectItem key="ของมือ 2">
                          ของมือ 2
                        </SelectItem>
                        <SelectItem
                          key="อื่นๆ"
                        >
                          อื่นๆ
                        </SelectItem>
                      </Select>
                      <div className="flex gap-3">
                        <Input
                          isRequired
                          label="ราคา"
                          placeholder="0"
                          type="number"
                          value={Gprice.toString()}
                          variant="bordered"
                          onChange={(e) =>
                            setGPrice(parseInt(e.target.value))
                          }
                        />
                        <Input
                          isRequired
                          label="จำนวนสินค้า"
                          placeholder="0"
                          type="number"
                          value={goodsQuan.toString()}
                          variant="bordered"
                          onChange={(e) =>
                            setGoodsQuan(parseInt(e.target.value))
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <div className="relative w-full">
                          <div className="items-center justify-center mx-auto">
                            <label
                              className="flex justify-center flex-col items-center p-3 py-5 w-full transition bg-white border-2 border-gray-300 border-solid rounded-md appearance-none cursor-pointer"
                              id="drop"
                            >
                              {file == null ? (
                                <>
                                  <FaUpload className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                </>
                              ) : (
                                <>
                                  <img
                                    alt="Preview"
                                    className="rounded-lg"
                                    src={fileUrlPrv}
                                    style={{ maxHeight: "10rem" }}
                                  />
                                </>
                              )}
                              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                <span>
                                  {file == null
                                    ? (<>อัพโหลดรูปภาพสินค้า <span className="text-red-500">*</span></>)
                                    : `${file.name}`}
                                </span>
                              </p>
                              <input
                                accept="image/png,image/jpeg"
                                className="hidden"
                                id="input"
                                name="file_upload"
                                type="file"
                                onChange={(event) => {
                                  if (event.target.files) {
                                    const selectedFile =
                                      event.target.files[0];

                                    setFile(selectedFile);
                                    setFileUrlPrv(
                                      URL.createObjectURL(
                                        event.target.files[0],
                                      ),
                                    );
                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                      setFilePrv(reader.result);
                                    };
                                    reader.readAsArrayBuffer(selectedFile);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3">
                        <Select
                          isRequired
                          label="ข้อมูลติดต่อ"
                          placeholder="กรุณาเลือกแพลตฟอร์ม"
                          variant="bordered"
                          onChange={(e) => setPlatformD(e.target.value)}
                        >
                          <SelectItem
                            key="Discord"
                            startContent={<FaDiscord />}
                          >
                            Discord
                          </SelectItem>
                          <SelectItem key="Line" startContent={<FaLine />}>
                            Line
                          </SelectItem>
                          <SelectItem key="IG" startContent={<FaInstagram />}>
                            Instargram
                          </SelectItem>
                          <SelectItem
                            key="Twitter"
                            startContent={<FaXTwitter />}
                          >
                            Twitter
                          </SelectItem>
                        </Select>
                        <Input
                          isRequired
                          label="ชื่อผู้ใช้ หรือ ลิงค์"
                          placeholder="eg. @Yorwor"
                          type="text"
                          value={platformNameD}
                          variant="bordered"
                          onChange={(e) => setPlatformNameD(e.target.value)}
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
                color="primary"
                variant="bordered"
                onPress={() => {
                  onClose;
                  submitNewGoods();
                }}
              >
                เพิ่มสินค้า
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Modal
      isOpen={modalDelete.isOpen}
      placement="top"
      onOpenChange={modalDelete.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              ยืนยันการลบสินค้า
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="bg-white rounded-lg">
                  <div>
                    <form className="flex flex-col gap-4">
                      <h1>
                        คุณแน่ใจว่าจะลบสินค้าที่มีไอดี :{" "}
                        <span className="AnakotmaiBOLD">{goodsID}</span> ?
                      </h1>
                    </form>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => deleteGoods()}
              >
                ลบ
              </Button>
              <Button color="primary" variant="bordered" onPress={onClose}>
                ยกเลิก
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Modal
      isOpen={modalQuan.isOpen}
      placement="top"
      onOpenChange={modalQuan.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              แก้ไขจำนวนสินค้า
            </ModalHeader>
            <ModalBody>
              <div>
                <div className="bg-white rounded-lg">
                  <div>
                    <form className="flex flex-col gap-4">
                      <h1>
                        แก้ไขจำนวนสินค้าของไอดี{" "}
                        <span className="AnakotmaiBOLD">{goodsID}</span>
                      </h1>
                      <Input
                        label="จำนวนสินค้า"
                        placeholder="0"
                        type="number"
                        value={goodsQuan.toString()}
                        variant="bordered"
                        onChange={(e) =>
                          setGoodsQuan(parseInt(e.target.value))
                        }
                      />
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
                color="primary"
                variant="bordered"
                onPress={() => updateQuantityGood()}
              >
                แก้ไข
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>);
}
