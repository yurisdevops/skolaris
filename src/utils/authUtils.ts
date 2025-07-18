import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function Autenticado(): boolean {
  const user = getAuth().currentUser;
  return !!user;
}

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
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
            }
          : null
      );
      unsubscribe();
    });
  });
}

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
    uid: user.uid,
    email: user.email,
  };
}

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
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
  };
}

export async function Logout() {
  const auth = getAuth();
  await auth.signOut();
  return auth.currentUser === null;
}
