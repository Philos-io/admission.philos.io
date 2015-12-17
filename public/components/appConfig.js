let localhost = window.location.hostname === 'localhost';

let baseUrl = 'http://localhost:8000';

let AppConfig = {
  currentUser: {},
  githubUrl: localhost? `${baseUrl}/auth/github`: '/auth/github',
  registerUrl: localhost? `${baseUrl}/api/users/register`: '/api/users/register',
  currentUserUrl: localhost? `${baseUrl}/api/users/me`: '/api/users/me',
  step: 1
};

export default AppConfig;
