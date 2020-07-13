/* eslint-disable no-undef */

export const authService = {
  getToken() {
    return localStorage.getItem('token');
  },
  decodeToken() {
    if(this.getToken()){
      const tokenData = Buffer.from(this.getToken(), 'base64').toString('ascii');
      const[email, id] = tokenData.split(',');
      return {email,id};
    }
    return null;
  },
  isAuthenticated() {

    return this.decodeToken()? true : false;
  },

  logoutUser() {
    localStorage.clear();
    window.location.replace('/login');
  },

  redirectUser() {
    const referrer = window.location.pathname;

    this.logoutUser();
    localStorage.setItem('locationReferrer', referrer);
  }
};
