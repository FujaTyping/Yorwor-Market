import type { ElysiaApp } from "../../app";
import { getDocs, query, collection, orderBy, where, documentId } from 'firebase/firestore';

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
                return { error: true, message: "Missing goods id" };
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
        });