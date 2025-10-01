import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './styles.module.css';

import {
  reset as session_reset,
  create as session_create,
  set as session_set,
} from "../../services/session"

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    createError,
  } = useSelector((store) => store.session);

  useEffect(() => {
    dispatch(session_reset())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    if (data.user.indexOf('@') > -1) {
      data.email_address = data.user;
    } else {
      data.username = data.user;
    }

    delete data.user;

    dispatch(session_create(data))
      .then((response) => {
        if (response.payload.success) {
          dispatch(session_set({
            data: {
              active: true,
              user: response.payload.data.user,
              admin: response.payload.data.user.admin,
            }
          }))
          navigate('/profile')
        }
      })
  }

  return (
    <div className={styles['Login']}>
      <Header />

      <section className={styles['Login__Form_Section']}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>Username or email address</label>
          <input name="user" />
          <label>Password</label>
          <input name="password" type="password" />
          <button>
            Login
          </button>

          {
            createError && <p>{createError}</p>
          }
        </form>
      </section>
    </div>
  )
}

export default Login
