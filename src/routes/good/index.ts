import type { ElysiaApp } from "../../app";
import { getDocs, query, collection, orderBy, where, documentId, setDoc, doc, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { generateID } from "../../lib/module";

interface GGood {
    price: number;
    title: string;
    decs: string;
    photoURL: string;
    author: any;
}

export default (app: ElysiaApp) =>
    app
        .get("/", async ({ store }) => {
            const { db } = store;
            let RealData: { Goods: GGood[] } = { Goods: [] };
            try {
                const querySnapshot = await getDocs(query(collection(db, "Goods"), orderBy("timestamp", "desc")));
                RealData.Goods = [];

                for (const docSnap of querySnapshot.docs) {
                    const good = docSnap.data() as GGood;

                    const authorDocRef = doc(db, "Goods", docSnap.id, "Author", "Details");
                    const authorDoc = await getDoc(authorDocRef);

                    if (authorDoc.exists()) {
                        good.author = authorDoc.data();
                    } else {
                        good.author = {};
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
                    const authorDocSnap = await getDoc(authorDocRef);

                    if (authorDocSnap.exists()) {
                        good.author = authorDocSnap.data();
                    } else {
                        good.author = {};
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
        .put("/item", async ({ body, store }) => {
            const { db } = store;
            let RealData: { Goods: GGood[] } = { Goods: [] };
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
                const authorDocSnap = await getDoc(authorDocRef);

                if (authorDocSnap.exists()) {
                    good.author = authorDocSnap.data();
                } else {
                    good.author = {};
                }

                RealData.Goods.push(good);

                return RealData;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        })
        .post("/new", async ({ body, store }) => {
            const { db } = store;
            const { email, decs, photoURL, price, title, displayName, AuthorphotoURL } = body;

            if (!email || !decs || !photoURL || !price || !title || !displayName || !AuthorphotoURL) {
                return { error: true, message: "Missing good details" };
            }

            try {
                const UID = generateID();
                await setDoc(doc(db, "Goods", UID), {
                    decs: decs,
                    title: title,
                    photoURL: photoURL,
                    price: price,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, "Goods", UID, "Author", "Details"), {
                    photoURL: AuthorphotoURL,
                    email: email,
                    displayName: displayName,
                });
                await setDoc(doc(db, "User", email, "Goods", UID), {
                    title: title,
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

        });
