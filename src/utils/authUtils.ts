// Importa métodos de autenticação do Firebase
import {
  createUserWithEmailAndPassword, // Cria novo usuário
  getAuth, // Retorna instância atual da autenticação
  signInWithEmailAndPassword, // Autentica usuário com e-mail e senha
} from "firebase/auth";

// Verifica se existe um usuário logado atualmente
export function Autenticado(): boolean {
  const user = getAuth().currentUser; // Obtém o usuário atual da autenticação
  return !!user; // Retorna true se o usuário existir, false se não
}

// Retorna uma Promise com os dados do usuário autenticado (se houver)
// Utiliza listener `onAuthStateChanged` que escuta atualizações de autenticação
export function UsuarioAutenticado(): Promise<{
  email: string | null;
  uid: string;
  displayName: string | null;
} | null> {
  return new Promise((resolve) => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(
        user
          ? {
              email: user.email, // E-mail do usuário
              uid: user.uid, // UID do Firebase
              displayName: user.displayName, // Nome público (se disponível)
            }
          : null // Retorna null se não estiver logado
      );
      unsubscribe(); // Cancela o listener após capturar o valor
    });
  });
}

// Cria um novo usuário com e-mail e senha
// Retorna o e-mail e UID do usuário criado
export async function Registro(
  email: string,
  password: string
): Promise<{ email: string | null; uid: string }> {
  const userCredential = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  const user = userCredential.user;

  return {
    uid: user.uid, // UID único do usuário
    email: user.email, // E-mail cadastrado
  };
}

// Autentica usuário usando e-mail e senha
// Retorna dados como UID, e-mail e nome público (displayName)
export async function Login(
  email: string,
  password: string
): Promise<{
  email: string | null;
  uid: string;
  displayName?: string | null;
}> {
  const userCredential = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password
  );
  const user = userCredential.user;

  return {
    email: user.email, // E-mail do usuário
    uid: user.uid, // UID gerado pelo Firebase
    displayName: user.displayName, // Nome de exibição
  };
}

// Faz logout do usuário atual
// Retorna true se o logout foi concluído com sucesso
export async function Logout() {
  const auth = getAuth();
  await auth.signOut();
  return auth.currentUser === null; // Confirma se não há usuário logado após o logout
}
