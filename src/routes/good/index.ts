import type { ElysiaApp } from "../../app";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "../../firebase-config";
import { getDocs, query, collection, orderBy } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface GGood {
    price: number;
    title: string;
    decs: string;
    photoURL: string;
}

export default (app: ElysiaApp) =>
    app.get("/", async () => {
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
    });