import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* =========================
   UPLOAD MARKS
========================= */
export const uploadMarks = createAsyncThunk(
  "marks/uploadMarks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/marks/upload", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* =========================
   FETCH STUDENT REPORT
========================= */
export const fetchStudentReport = createAsyncThunk(
  "marks/fetchStudentReport",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/marks/report/${studentId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const marksSlice = createSlice({
  name: "marks",

  initialState: {
    marks: [],
    report: null,
    subjectAnalysis: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* UPLOAD MARKS */
      .addCase(uploadMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.marks.push(action.payload);
      })
      .addCase(uploadMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* REPORT */
      .addCase(fetchStudentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.report;
        state.subjectAnalysis = action.payload.subjectAnalysis;
      })
      .addCase(fetchStudentReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default marksSlice.reducer;