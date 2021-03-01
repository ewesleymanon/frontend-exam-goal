import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import fire from '../base';
import { logout } from '../actions';


const logoSrc = require('../assets/images/logo-black.png').default;

const Header = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleLogout () {
    dispatch(logout());
    fire.auth().signOut();
    localStorage.setItem('session', JSON.stringify({isLogged: false, role: 'user'}));
  }

  return (
    <header>
      <nav className="l-nav nav" id="top">
        <Link to="/"><img src={logoSrc} className="nav-logo" alt="Logo"/></Link>
        <Switch>
          <Route path="/login">
            <Link to="/" className="nav-session">CLOSE</Link>
          </Route>
          <Route path="/register">
            <Link to="/" className="nav-session">CLOSE</Link>
          </Route>
          <Route path="/">
            {
              auth.isLogged == false
                ? <Link to="/login" className="nav-session">LOGIN</Link>
                : <Link to="/logout" onClick={() => handleLogout()} className="nav-session">LOGOUT</Link>
            }
          </Route>
        </Switch>
      </nav>
    </header>
  )
}

export default Header;