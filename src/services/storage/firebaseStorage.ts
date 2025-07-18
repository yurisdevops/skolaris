import { getStorage } from "firebase/storage";
import { app } from "../connection/firebaseConfig";

const storage = getStorage(app);

export default storage;
