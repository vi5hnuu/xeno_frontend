import styles from './Main.module.css';
import ContactList from './ContactList';
import ReactPaginate from 'react-paginate'
import { getTotalContactsCount, initContacts } from "./../redux/thunks/contactsThunks";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const contactsS = useSelector(state => state.cnts)
  const dispatch = useDispatch()
  console.log(contactsS.contacts);

  useEffect(() => {
    dispatch(getTotalContactsCount())
    dispatch(initContacts())
  }, [dispatch])

  useEffect(() => {
    toast.success(`Welcome to the Xeno-Contacts...`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }, [])

  return <>
    <main className={styles['main']}>
      <div className={styles['list-container']}>
        <div className={styles['list-header']}>Contacts</div>
        {!contactsS.pending && <ContactList contacts={contactsS.contacts} />}
        {contactsS.pending && <Loader />}
        <ReactPaginate
          pageCount={contactsS.totalPages}
          initialPage={0}
          breakLabel='...'
          className={styles['paginate']}
          activeClassName={styles['paginate-active']}
          disabledClassName={styles['paginate-inactive']}
          nextLabel='>>'
          previousLabel='<<'
          nextClassName={styles['paginate-next']}
          previousClassName={styles['paginate-prev']}
          onPageChange={async ({ selected }) => {
            dispatch(initContacts(selected + 1))
          }}
        />
      </div>
    </main>
  </>
}
