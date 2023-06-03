import React, { useEffect, useRef, useState } from 'react'
import styles from './Auth.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../redux/thunks/authThunks'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { actions as AuthActions } from '../redux/slices/authSlice';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true)
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const authS = useSelector(state => state.auth)
  const dispatch = useDispatch()
  ///////////////////////////////
  useEffect(() => {
    if (authS.pending) {
      toast.info("Wait, logging you in...", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    if (authS.error) {
      toast.error(authS.error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(AuthActions.clearError())
    }
  }, [authS.pending, authS.error, dispatch])
  ///////////////////////////////
  function onRegisterHandler(evnt) {
    evnt.preventDefault()
    const username = usernameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log({ username, email, password });
    dispatch(register({ username, email, password }))
  }
  function onLoginHandler(evnt) {
    evnt.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log({ email, password });
    dispatch(login({ email, password }))
  }
  function onToggleAuth(evnt) {
    evnt.preventDefault()
    setIsSignIn(isSignIn => !isSignIn)
  }
  return <>
    <section className={styles['container']}>
      <form className={styles['form']}>
        {!isSignIn && <div className={styles['control']}>
          <label htmlFor='username'>Username</label>
          <input ref={usernameRef} id='username' name='username' placeholder='vishnu' />
        </div>}
        <div className={styles['control']}>
          <label htmlFor='email'>Email</label>
          <input ref={emailRef} id='email' name='email' placeholder='kumarvishnu1619@gmail.com' type='email' />
        </div>
        <div className={styles['control']}>
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} id='password' name='password' placeholder='********' type='password' />
        </div>
        <div className={styles['actions']}>
          <button disabled={authS.pending} onClick={isSignIn ? onLoginHandler : onRegisterHandler}>{isSignIn ? 'Log-In' : 'Register'}</button>
          <button disabled={authS.pending} onClick={onToggleAuth}>{isSignIn ? 'Register Instead' : 'Log-In Instead'}</button>
        </div>
      </form>
    </section>
  </>
}
