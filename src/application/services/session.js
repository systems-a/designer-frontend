import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "."

const entity = 'session'

const endpoints = {
  show: entity,
  create: entity,
  destroy: entity,
}

const initialState  = {
  active: false,
  admin: false,
  superuser: false,
  user: null,

  showSuccessMessage: null,
  showError: null,
  showLoading: false,

  createSuccessMessage: null,
  createError: null,
  createLoading: false,

  destroySuccessMessage: null,
  destroyError: null,
  destroyLoading: false,
};

export const create = createAsyncThunk(
  `${entity}/create`,
  async (data, thunkAPI) => {
    try {
      const response = await api.post(endpoints.create, data);

      if (response.status == 200) {
        return { success: true, data: response.data }
      } else {
        return thunkAPI.rejectWithValue({ success: false, message: "An unknown error occured" })
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ success: false, message: error.response?.data?.message || error.message })
    }
  }
)

export const show = createAsyncThunk(
  `${entity}/show`,
  async (_, thunkAPI) => {
    try {
      const response = await api.get(endpoints.show);

      if (response.status == 200) {
        return { success: true, data: response.data }
      } else {
        return thunkAPI.rejectWithValue({ success: false, message: "An unknown error occured"})
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ success: false, message: error.response?.data?.message || error.message })
    }
  }
)

export const destroy = createAsyncThunk(
  `${entity}/destroy`,
  async (_, thunkAPI) => {
    try {
      const response = await api.delete(endpoints.destroy);

      if (response.status == 200) {
        return { success: true, data: response.data }
      } else {
        return thunkAPI.rejectWithValue({ success: false, message: "An unknown error occured"})
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ success: false, message: error.response?.data?.message || error.message })
    }
  }
)

const sessionSlice = createSlice({
  name: entity,
  initialState,
  reducers: {
    set: (state, action) => {
      state.active = action.payload.data.active;
      state.superuser = action.payload.data.superuser;
      state.admin = action.payload.data.admin;
      state.user = action.payload.data.user;
    },
    reset: (state) => {
      state.active = initialState.active;
      state.superuser = initialState.superuser;
      state.admin = initialState.admin;
      state.user = initialState.user;

      state.createSuccessMessage = initialState.createSuccessMessage;
      state.createError = initialState.createError;
      state.createLoading = initialState.createLoading;

      state.showSuccessMessage = initialState.showSuccessMessage;
      state.showError = initialState.showError;
      state.showLoading = initialState.showLoading;

      state.destroySuccessMessage = initialState.destroySuccessMessage;
      state.destroyError = initialState.destroyError;
      state.destroyLoading = initialState.destroyLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(create.pending, (state) => {
      state.createSuccessMessage = null;
      state.createError = null;
      state.createLoading = true;
    })

    builder.addCase(create.fulfilled, (state, action) => {
      state.createSuccessMessage = action.payload.data.message;
      state.createError = null;
      state.createLoading = false;
    })

    builder.addCase(create.rejected, (state, action) => {
      state.active = false;

      state.createSuccessMessage = null;
      state.createLoading = false;
      state.createError = action.payload.message;
    })

    builder.addCase(show.pending, (state) => {
      state.showSuccessMessage = null;
      state.showError = null;
      state.showLoading = true;
    })

    builder.addCase(show.fulfilled, (state, action) => {
      state.showSuccessMessage = action.payload.data.message;
      state.showLoading = false;
      state.showError = null;
    })

    builder.addCase(show.rejected, (state, action) => {
      state.showSuccessMessage = null;
      state.showLoading = false;
      state.showError = action.payload.message;
    })

    builder.addCase(destroy.pending, (state) => {
      state.destroySuccessMessage = null;
      state.destroyError = null;
      state.destroyLoading = true;
    })

    builder.addCase(destroy.fulfilled, (state, action) => {
      state.destroySuccessMessage = action.payload.data.message;
      state.destroyLoading = false;
      state.destroyError = null;
    })

    builder.addCase(destroy.rejected, (state, action) => {
      state.destroySuccessMessage = null;
      state.destroyLoading = false;
      state.destroyError = action.payload.message;
    })
  }
})

export const { reset, set } = sessionSlice.actions;
export default sessionSlice;
