import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slices/authSlice";
import { ContactsSlice } from "./slices/contactsSlice";
import { ModalContactSlice } from "./slices/modalSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    cnts: ContactsSlice.reducer,
    modal: ModalContactSlice.reducer
  },
  middleware: [thunk, logger]
})

export default store