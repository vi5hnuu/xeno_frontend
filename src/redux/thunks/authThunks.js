import axios from "axios";
import { actions as AuthActions } from "../slices/authSlice";

const serverURL = 'https://xeno-contact-vi.onrender.com/api/v1'


export function login({ email, password }) {
  return async (dispatch, getState) => {
    dispatch(AuthActions.loginPending());
    try {
      let creds = JSON.stringify({
        "email": email,
        "password": password
      });

      let config = {
        method: 'post',
        url: `${serverURL}/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: creds
      };
      const { data } = await axios.request(config)
      if (data?.status !== undefined && !data?.status) {//validation error
        return dispatch(AuthActions.loginFailure({ error: data?.message }));
      }
      console.log(data);
      dispatch(AuthActions.login({ user: data.user, token: data.token, message: 'Login success...' }));
    } catch (error) {
      // console.log(error?.response?.data?.message);
      dispatch(AuthActions.loginFailure({ error: error?.response?.data?.message }));
    }
  }
}

export function tlogout() {
  return async (dispatch, getState) => {
    dispatch(AuthActions.logoutPending());
    try {
      let config = {
        method: 'get',
        url: `${serverURL}/logout`,
      };
      const { data } = await axios.request(config)
      dispatch(AuthActions.logout({ message: data.message }));
    } catch (error) {
      dispatch(AuthActions.logoutFailure({ error: error.message }));
    }
  }
}


export function register({ username, email, password }) {
  return async (dispatch, getState) => {
    dispatch(AuthActions.registerPending());
    const cred = JSON.stringify({
      "username": username,
      "email": email,
      "password": password
    });

    try {
      let config = {
        method: 'post',
        url: `${serverURL}/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: cred
      };
      const { data } = await axios.request(config)
      if (data?.status !== undefined && !data?.status) {//validation error
        return dispatch(AuthActions.registerFailure({ error: data?.message }));
      }
      dispatch(AuthActions.register({ user: data.user, token: data.token, message: 'login success...' }));
    } catch (error) {
      dispatch(AuthActions.registerFailure({ error: error?.response?.data?.message }));
    }
  }
}