import React from 'react'
import styles from './ActiveUser.module.css'

export default function ActiveUser({ title }) {
  return <div className={styles['active-container']}>
    <span className={styles['activeDot']}></span>
    <p>{title}</p>
  </div>
}
