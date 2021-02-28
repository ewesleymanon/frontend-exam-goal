import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  let users = JSON.parse(localStorage.getItem('users'));

  function handleEmail(e) {
    setEmail(e.target.value)
    setError('');
    setSuccess('');
  }

  function handlePassword(e) {
    setPassword(e.target.value)
    setError('');
    setSuccess('');
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value)
    setError('');
    setSuccess('');
  }

  function handleSubmit(e) {
    if(email && password && confirm_password) {
      
      if(password == confirm_password) {
        handleRegister()
      } else {
        setError("Password doesn't match")
        setSuccess('');
      }
      
    } else {
      setSuccess('')
      setError('All fields are required');
    }
  }

  function handleRegister() {
    const submitData = {
      "id": users.length + 1,
      "email": email,
      "password": password,
      "role": "user"
    }

    users = [...users, submitData];
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Successfully Registered!')

    // Clear all fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }
  

  return (
    <section className="l-form login">
      <h1 className="form-title">REGISTER</h1>
      <form className="form">
        {
          error &&
          <p className="form-status is-error">{error}</p>
        }
        {
          success &&
          <p className="form-status is-success">{success}</p>
        }
        <div className="form-group">
          <p className="form-label">Email</p>
          <input className="form-field" value={email} onChange={(e) => (handleEmail(e))} type="email" name="email" required/>
        </div>
        <div className="form-group">
          <p className="form-label">Password</p>
          <input className="form-field" value={password} onChange={(e) => (handlePassword(e))} type="password" name="password" required/>
        </div>
        <div className="form-group">
          <p className="form-label">Confirm Password</p>
          <input className="form-field" value={confirm_password} onChange={(e) => (handleConfirmPassword(e))} type="password" name="confirm_password" required/>
        </div>
        <Button title="REGISTER" onClick={(e) => (handleSubmit(e))} />
        <p className="account">Already have an account?<Link className="account-link" to="/login"> LOGIN HERE</Link></p>
      </form>
    </section>
  ) 
}

export default Register;