import { useDispatch, useSelector } from 'react-redux'
import styles from './ContactItem.module.css'
import React from 'react'
import { tdeleteContact } from '../redux/thunks/contactsThunks'
import { actions as ModalActions } from '../redux/slices/modalSlice'
import "react-toastify/dist/ReactToastify.css";

export default function ContactItem({ contact }) {
  const contactsS = useSelector(state => state.cnts)
  const dispatch = useDispatch()

  function onDeleteContact() {
    dispatch(tdeleteContact(contact._id))
  }
  function onEditContact() {
    dispatch(ModalActions.openModal({ toAdd: false, id: contact._id }))
  }

  return <>
    <li
      className={styles.contactItem}
      key={contact._id}>
      <div className={styles['info']}>
        <h3>{contact.name}</h3>
        <p>Contact : {contact.contact}</p>
      </div>
      <div className={styles.actions}>
        <button disabled={contactsS.pending} onClick={onEditContact}>Edit</button>
        <button disabled={contactsS.pending} onClick={onDeleteContact}>delete</button>
      </div>
    </li>
  </>
}
