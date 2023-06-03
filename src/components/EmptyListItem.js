import React from 'react'
import styles from './EmptyListItem.module.css'

export default function EmptyListItem() {
  return <li className={styles['empty']}>No Contacts Found, Add Some 🙂</li>
}
