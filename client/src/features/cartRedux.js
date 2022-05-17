import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { product: [], total: 0, quantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: { value: initialStateValue },
  reducers: {
    addProduct: (state, action) => {
      state?.value?.product.push(action.payload);
      state.value.quantity += 1;
      state.value.total += action?.payload?.price * action?.payload.quantity;
      console.log(action.payload);
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
