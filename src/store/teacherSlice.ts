import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import auth from "../services/auth/auth";
import db from "../services/firestore/firestore";

type Teacher = {
  id: string;
  nome: string;
  disciplinas: string[];
  email: string;
  status: string;
};

interface TeacherState {
  loading: boolean; // Indica se há operação assíncrona em andamento.
  success: boolean; // Indica se a última operação foi concluída com sucesso.
  error: string | null; // Armazena mensagens de erro, se houver.
  teachersList: Teacher[]; // Lista de professores
}

export const getAllTeachers = createAsyncThunk<Teacher[] | undefined>(
  "teacher/getAll",
  async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const uid = user.uid;
    const colRef = collection(db, "escolas", uid, "professores");
    const snapshot = await getDocs(colRef);
    const teachers: Teacher[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nome: data.fullName,
        disciplinas: data.subjects || [],
        email: data.email,
        status: data.status ?? "ativo",
      };
    });

    return teachers;
  }
);

export const updateStatusTeacher = createAsyncThunk<
  Teacher | undefined,
  { id: string; status: string }
>("teacher/updateStatus", async ({ id, status }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const uid = user.uid;
  const docRef = doc(db, "escolas", uid, "professores", id);

  await updateDoc(docRef, { status });

  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  if (!data) return;

  return {
    id: docSnap.id,
    nome: data.fullName,
    disciplinas: data.subjects || [],
    email: data.email,
    status: data.status ?? "ativo",
  };
});

const initialState: TeacherState = {
  loading: false,
  success: false,
  error: null,
  teachersList: [],
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateStatusTeacher.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        getAllTeachers.fulfilled,
        (state, action: PayloadAction<Teacher[] | undefined>) => {
          state.loading = false;
          state.success = true;
          state.teachersList = action.payload ?? [];
        }
      )
      .addCase(updateStatusTeacher.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.teachersList.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.teachersList[index] = updated;
        }
      })

      .addCase(getAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || "Erro desconhecido";
      })
      .addCase(updateStatusTeacher.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message || "Erro desconhecido";
      });
  },
});

export default teacherSlice.reducer;
