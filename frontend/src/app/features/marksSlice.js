import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/*
=================================
FETCH STUDENT REPORT
=================================
*/

export const fetchStudentReport = createAsyncThunk(
  "marks/fetchStudentReport",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/marks/report/${studentId}`
      );

      return res.data.report;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message
      );
    }
  }
);

/*
=================================
SAVE MARKS
=================================
*/

export const saveMarks = createAsyncThunk(
  "marks/saveMarks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/marks/upload",
        data
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message
      );
    }
  }
);

const marksSlice = createSlice({
  name: "marks",

  initialState: {
    report: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearMarksState: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      ============================
      FETCH REPORT
      ============================
      */

      .addCase(
        fetchStudentReport.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchStudentReport.fulfilled,
        (state, action) => {
          state.loading = false;
          state.report = action.payload;
        }
      )

      .addCase(
        fetchStudentReport.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      /*
      ============================
      SAVE MARKS
      ============================
      */

      .addCase(saveMarks.pending, (state) => {
        state.loading = true;
      })

      .addCase(saveMarks.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(
        saveMarks.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearMarksState } =
  marksSlice.actions;

export default marksSlice.reducer;