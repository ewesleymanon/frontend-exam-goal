import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../actions';
import { Link, useHistory } from 'react-router-dom';
import fire from '../base'

import Button from './Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleEmail (e) {
    setEmail(e.target.value);
    setEmailError('');
  }

  function handlePassword (e) {
    setPassword(e.target.value);
    setPasswordError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await fire
      .auth()
      .signInWithEmailAndPassword(email, password);
      setLoading(false);
      await fetchUserRole(user.uid);
      history.push('/');
    } catch(error) {
      setLoading(false);
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
          break;
      }
    }    
  }

  function fetchUserRole(uid) {
    fire.firestore()
      .collection('users')
      .doc(uid)
          .get()
          .then(snapshot => {
            if (!snapshot.exists) {
              console.log('User is not found')
            } else {
              const user = snapshot.data();
              localStorage.setItem('session', JSON.stringify({isLogged: true, role: user.role}));
              dispatch(logIn(user.role));
            }
          })
  }

  return (
    <section className="l-form login">
      <h1 className="form-title">LOGIN</h1>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <p className="form-label">Email</p>
          <input className="form-field" value={email} onChange={e => (handleEmail(e))} type="email" name="email" required/>
          <small className="error">{emailError}</small>
        </div>
        <div className="form-group">
          <p className="form-label">Password</p>
          <input className="form-field" value={password} onChange={e => (handlePassword(e))} type="password" name="password" required/>
          <small className="error">{passwordError}</small>
        </div>
        <Button type="submit" loading={loading} title="LOGIN"/>
        <p className="account">No account yet? <Link className="account-link" to="/register"> REGISTER HERE</Link></p>
      </form>
    </section>
  ) 
}

export default Login;