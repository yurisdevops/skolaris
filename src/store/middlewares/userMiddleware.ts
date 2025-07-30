// Middleware personalizado que intercepta ações relacionadas ao UID do usuário.
// Ao detectar a definição de UID (`setUid`), verifica se a instituição correspondente já existe no Firestore.
// Se não existir, cria um novo registro com dados iniciais.

import type { Middleware } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../services/firestore/firestore"; // Instância do Firestore
import { setUid } from "../userSlice"; // Ação disparada ao definir UID do usuário

const userMiddleware: Middleware =
  (_store) => (next) => async (action: any) => {
    next(action); // Garante que a ação continue o fluxo normal antes de processar logicamente

    // Verifica se a ação é de tipo `setUid`
    if (action.type === setUid.type) {
      const uid = action.payload; // Obtém o UID enviado na ação

      const escolaRef = doc(db, "escolas", uid); // Referência ao documento da escola no Firestore
      const escolaSnap = await getDoc(escolaRef); // Busca o documento no Firestore

      // Se o documento ainda não existe, cria um novo com informações iniciais
      if (!escolaSnap.exists()) {
        await setDoc(escolaRef, {
          dataCadastro: new Date(), // Data atual como data de cadastro
          status: "ativa", // Status inicial da instituição
          perfilCompleto: false, // Marca como perfil ainda não completo
        });

        console.log("Escola criada"); // Log informativo (apenas ambiente de dev)
      }
    }
  };

export default userMiddleware; // Exporta o middleware para inclusão na store
