import type { ElysiaApp } from "../../app";
import { getDocs, collection, doc, getDoc, query, where, orderBy } from 'firebase/firestore';

interface GGood {
    price: number;
    title: string;
    decs: string;
    photoURL: string;
    author: any;
    social: any;
    category: string;
}

export default (app: ElysiaApp) =>
    app
        .put("/bulk", async ({ body, store }) => {
            const { db } = store;
            const RealData: { Goods: GGood[] } = { Goods: [] };
            const { categoryQuery } = body;

            if (!categoryQuery) {
                return { error: true, message: "Missing category query" };
            }

            try {
                const categoryFilterQuery = query(
                    collection(db, "Goods"),
                    where("category", "==", categoryQuery)
                );

                const querySnapshot = await getDocs(categoryFilterQuery);

                if (querySnapshot.empty) {
                    return RealData;
                }

                for (const docSnap of querySnapshot.docs) {
                    const good = docSnap.data() as GGood;

                    const authorDocRef = doc(db, "Goods", docSnap.id, "Author", "Details");
                    const socialDocRef = doc(db, "Goods", docSnap.id, "Author", "Social");
                    const authorDoc = await getDoc(authorDocRef);
                    const socialDocSnap = await getDoc(socialDocRef);

                    good.author = authorDoc.exists() ? authorDoc.data() : {};
                    good.social = socialDocSnap.exists() ? socialDocSnap.data() : {};

                    RealData.Goods.push(good);
                }

                return RealData;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        });
