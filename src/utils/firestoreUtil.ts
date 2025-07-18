import { doc, setDoc, getFirestore } from "firebase/firestore";

export async function CadastroDocumento(uid: string, data: object) {
  const db = getFirestore();
  await setDoc(doc(db, "profile", uid), data);
}
