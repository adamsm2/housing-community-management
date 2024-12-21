import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store.ts";

interface ApartmentsState {
  apartments: Apartment[];
}

export const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: {} as ApartmentsState,
  reducers: {
    setApartments: (state, action: PayloadAction<ApartmentsState>) => {
      state.apartments = action.payload.apartments;
    },
    updateApartmentOwner: (state, action: PayloadAction<{ roomNumber: number, newOwnerEmail: string }>) => {
      state.apartments = state.apartments.map((apartment) =>
        apartment.number === action.payload.roomNumber
          ? { ...apartment, ownerEmail: action.payload.newOwnerEmail }
          : apartment,
      );
    },
  },
});

export const { setApartments, updateApartmentOwner } = apartmentsSlice.actions;
export const selectApartments = (state: RootState) => state.apartments;
export default apartmentsSlice.reducer;