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

import useLocalStorge from "@/lib/localstorage-db";
import marketConfig from "@/market-config.mjs";
import firebaseConfig from "@/lib/firebase-config";

export default function UserPage() {
  const [title] = useState("Yorwor Market");
  const router = useRouter();
  const { FireUser } = useLocalStorge();
  const app = initializeApp(firebaseConfig);
  const [userDetails, setUserDetails] = useState([]);
  const [userState, setUserState] = useState("NoMember");
  const [inputForm, setInputForm] = useState("");
  const [realUserName, setRealUserName] = useState("");

  function createNewUser() {
    if (!inputForm == "") {
      const id = toast.loading("Registering ...");
      axios
        .post(`${marketConfig.apiServer}user/new`, { displayNAME: `${inputForm}`, email: `${FireUser.email}` })
        .then((response) => {
          toast.update(id, {
            render: `Register success`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch(() => {
          toast.update(id, {
            render: `Register failed ${error.message}`,
            closeOnClick: true,
            type: "error",
            isLoading: false,
            autoClose: 10000,
          });
        });
    }
  }

  useEffect(() => {
    if (FireUser?.uid) {
      setRealUserName(FireUser.displayName)
      axios
        .put(`${marketConfig.apiServer}user`, { uID: `${FireUser.email}` })
        .then((response) => {
          if (response.data.message == "No such parent document") {
            setUserState("NoMember");
            setUserDetails([]);
          } else {
            setUserDetails(response.data.User);
            setRealUserName(response.data.User.displayName);
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
              description={FireUser.email}
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
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Reg !</h2>
                      <p className="text-gray-700 mb-4">Look like you dont have account</p>
                      <form>
                        <div className="mb-6">
                          <label htmlFor="displayName" className="block text-gray-700 font-bold mb-2">
                            Display Name
                          </label>
                          <input
                            id="displayName"
                            value={inputForm}
                            onChange={(e) => setInputForm(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="eg. John Doe"
                          />
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
                  <h1 className="mt-5 text-left pb-3">Your product</h1>
                  <table className="w-full text-sm leading-5 border border-gray-300 shadow-sm rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">ID</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-600">{"<:id>"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails.goods?.map((list, index) => (
                        <>
                          <tr key={index} className="bg-gray-50">
                            <td className="py-3 px-4 text-left font-medium text-gray-600">ID</td>
                            <td className="py-3 px-4 text-left">{list}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : (
          "No auth found"
        )}
      </div>
    </>
  );
}
