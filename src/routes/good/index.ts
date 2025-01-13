import type { ElysiaApp } from "../../app";
import { getDocs, query, collection, orderBy, where, documentId, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { generateID } from "../../lib/module";

interface GGood {
    price: number;
    title: string;
    decs: string;
    photoURL: string;
}

export default (app: ElysiaApp) =>
    app
        .get("/", async ({ store }) => {
            const { db } = store;
            let RealData: { Goods: GGood[] } = { Goods: [] };
            try {
                const querySnapshot = await getDocs(query(collection(db, "Goods"), orderBy("timestamp", "desc")));
                RealData.Goods = [];
                querySnapshot.forEach((doc) => {
                    const good = doc.data() as GGood;
                    RealData.Goods.push(good);
                });
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
                querySnapshot.forEach((doc) => {
                    const good = doc.data() as GGood;
                    RealData.Goods.push(good);
                });
                return RealData;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        })
        .post("/new", async ({ body, store, error }) => {
            const { db } = store;
            const { email, decs, photoURL, price, title } = body;
            const { displayName, AuthorphotoURL } = body.author;

            if (!email || !decs || !photoURL || !price || !title) {
                return error(401, { error: true, message: "Missing good details" });
            }

            try {
                const UID = generateID();
                await setDoc(doc(db, "Goods", `${UID}`), {
                    decs: `${decs}`,
                    title: `${title}`,
                    photoURL: `${photoURL}`,
                    price: price,
                    timestamp: serverTimestamp(),
                });
                await setDoc(doc(db, "Goods", `${UID}`,"Author"), {
                    photoURL: `${AuthorphotoURL}`,
                    email: `${email}`,
                    displayName:`${displayName}`
                });
                await setDoc(doc(db, "User", `${email}`, "Goods", `${UID}`), { title: `${title}`});

                return `Successfully add good with id ${UID}`;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        });
