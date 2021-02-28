import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../actions';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
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

  function handleSubmit(e) {
    if(email && password) {
      const check = users.find(user => user.email == email && user.password == password);
      if(check) {
        localStorage.setItem('session', JSON.stringify({isLogged: true, role: check.role}));
        dispatch(logIn(check.role));
        setSuccess('Successfully Logged In')
        setTimeout(() => {
          history.push('/');
        }, 1000)
      } else {
        setError('Invalid Credentials');
      }
        
      
    } else {
      setSuccess('')
      setError('All fields are required');
    }
  }

  return (
    <section className="l-form login">
      <h1 className="form-title">LOGIN</h1>
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
        <Button title="LOGIN" onClick={(e) => (handleSubmit(e))} />
        <p className="account">No account yet? <Link className="account-link" to="/register"> REGISTER HERE</Link></p>
      </form>
    </section>
  ) 
}

export default Login;