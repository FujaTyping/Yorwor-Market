// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link'
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
import { signInWithGoogle } from "../../lib/firebase-auth";
import { Tooltip } from "@nextui-org/tooltip";

import useLocalStorge from "@/lib/localstorage-db";
import marketConfig from "@/market-config.mjs";
import firebaseConfig from "@/lib/firebase-config";
import { parse } from "path";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";

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
  const [pageStatus, setPageStatus] = useState("Loading");
  const [deleteGoodsID, setDeleteGoodsID] = useState("");

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
        .post(`https://api.imgbb.com/1/upload`, { key: "2dd550a902838594c15570cc01632214", image: filePrv }, {
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

  function confirmDelete(ProductID) {
    modalDelete.onOpen();
    setDeleteGoodsID(ProductID);
  }

  function deleteGoods() {
    const id = toast.loading("Removing product ...");
    axios
      .delete(`${marketConfig.apiServer}good/delete`, {
        data: { email: FireUser.email, pID: deleteGoodsID }
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
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
              setRealUserBio(response.data.User.bio)
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

  return (
    <>
      <title>{title}</title>
      <ToastContainer
        closeOnClick
        newestOnTop
        hideProgressBar={false}
        position="bottom-right"
      />
      <div className="flex flex-col gap-5 m-10">
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
            <div className="flex flex-row items-center justify-center gap-5">
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
              <Button
                style={{ backgroundColor: "white" }}
                variant="bordered"
              >
                <Link href="/">Back to home</Link>
              </Button>
            </div>
            {pageStatus == "Loading" ? (
              <>
                <div className="flex items-center justify-center gap-4 mt-5">
                  <Spinner color="default" />
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl">Loading user details</h1>
                    <p>This may take a few second</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {userState == "NoMember" ? (
                  <>
                    <div className="max-w-lg mx-auto">
                      <div className="bg-white rounded-lg shadow-lg">
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
                    {userState == "NoYorwor" ? (
                      <>
                        <div className="max-w-lg mx-auto mt-5 flex flex-col justify-center gap-4">
                          <div>
                            <h1 className="text-xl">Outside @hatyaiwit.ac.th</h1>
                            <h1>Please use an school or work email</h1>
                          </div>
                          <Button
                            startContent={<FcGoogle />}
                            style={{ backgroundColor: "white" }}
                            variant="bordered"
                            onPress={() => {
                              const id = toast.loading("Swaping account...");

                              signInWithGoogle()
                                .then(() => {
                                  toast.update(id, {
                                    render: `Login success`,
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
                                    render: `Login failed ${error.message}`,
                                    closeOnClick: true,
                                    type: "error",
                                    isLoading: false,
                                    autoClose: 10000,
                                  });
                                });
                            }}
                          >
                            Swap account
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="max-w-lg mx-auto">
                            <div className="flex items-center mb-3 mt-5 gap-2 mx-auto">
                              <h1>Your product</h1>
                              <Tooltip content="Add new product">
                                <Button
                                  isIconOnly
                                  style={{ backgroundColor: "white" }}
                                  variant="bordered"
                                  onPress={modalProduct.onOpen}
                                >
                                  <IoBagAdd />
                                </Button>
                              </Tooltip>
                            </div>
                            <Table aria-label="Goods table">
                              <TableHeader>
                                <TableColumn>{"<:id>"}</TableColumn>
                                <TableColumn>{"<:name>"}</TableColumn>
                                <TableColumn className="text-red-500 text-center">Delete</TableColumn>
                              </TableHeader>
                              {userDetails.goods && Object.keys(userDetails.goods).length > 0 ? (
                                <TableBody>
                                  {Object.entries(userDetails.goods).map(([id, name], index) => (
                                    <TableRow key={index}>
                                      <TableCell>{id}</TableCell>
                                      <TableCell>{name}</TableCell>
                                      <TableCell
                                        className="cursor-pointer flex justify-center text-red-500"
                                        onClick={() => confirmDelete(id)}
                                      >
                                        <MdDeleteForever />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              ) : (
                                <TableBody emptyContent={"No product for this user!"}>{[]}</TableBody>
                              )}
                            </Table>
                          </div>
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
            <div className="max-w-lg mx-auto mt-5 flex flex-col justify-center gap-4">
              <div>
                <h1 className="text-xl">No auth found</h1>
                <h1>Please login</h1>
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  startContent={<FcGoogle />}
                  style={{ backgroundColor: "white" }}
                  variant="bordered"
                  onPress={() => {
                    const id = toast.loading("Loging in...");

                    signInWithGoogle()
                      .then(() => {
                        toast.update(id, {
                          render: `Login success`,
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
                          render: `Login failed ${error.message}`,
                          closeOnClick: true,
                          type: "error",
                          isLoading: false,
                          autoClose: 10000,
                        });
                      });
                  }}
                >
                  Login
                </Button>
                <Link href="/">
                  <Button
                    style={{ backgroundColor: "white" }}
                    variant="bordered"
                  >
                    Back to home
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={modalProduct.isOpen} onOpenChange={modalProduct.onOpenChange} placement="top">
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
      <Modal isOpen={modalDelete.isOpen} onOpenChange={modalDelete.onOpenChange} placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm delete</ModalHeader>
              <ModalBody>
                <div>
                  <div className="bg-white rounded-lg">
                    <div>
                      <form className="flex flex-col gap-4">
                        <h1>Are you sure to delete items with this id : <b>{deleteGoodsID}</b> ?</h1>
                      </form>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => deleteGoods()}>
                  Yes
                </Button>
                <Button variant="bordered" color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
