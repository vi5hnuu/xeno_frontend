import React from 'react'
import ContactItem from './ContactItem';
import styles from './ContactList.module.css';
import EmptyListItem from './EmptyListItem';


export default function ContactList({ contacts }) {
  return <ul className={styles['list']} >
    {contacts.map(contact => {
      return <ContactItem key={contact._id} contact={contact} />
    })}
    {
      contacts.length === 0 && <EmptyListItem />
    }
  </ul>
}
