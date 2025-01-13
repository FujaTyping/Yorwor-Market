// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import { IoBagAdd } from "react-icons/io5";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { MdDeleteForever } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";

import useLocalStorge from "@/lib/localstorage-db";
import marketConfig from "@/market-config.mjs";
import firebaseConfig from "@/lib/firebase-config";
import { parse } from "path";

const IMBBAPI = process.env.NEXT_PUBLIC_imbbAPI;

export default function UserPage() {
  const [title] = useState("Yorwor Market");
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [Gprice, setGPrice] = useState(0);
  const [Gtitle, setGTitle] = useState("");
  const [Gdecs, setGDecs] = useState("");
  const [GphotoURL, setGPhotoURL] = useState("");

  function createNewUser() {
    if (!inputForm == "") {
      const id = toast.loading("Registering ...");
      axios
        .post(`${marketConfig.apiServer}user/new`, { displayNAME: `${inputForm}`, email: `${FireUser.email}`, bio: `${inputBioForm}` })
        .then((response) => {
          if (response.data.error) {
            toast.update(id, {
              render: `Register failed (fill all input)`,
              closeOnClick: true,
              type: "error",
              isLoading: false,
              autoClose: 10000,
            });
          } else {
            toast.update(id, {
              render: `Register success`,
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        })
        .catch(() => {
          toast.update(id, {
            render: `Register failed ${Error.message}`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        });
    }
  }

  function submitNewGoods() {
    const id = toast.loading("Adding new product ...");
    if (!Gtitle || !Gdecs || !Gprice) {
      toast.update(id, {
        render: `Please fill all the input`,
        closeOnClick: true,
        type: "error",
        isLoading: false,
        autoClose: 10000,
      });
    } else {
      axios
        .post(`https://api.imgbb.com/1/upload`, { key: IMBBAPI, image: filePrv }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
        .then((response) => {
          const imageLInk = response.data.data.image.url;
          axios
            .post(`${marketConfig.apiServer}good/new`, { email: `${FireUser.email}`, title: `${Gtitle}`, decs: `${Gdecs}`, photoURL: `${imageLInk}`, price: Gprice, displayName: `${realUserName}`, AuthorphotoURL: `${FireUser.photoURL}` })
            .then((response) => {
              if (response.data.error) {
                toast.update(id, {
                  render: `Failed to add product (Fill all the input)`,
                  closeOnClick: true,
                  type: "error",
                  isLoading: false,
                  autoClose: 10000,
                });
              } else {
                toast.update(id, {
                  render: `Succssfully add product`,
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
                render: `Failed to add product ${error.message}`,
                closeOnClick: true,
                type: "error",
                isLoading: false,
                autoClose: 10000,
              });
            });
        })
        .catch((error: any) => {
          toast.update(id, {
            render: `Failed to upload image ${error.message}`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        });
    }
  }

  function deleteGoods(ProductID) {
    const id = toast.loading("Removing product ...");
    axios
      .delete(`${marketConfig.apiServer}good/delete`, {
        data: { email: FireUser.email, pID: ProductID }
      })
      .then((response) => {
        if (response.data.error) {
          toast.update(id, {
            render: `Failed to remove the product`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        } else {
          toast.update(id, {
            render: `Successfully removed product`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.update(id, {
          render: `Failed to remove product ${error.message}`,
          closeOnClick: true,
          type: "error",
          isLoading: false,
          autoClose: 10000,
        });
      });
  }

  useEffect(() => {
    if (FireUser?.uid) {
      setRealUserName(FireUser.displayName)
      setRealUserBio(FireUser.email);
      axios
        .put(`${marketConfig.apiServer}user`, { uID: `${FireUser.email}` })
        .then((response) => {
          if (response.data.message == "No such parent document") {
            setUserState("NoMember");
            setUserDetails([]);
          } else {
            setUserDetails(response.data.User);
            setRealUserName(response.data.User.displayName);
            setRealUserBio(response.data.User.bio)
            setUserState("YesMember");
          }
        })
        .catch(() => {
          setUserDetails([]);
        });
    }
  }, [FireUser]);

  return (
    <>
      <title>{`${title} - ${FireUser.email}`}</title>
      <ToastContainer
        closeOnClick
        newestOnTop
        hideProgressBar={false}
        position="bottom-right"
      />
      <div className="flex flex-col items-center justify-center gap-5 m-10">
        <div className="text-center">
          <h1 className="text-3xl">Yorwor Market</h1>
          <h3>Hatyaiwittayalai School</h3>
        </div>
        {FireUser.uid ? (
          <>
            <User
              avatarProps={{
                src: FireUser.photoURL,
                size: "lg",
              }}
              description={realUserBio}
              name={realUserName}
            />
            <div className="flex flex-row gap-5">
              <Button
                color="danger"
                startContent={<FcGoogle />}
                variant="bordered"
                onPress={() => {
                  const id = toast.loading("Loging out...");
                  const auth = getAuth(app);

                  signOut(auth)
                    .then(() => {
                      toast.update(id, {
                        render: `Logout success`,
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
                        render: `Logout failed ${error.message}`,
                        closeOnClick: true,
                        type: "error",
                        isLoading: false,
                        autoClose: 10000,
                      });
                    });
                }}
              >
                Logout
              </Button>
              <Link href={`/`}>
                <Button
                  style={{ backgroundColor: "white" }}
                  variant="bordered"
                >
                  Back to home
                </Button>
              </Link>
            </div>
            {userState == "NoMember" ? (
              <>
                <div>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Register !</h2>
                      <p className="text-gray-700 mb-4">Look like you dont have account link with this email</p>
                      <form>
                        <div className="flex flex-col gap-3 mb-4">
                          <Input value={inputForm} onChange={(e) => setInputForm(e.target.value)} variant="bordered" label="Display Name" placeholder="eg. John Doe" type="text" />
                          <Input value={FireUser.email} isDisabled onChange={(e) => setInputForm(e.target.value)} variant="bordered" label="Email" type="text" />
                          <Textarea value={inputBioForm} onChange={(e) => setInputBioForm(e.target.value)} variant="bordered" label="Bio" placeholder="eg. about you" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Button
                            style={{ backgroundColor: "white" }}
                            variant="bordered"
                            startContent={<FiLogIn />}
                            onPress={createNewUser}
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="overflow-hidden">
                  <div className="flex items-center mb-3 mt-5 gap-2">
                    <h1>Your product</h1>
                    <Button
                      isIconOnly
                      style={{ backgroundColor: "white" }}
                      variant="bordered"
                      onPress={onOpen}
                    >
                      <IoBagAdd />
                    </Button>
                  </div>
                  <table className="w-full text-sm leading-5 border border-gray-300 shadow-sm rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">{"<:id>"}</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">{"<:name>"}</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600 text-red-500">{"Delete items"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails.goods && Object.keys(userDetails.goods).length > 0 ? (
                        Object.entries(userDetails.goods).map(([id, name], index) => (
                          <tr key={index} className="bg-gray-50">
                            <td className="py-3 px-4 text-left font-medium text-gray-600">{id}</td>
                            <td className="py-3 px-4 text-left">{name}</td>
                            <td onClick={() => deleteGoods(id)} className="py-3 px-4 text-center text-red-500 cursor-pointer"><MdDeleteForever /></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="py-3 px-4 text-center">No goods available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-center text-xl -mb-2">No auth found</h1>
            <Link href={`/`}>
              <Button
                style={{ backgroundColor: "white" }}
                variant="bordered"
              >
                Back to home
              </Button>
            </Link>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add new product</ModalHeader>
              <ModalBody>
                <div>
                  <div className="bg-white rounded-lg">
                    <div>
                      <form className="flex flex-col gap-4">
                        <Input value={Gtitle} onChange={(e) => setGTitle(e.target.value)} variant="bordered" label="Title" placeholder="eg. Cookie" type="text" />
                        <Textarea value={Gdecs} onChange={(e) => setGDecs(e.target.value)} variant="bordered" label="Decs" placeholder="eg. Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
                        <Input value={Gprice.toString()} onChange={(e) => setGPrice(parseInt(e.target.value))} variant="bordered" label="Price" placeholder="0" type="number" />
                        <div className="flex items-center">
                          <div className="relative w-full">
                            <div className="items-center justify-center mx-auto">
                              <label className="flex justify-center flex-col items-center p-3 py-5 w-full transition bg-white border-2 border-gray-300 border-solid rounded-md appearance-none cursor-pointer" id="drop">
                                {file == null ? (
                                  <>
                                    <FaUpload className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                  </>
                                ) : (<>
                                  <img style={{ maxHeight: '10rem' }} className="rounded-lg" src={fileUrlPrv} alt="Preview" />
                                </>)}
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                  <span>{file == null ? ("Upload good thumnails") : (`${file.name}`)}</span>
                                </p>
                                <input type="file" name="file_upload" className="hidden" accept="image/png,image/jpeg" id="input"
                                  onChange={(event) => {
                                    if (event.target.files) {
                                      const selectedFile = event.target.files[0];
                                      setFile(selectedFile);
                                      setFileUrlPrv(URL.createObjectURL(event.target.files[0]));
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
                      </form>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button variant="bordered" color="primary" onPress={() => { onClose; submitNewGoods() }}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
