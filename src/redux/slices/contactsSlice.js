import { createSlice } from "@reduxjs/toolkit";

export const ContactsSlice = createSlice({
  name: 'contacts-slice',
  initialState: {
    contacts: [],
    error: null,
    pending: false,
    message: null,
    totalPages: 0
  },
  reducers: {
    init: (state, action) => {
      state.error = null;
      state.contacts = action.payload.contacts;
      state.pending = false;
      state.message = action.payload.message
    },
    initPending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    initFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
    },
    pages: (state, action) => {
      state.error = null;
      state.pending = false;
      state.message = action.payload.message
      state.totalPages = action.payload.totalPages
    },
    pagesPending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    pagesFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
    },
    deleteContact: (state, action) => {
      state.error = null;
      state.pending = false;
      state.message = action.payload.message
      state.contacts = state.contacts.filter(contact => contact._id !== action.payload._id)
    },
    deleteContactPending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    deleteContactFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
    },
    addContact: (state, action) => {
      state.error = null;
      state.pending = false;
      state.message = action.payload.message
      state.contacts.push(action.payload.contact)
    },
    addContactPending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    addContactFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
    },
    updateContact: (state, action) => {
      state.error = null;
      state.pending = false;
      state.message = action.payload.message
      const updateContact = action.payload.contact
      const idx = state.contacts.findIndex(contact => contact._id === updateContact._id)
      state.contacts[idx] = updateContact
    },
    updateContactPending: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    updateContactFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload.error
    },
    clearError: (state, action) => {
      state.error = null
    }
  }
})

export const actions = ContactsSlice.actions