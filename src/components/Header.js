import React from 'react'
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { tlogout } from '../redux/thunks/authThunks'
import { actions as ModalActions } from '../redux/slices/modalSlice'
import ContactModal from './ContactModal'

export default function Header() {
  const dispatch = useDispatch()
  const authS = useSelector(state => state.auth)
  const acmS = useSelector(state => state.modal)

  function onLogoutHandler() {
    dispatch(tlogout())
  }
  return <>
    {acmS.show && <ContactModal />}
    <header className={styles['header']}>
      <h1>Xeno Contacts</h1>
      {authS.isAuthenticated && <nav>
        <button disabled={authS.pending} onClick={() => { dispatch(ModalActions.openModal({ toAdd: true })) }}>Create</button>
        <button disabled={authS.pending} onClick={onLogoutHandler}>logOut</button>
      </nav>}
    </header>
  </>
}
