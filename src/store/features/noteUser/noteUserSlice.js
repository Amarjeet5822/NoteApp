import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all the notes
export const getNotes = createAsyncThunk(
  "noteUser/getNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/notes`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to get notes!")
    }
  
  }
);
// Get all the notes using search operation
export const searchNotes = createAsyncThunk(
  "noteUser/searchNotes",
  async ({query}, { rejectWithValue }) => {
    try {
      console.log("line 27 query = ", query );
      const response = await axios.get(
        `/api/features/search?q=${query}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to get notes!")
    }
  
  }
);
// Update Note
export const updateNotes = createAsyncThunk(
  "noteUser/updateNotes",
  async ({noteId, title, content, category, priority},{ rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/notes/${noteId}`,
        { title, content, category, priority },
        { withCredentials: true, }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to update!")
    }
  }
);
// Post Note or Add new note in note list
export const addNote = createAsyncThunk(
  "noteUser/addNote",
  async ({ title, content, category, priority},{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/notes`,
        { title, content, category, priority},
        { withCredentials: true, }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed add note!")
    }
  }
);
// Delete Note
export const deleteNote = createAsyncThunk(
  "noteUser/deleteNote",
  async ( {noteId},{ rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/notes/${noteId}`,
        { withCredentials: true, }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to Delete!")
    }
  }
);

const initialState = {
  notes: [],
  loading: false,
  error : null,
  success: false,
};

const noteUserSlice = createSlice({
  name: "noteUser",
  initialState,
  reducers: { 
    resetSuccess : (state) => {
      state.success = false;
    }
   },
  extraReducers: (builder) => {
    // Get all the notes
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.notes = action.payload;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "failed gets notes!";
    });
    // update note
    builder.addCase(updateNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(updateNotes.rejected, (state, action ) => {
      state.loading = false;
      state.error = action.payload || "failed to update note!"
      state.success = false;
    });
    // Add new note
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(addNote.rejected, (state, action ) => {
      state.loading = false;
      state.error = action.payload || "failed to add note!"
      state.success = false;

    });
    // Delete builder
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.loading = false;
 
    });
    builder.addCase(searchNotes.fulfilled, (state, action) => {
      console.log("145 action.payload = ", action.payload)
      state.loading = false;
      state.notes = action.payload;
      state.error= null;
    })
  },
});
export const {resetSuccess } = noteUserSlice.actions
export default noteUserSlice.reducer;
