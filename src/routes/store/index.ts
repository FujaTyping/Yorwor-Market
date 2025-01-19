import type { ElysiaApp } from "../../app";
import { getDocs, collection, doc, getDoc, Firestore } from 'firebase/firestore';

export default (app: ElysiaApp) =>
    app
        .put("/user", async ({ body, store }) => {
            const { db } = store as { db: Firestore };
            const RealData: { User: any } = { User: {} };
            const { uID } = body;

            if (!uID) {
                return { error: true, message: "Missing store details" };
            }

            try {
                const parentDocRef = doc(db, "User", `${uID}`);
                const parentDocSnap = await getDoc(parentDocRef);

                if (!parentDocSnap.exists()) {
                    return { error: true, message: "No such parent document" };
                }

                const parentData = parentDocSnap.data() || {};

                const subcollectionRef = collection(db, "User", `${uID}`, "Goods");
                const subcollectionSnap = await getDocs(subcollectionRef);

                const goodsData: string[] = [];
                subcollectionSnap.forEach((doc) => {
                    goodsData.push(doc.id);
                });

                const combinedData = {
                    ...parentData,
                    goods: goodsData,
                };

                RealData.User = combinedData;
                return RealData;
            } catch (error: any) {
                return {
                    error: true,
                    message: error.message || "An error occurred while fetching data",
                };
            }
        });
