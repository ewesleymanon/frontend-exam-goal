export const logIn = (role) => {
  return {
    type: 'SIGN_IN',
    payload: role
  };
};

export const logout = (role) => {
  return {
    type: 'LOGOUT',
    payload: role
  };
};

export const setUser = () => {
  return {
    type: 'SET_USER'
  }
}