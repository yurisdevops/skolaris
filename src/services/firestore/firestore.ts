import { getFirestore } from "firebase/firestore";
import { app } from "../connection/firebaseConfig";

const db = getFirestore(app);

export default db;
