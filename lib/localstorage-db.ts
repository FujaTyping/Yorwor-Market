"use client";

import { useEffect, useState } from "react";
import { openDB } from "idb";

interface FireUser {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

const useLocalStorge = () => {
    const [FireUser, setFireUser] = useState<FireUser>({
        uid: "",
        email: "",
        displayName: "",
        photoURL: ""
    })

    useEffect(() => {
        async function getData() {
            const db = await openDB("firebaseLocalStorageDb");
            const store = db
                .transaction("firebaseLocalStorage")
                .objectStore("firebaseLocalStorage");
            const value = await store.getAll();
            if (value.length == 1) {
                if (value[0]?.fbase_key !== "__sak") {
                    const user = value[0]?.value;
                    if (user) {
                        setFireUser(user);
                    }
                }
            } else {
                if (value[1]?.fbase_key !== "__sak") {
                    const user = value[1]?.value;
                    if (user) {
                        setFireUser(user);
                    }
                }
            }
        }
        getData();
    }, []);

    return { FireUser };
};

export default useLocalStorge;