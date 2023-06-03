import { createSlice } from "@reduxjs/toolkit";

export const ModalContactSlice = createSlice({
  name: 'modal-add-contact-slice',
  initialState: {
    show: false,
    toAdd: true,
    eid: null,//id of the contact to edit
  },
  reducers: {
    openModal: (state, action) => {
      state.show = true;
      state.toAdd = action.payload.toAdd
      if (!action.payload.toAdd) {
        state.eid = action.payload.id
      }
    },
    closeModal: (state, action) => {
      state.show = false;
      state.eid = null
    }
  }
})

export const actions = ModalContactSlice.actions