import { CadastroDocumento } from "../../utils/firestoreUtil";
import { doc, setDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => "mockDB"),
  doc: jest.fn((_, colletion, uid) => `mockDoc(${colletion}/${uid})`),
  setDoc: jest.fn().mockResolvedValue(undefined),
}));

describe("Verificar o cadastro de um novo documento", () => {
  it("deve criar um documento com dados válidos", async () => {
    const uid = "123456";
    const dados = { nome: "teste", modalidade: "ead" };

    await CadastroDocumento(uid, dados);

    expect(doc).toHaveBeenCalledWith("mockDB", "profile", uid);
    expect(setDoc).toHaveBeenCalledWith("mockDoc(profile/123456)", dados);
  });
});
