let localhost = window.location.hostname === 'localhost';

let AppConfig = {
  currentUser: {},
  githubUrl: localhost? 'http://localhost:8000/auth/github': '/auth/github',
  registerUrl: localhost? 'http://localhost:8000/api/users/register': '/api/users/register',
  currentUserUrl: localhost? 'http://localhost:8000/api/users/me': '/api/users/me',
  step: 1
};

export default AppConfig;
