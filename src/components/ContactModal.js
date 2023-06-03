import styles from './ContactModal.module.css'
import BackDrop from './BackDrop'
import { createPortal } from 'react-dom'
import { actions as ModalActions } from '../redux/slices/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { tCreateContact, tUpdateContact } from '../redux/thunks/contactsThunks'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { actions as ContactActions } from '../redux/slices/contactsSlice'

export default function ContactModal() {
  const { pending: isPending, error: isError } = useSelector(state => state.cnts)
  const modalS = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const nameRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    if (isPending) {
      toast.info(`Wait, ${modalS.toAdd ? 'creating' : 'updating'} contact...`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    if (isError) {
      toast.error(isError, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(ContactActions.clearError())
    }
  }, [isPending, isError, dispatch, modalS.toAdd])

  function onContactHandler(evnt) {
    evnt.preventDefault()
    const name = nameRef.current.value
    const contact = contactRef.current.value
    if (modalS.toAdd) {
      dispatch(tCreateContact({ name, contact }))
    } else {
      dispatch(tUpdateContact({ name, contact, id: modalS.eid }))
    }
  }
  return createPortal(<>
    <BackDrop />
    <form className={styles['modal-container']}>
      {!modalS.toAdd && <p>*partial update is possible.</p>}
      <div className={styles['control']}>
        <label htmlFor='name'>Name</label>
        <input ref={nameRef} id='name' name='name' placeholder='vishnu kumar' />
      </div>
      <div className={styles['control']}>
        <label htmlFor='contact'>Contact</label>
        <input ref={contactRef} id='name' name='contact' placeholder='9785855892' type='tel' />
      </div>
      <div className={styles['actions']}>
        <button disabled={isPending} onClick={onContactHandler}>{modalS.toAdd ? 'Add' : 'Update'}</button>
        <button disabled={isPending} onClick={() => { dispatch(ModalActions.closeModal()) }} >Cancel</button>
      </div>
    </form>
  </>, document.querySelector('body'))
}
