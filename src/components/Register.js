import { useState } from 'react';
import { Link } from 'react-router-dom';
import fire from '../base';

import Button from './Button';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  let users = JSON.parse(localStorage.getItem('users'));

  function clearInputs() {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  function clearErrors() {
    setEmailError('');
    setPasswordError('');
    setConfirmPassword('');
  }

  function handleEmail(e) {
    setEmail(e.target.value)
    setEmailError('');
    setSuccess('');
  }

  function handlePassword(e) {
    setPassword(e.target.value)
    setPasswordError('');
    setSuccess('');
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value)
    setConfirmPasswordError('');
    setSuccess('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(email && password && confirm_password) {
      console.log('dsad');
      if(password == confirm_password) {
        handleRegister()
      } else {
        setConfirmPasswordError("Password doesn't match")
      }
    }
  }

  function handleRegister() {
    setLoading(true);
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(({user}) => {
        setLoading(false);
        clearInputs();
        clearErrors();
        setUser(user.uid)
        setSuccess('Successfully Registered!');
      })
      .catch(error => {
        setLoading(false);
        console.log(error.code);
        switch (error.code) {
          case "auth/email-aready-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
            break;
        }
      })
  }
  
  async function setUser(uid) {
    await fire.firestore()
      .collection('users')
      .doc(uid)
      .set({
        role: 'user'
      });
  }

  return (
    <section className="l-form login">
      <h1 className="form-title">REGISTER</h1>
      <form className="form" onSubmit={(e) => (handleSubmit(e))}>
        {
          success &&
          <p className="form-status is-success">{success}</p>
        }
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
        <div className="form-group">
          <p className="form-label">Confirm Password</p>
          <input className="form-field" value={confirm_password} onChange={e => (handleConfirmPassword(e))} type="password" name="confirm_password" required/>
          <small className="error">{confirmPasswordError}</small>
        </div>
        <Button type="submit" title="REGISTER" loading={loading} />
        <p className="account">Already have an account?<Link className="account-link" to="/login"> LOGIN HERE</Link></p>
      </form>
    </section>
  ) 
}

export default Register;