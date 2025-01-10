"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";
import useLocalStorge from "@/lib/localstorage-db";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/lib/firebase-config";

export default function UserPage() {
    const [title] = useState("Yorwor Market");
    const router = useRouter();
    const { FireUser } = useLocalStorge();
    const app = initializeApp(firebaseConfig);

    return (
        <>
            <title>{`${title} - ${FireUser.email}`}</title>
            <ToastContainer position="bottom-right" newestOnTop closeOnClick hideProgressBar={false} />
            <div className="h-screen flex flex-col items-center justify-center gap-5">
                <div className="text-center">
                    <h1 className="text-3xl">Yorwor Market</h1>
                    <h3>Hatyaiwittayalai School</h3>
                </div>
                {FireUser.uid ? (
                    <>
                        <User
                            avatarProps={{
                                src: FireUser.photoURL, size: "lg"
                            }}
                            description={FireUser.email}
                            name={FireUser.displayName}
                        />
                        <Button color="danger" startContent={<FcGoogle />} variant="bordered"
                            onPress={() => {
                                const id = toast.loading("Loging out...")
                                const auth = getAuth(app);
                                signOut(auth)
                                    .then(() => {
                                        toast.update(id, { render: `Logout success`, type: "success", isLoading: false, autoClose: 3000 });
                                        setTimeout(() => {
                                            router.push("/");
                                            window.location.reload();
                                        }, 1500);
                                    })
                                    .catch((error) => {
                                        toast.update(id, { render: `Logout failed ${error.message}`, closeOnClick: true, type: "error", isLoading: false, autoClose: 10000 });
                                    });
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : ("No auth found")}
            </div>
        </>
    );
}
