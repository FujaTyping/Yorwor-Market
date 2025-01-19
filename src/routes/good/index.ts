import type { ElysiaApp } from "../../app";
import { getDocs, query, collection, orderBy, where, documentId, setDoc, doc, serverTimestamp, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { generateID } from "../../lib/module";
import axios from "axios";

interface GGood {
    price: number;
    title: string;
    decs: string;
    photoURL: string;
    author: any;
    social: any;
}

let RealData: { Goods: GGood[] } = { Goods: [] };
let lastFetchTime = 0;
const fetchInterval = 2 * 60 * 1000;

export default (app: ElysiaApp) =>
    app
        .get("/", async ({ store }) => {
            const { db } = store;
            if (Date.now() - lastFetchTime > fetchInterval) {
                try {
                    const querySnapshot = await getDocs(query(collection(db, "Goods"), orderBy("timestamp", "desc")));
                    RealData.Goods = [];

                    for (const docSnap of querySnapshot.docs) {
                        const good = docSnap.data() as GGood;

                        const authorDocRef = doc(db, "Goods", docSnap.id, "Author", "Details");
                        const socialDocRef = doc(db, "Goods", docSnap.id, "Author", "Social");
                        const authorDoc = await getDoc(authorDocRef);
                        const socialDocSnap = await getDoc(socialDocRef);

                        if (authorDoc.exists()) {
                            good.author = authorDoc.data();
                        } else {
                            good.author = {};
                        }

                        if (socialDocSnap.exists()) {
                            good.social = socialDocSnap.data();
                        } else {
                            good.social = {};
                        }

                        RealData.Goods.push(good);
                    }

                    lastFetchTime = Date.now();
                } catch (error: any) {
                    return {
                        error: true,
                        message: error.message || "An error occurred while fetching data",
                    };
                }
            }
            return RealData;
        })
        .put("/bulk", async ({ body, store }) => {
            const { db } = store;
            let RealData: { Goods: GGood[] } = { Goods: [] };
            const { goodsIds } = body;

            if (!goodsIds) {
                return { error: true, message: "Missing goods ids" };
            }

            try {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "Goods"),
                        where(documentId(), "in", goodsIds),
                        orderBy("timestamp", "desc")
                    )
                );

                RealData.Goods = [];

                for (const docSnapshot of querySnapshot.docs) {
                    const good = docSnapshot.data() as GGood;

                    const authorDocRef = doc(db, "Goods", docSnapshot.id, "Author", "Details");
                    const socialDocRef = doc(db, "Goods", docSnapshot.id, "Author", "Social");
                    const authorDocSnap = await getDoc(authorDocRef);
                    const socialDocSnap = await getDoc(socialDocRef);

                    if (authorDocSnap.exists()) {
                        good.author = authorDocSnap.data();
                    } else {
                        good.author = {};
                    }

                    if (socialDocSnap.exists()) {
                        good.social = socialDocSnap.data();
                    } else {
                        good.social = {};
                    }

                    RealData.Goods.push(good);
                }

                return RealData;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }

        })
        .put("/bulk/search", async ({ body, store }) => {
            const { db } = store;
            const { searchQuery } = body;

            if (!searchQuery) {
                return { error: true, message: "Missing search query" };
            }

            try {
                const goodsQuery = query(
                    collection(db, "Goods"),
                    orderBy("timestamp", "desc")
                );
                const querySnapshot = await getDocs(goodsQuery);

                const RealData = { Goods: [] as GGood[] };

                for (const docSnapshot of querySnapshot.docs) {
                    const good = docSnapshot.data() as GGood;

                    if (good.title && good.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                        const authorDocRef = doc(db, "Goods", docSnapshot.id, "Author", "Details");
                        const authorDocSnap = await getDoc(authorDocRef);

                        good.author = authorDocSnap.exists() ? authorDocSnap.data() : {};

                        RealData.Goods.push(good);
                    }
                }

                return RealData;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching documents",
                };
            }
        })
        .put("/item", async ({ body, store }) => {
            const { db } = store;
            const { goodId } = body;

            if (!goodId) {
                return { error: true, message: "Missing goods id" };
            }

            try {
                const docRef = doc(db, "Goods", goodId);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    return { error: true, message: "Goods not found" };
                }

                const good = docSnap.data() as GGood;

                const authorDocRef = doc(db, "Goods", goodId, "Author", "Details");
                const socialDocRef = doc(db, "Goods", goodId, "Author", "Social");
                const authorDocSnap = await getDoc(authorDocRef);
                const socialDocSnap = await getDoc(socialDocRef);

                if (authorDocSnap.exists()) {
                    good.author = authorDocSnap.data();
                } else {
                    good.author = {};
                }

                if (socialDocSnap.exists()) {
                    good.social = socialDocSnap.data();
                } else {
                    good.social = {};
                }

                return good;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        })
        .post("/new", async ({ body, store }) => {
            const { db } = store;
            const { email, decs, photoURL, price, title, displayName, AuthorphotoURL, quantity, platform, platfomName } = body;

            if (!email || !decs || !photoURL || !price || !title || !displayName || !AuthorphotoURL || !quantity || !platform || !platfomName) {
                return { error: true, message: "Missing good details" };
            }

            try {
                const UID = generateID();
                const TToday = new Date();
                const TThaiDate = new Intl.DateTimeFormat("th-TH", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }).format(TToday);

                axios
                    .post(
                        `https://api.imgbb.com/1/upload`,
                        { key: "2dd550a902838594c15570cc01632214", image: photoURL },
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        },
                    )
                    .then(async (response) => {
                        const imageLInk = response.data.data.image.url;
                        await setDoc(doc(db, "Goods", UID), {
                            decs: decs,
                            title: title,
                            photoURL: imageLInk,
                            id: UID,
                            price: price,
                            addDate: `${TThaiDate}`,
                            availability: quantity,
                            timestamp: serverTimestamp(),
                        });
                        await setDoc(doc(db, "Goods", UID, "Author", "Details"), {
                            photoURL: AuthorphotoURL,
                            email: email,
                            displayName: displayName,
                        });
                        await setDoc(doc(db, "Goods", UID, "Author", "Social"), {
                            platform: platform,
                            platformName: platfomName
                        });
                        await setDoc(doc(db, "User", email, "Goods", UID), {
                            title: title,
                            availability: quantity,
                        });
                    });
                return `Successfully added good with ID ${UID}`;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        })
        .delete("/delete", async ({ body, store }) => {
            const { db } = store;
            const { pID, email } = body;

            if (!email || !pID) {
                return { error: true, message: "Missing good id or email" };
            }

            try {
                const goodDocRef = doc(db, "Goods", pID);

                const authorDocRef = doc(db, "Goods", pID, "Author", "Details");
                const authorDoc = await getDoc(authorDocRef);

                if (!authorDoc.exists()) {
                    return { error: true, message: "No author data found for this good" };
                }

                const authorData = authorDoc.data();
                if (authorData.email !== email) {
                    return { error: true, message: "Author email does not match" };
                }

                await deleteDoc(goodDocRef);

                const userGoodsDocRef = doc(db, "User", email, "Goods", pID);
                await deleteDoc(userGoodsDocRef);

                await deleteDoc(authorDocRef);

                return `Successfully removed good with ID ${pID}`;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while removing the good",
                };
            }

        })
        .patch("/item/quantity", async ({ body, store }) => {
            const { db } = store;
            const { gID, Quan, email } = body;

            if (!gID || !email) {
                return { error: true, message: "Missing quantity number!" };
            }

            const authorDocRef = doc(db, "Goods", gID, "Author", "Details");
            const authorDoc = await getDoc(authorDocRef);

            if (!authorDoc.exists()) {
                return { error: true, message: "No author data found for this good" };
            }

            const authorData = authorDoc.data();
            if (authorData.email !== email) {
                return { error: true, message: "Author email does not match" };
            }

            try {
                const goodsDocRef = doc(db, "Goods", gID);
                const uGoodsDocRef = doc(db, "User", email, "Goods", gID);

                await updateDoc(goodsDocRef, { availability: Quan });
                await updateDoc(uGoodsDocRef, { availability: Quan });
                return `Successfully update quantity of ${gID}`;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while removing the good",
                };
            }
        });
