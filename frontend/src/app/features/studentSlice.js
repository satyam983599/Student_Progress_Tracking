import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* =========================
   FETCH STUDENTS
========================= */
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/students");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* =========================
   ADD STUDENT (OPTIONAL but useful)
========================= */
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/students/add", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const studentSlice = createSlice({
  name: "students",

  initialState: {
    students: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD STUDENT */
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      });
  },
});

export default studentSlice.reducer;