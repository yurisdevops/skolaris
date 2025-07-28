import type { Middleware } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../services/firestore/firestore";
import { setUid } from "../userSlice";

const userMiddleware: Middleware =
  (_store) => (next) => async (action: any) => {
    next(action);

    if (action.type === setUid.type) {
      const uid = action.payload;
      const escolaRef = doc(db, "escolas", uid);
      const escolaSnap = await getDoc(escolaRef);

      if (!escolaSnap.exists()) {
        await setDoc(escolaRef, {
          dataCadastro: new Date(),
          status: "ativa",
          perfilCompleto: false,
        });
        console.log("Escola criada");
      }
    }
  };

export default userMiddleware;
