// Função que cadastra ou atualiza um documento no Firestore.
// Recebe um `uid` para identificar o documento e um objeto `data` com os dados a serem salvos.

import { doc, getFirestore, setDoc } from "firebase/firestore";

export async function CadastroDocumento(uid: string, data: object) {
  const db = getFirestore(); // Obtém instância atual do Firestore

  // Cria ou atualiza o documento identificado pelo `uid` na coleção "profile"
  // Se o documento já existir, será sobrescrito pelos dados fornecidos em `data`
  await setDoc(doc(db, "profile", uid), data);
}
