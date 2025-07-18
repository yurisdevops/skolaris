import { getAuth } from "firebase/auth";
import { app } from "../connection/firebaseConfig";

const auth = getAuth(app);

export default auth;
