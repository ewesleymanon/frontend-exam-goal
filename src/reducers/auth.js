const session = JSON.parse(localStorage.getItem('session'));
let authData = null;
if(session) {
  authData = session;
} else {
  authData = {
    isLogged: false,
    role: 'user'
  }
}

const authReducer = (state = authData, action) => {
  switch(action.type) {
    case 'SIGN_IN': 
      return Object.assign({}, state, {
        isLogged: true,
        role: action.payload
      });
    case 'LOGOUT': 
      return Object.assign({}, state, {
        isLogged: false,
        role: 'user'
      });
    default: 
      return state;
  }
};

export default authReducer;