import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  booking: null,
  totalRevenue: 0, // Total des revenus des réservations confirmées
  totalConfirmedBookings: 0, // Nombre total de réservations confirmées
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Créer une réservation
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkApi) => {
    try {
      const res = await fetch(`/api/bookings`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Récupérer toutes les réservations
export const getBookings = createAsyncThunk(
  "booking/getbookings",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Supprimer une réservation
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Confirmer une réservation
export const confirmBooking = createAsyncThunk(
  "booking/confirm",
  async (bookingId, thunkApi) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({ confirmed: true }),
      });
      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);

      // Déclencher la récupération des revenus après confirmation
      thunkApi.dispatch(getTotalRevenue());

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Récupérer le revenu total
export const getTotalRevenue = createAsyncThunk(
  "booking/getTotalRevenue",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/revenue/total-revenue", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkApi.getState().auth.user.token}`, // Inclure le token si nécessaire
        },
      });
      const data = await res.json();
      if (!res.ok) return thunkApi.rejectWithValue(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Slice de réservation
export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Créer une réservation
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Récupérer les réservations
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Supprimer une réservation
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload.id
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Confirmer une réservation
      .addCase(confirmBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        );
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Récupérer le revenu total
      .addCase(getTotalRevenue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalRevenue = action.payload.totalRevenue;
        state.totalConfirmedBookings = action.payload.totalBookings;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
