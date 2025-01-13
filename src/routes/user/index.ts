import { doc, getDoc, collection, getDocs, Firestore, setDoc } from 'firebase/firestore';
import type { ElysiaApp } from "../../app";

export default (app: ElysiaApp) =>
    app
        .put("/", async ({ body, store }) => {
            const { db } = store as { db: Firestore };
            const RealData: { User: any } = { User: {} };
            const { uID } = body;

            if (!uID) {
                return { error: true, message: "Missing user id" };
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
        })
        .post("/new", async ({ body, store }) => {
            const { db } = store as { db: Firestore };
            const { displayNAME, email,bio } = body;

            if (!displayNAME || !email || !bio) {
                return { error: true, message: "Missing email" };
            }

            const parentDocRef = doc(db, "User", `${email}`);
            const parentDocSnap = await getDoc(parentDocRef);

            if (!parentDocSnap.exists()) {
                try {
                    await setDoc(doc(db, "User", `${email}`), {
                        displayName: `${displayNAME}`,
                        bio:`${bio}`
                    });

                    return `Success create account for ${email}`;
                } catch (error: any) {
                    return {
                        error: true,
                        message: error.message || "An error occurred while fetching data",
                    };
                }
            } else {
                return "You already have an account"
            }
        });
