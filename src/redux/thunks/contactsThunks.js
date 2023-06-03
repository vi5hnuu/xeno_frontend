import axios from "axios";
import { actions as ContactsActions } from "../slices/contactsSlice";

const serverURL = 'https://xeno-contact-vi.onrender.com/api/v1'

export function initContacts(page = 1) {
  return async (dispatch, getState) => {
    dispatch(ContactsActions.initPending());
    try {

      let config = {
        method: 'get',
        url: `${serverURL}/contacts?page=${page}`,
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        }
      };
      const { data } = await axios.request(config)
      console.log('💥💥', data.data.contacts);
      dispatch(ContactsActions.init({ contacts: data.data.contacts, message: data.message }));
    } catch (error) {
      // console.log(error);
      dispatch(ContactsActions.initFailure({ error: error?.response?.data?.message }));
    }
  }
}

export function getTotalContactsCount() {
  return async (dispatch, getState) => {
    dispatch(ContactsActions.pagesPending());
    try {

      let config = {
        method: 'get',
        url: `${serverURL}/contacts/total`,
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        }
      };
      const { data } = await axios.request(config)
      dispatch(ContactsActions.pages({ totalPages: data.data.total / 20, message: data.message }));
    } catch (error) {
      dispatch(ContactsActions.pagesFailure({ error: error?.response?.data?.message }));
    }
  }
}


export function tdeleteContact(id) {
  return async (dispatch, getState) => {
    dispatch(ContactsActions.deleteContactPending());
    try {

      let config = {
        method: 'delete',
        url: `${serverURL}/contact/${id}`,
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        }
      };
      const { data } = await axios.request(config)
      console.log(data);
      dispatch(ContactsActions.deleteContact({ _id: id, message: data.message }));
    } catch (error) {
      dispatch(ContactsActions.deleteContactFailure({ error: error?.response?.data?.message }));
    }
  }
}

export function tCreateContact({ name, contact }) {
  return async (dispatch, getState) => {
    dispatch(ContactsActions.addContactPending());
    try {

      let config = {
        method: 'post',
        url: `${serverURL}/contact`,
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        },
        data: { name, contact }
      };
      const { data } = await axios.request(config)
      if (data?.status !== undefined && !data.status) {//validation error
        return dispatch(ContactsActions.addContactFailure({ error: data.message }));
      }
      dispatch(ContactsActions.addContact({ contact: data.data.contact, message: data.message }));
    } catch (error) {
      dispatch(ContactsActions.addContactFailure({ error: error?.response?.data?.message }));
    }
  }
}


export function tUpdateContact({ name, contact, id }) {
  return async (dispatch, getState) => {
    dispatch(ContactsActions.updateContactPending());
    try {
      const cData = {}
      if (name) cData.name = name
      if (contact) cData.contact = contact

      let config = {
        method: 'put',
        url: `${serverURL}/contact/${id}`,
        headers: {
          Authorization: `Bearer ${getState().auth.token}`
        },
        data: cData
      };
      const { data } = await axios.request(config)
      console.log('update', data);
      dispatch(ContactsActions.updateContact({ contact: data.data.contact, message: data.message }));
    } catch (error) {
      dispatch(ContactsActions.updateContactFailure({ error: error?.response?.data?.message }));
    }
  }
}