const prod = process.env.NODE_ENV === 'production';

const config = {
  GITHUB_CLIENT_ID : prod? process.env.GITHUB_CLIENT_ID: "f344a987c3d87a83b193",
  GITHUB_CLIENT_SECRET : prod? process.env.GITHUB_CLIENT_SECRET : "7a814ebd607af91f1e36392ba79d097815bb5082",
  APPLICATION_ID : prod? process.env.APPLICATION_ID: "Mixvf1k0dyzRjwP6iMaVBoA6EBNiUrFPDr8hU1d1",
  JAVASCRIPT_KEY : prod? process.env.JAVASCRIPT_KEY: "wCos1ljBvek1nrksJdfyDRerYhrORYayvTh9W5Dl",
  PORT : process.env.PORT || 8000,
  DB : process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/bootcamp',
  URL : prod? 'https://admission.philos.io': 'http://localhost:8000',
  AppConfig: {
    currentUserUrl: prod? '/users/me': 'http://localhost:8000/users/me',
    registerUrl: prod? '/users/register': 'http://localhost:8000/users/register',
    githubUrl: prod? '/auth/github': 'http://localhost:8000/auth/github'
  },
  email:{
    from: 'Philos Bootcamp', // sender address
    to: (email) => email,
    subject: 'Welcome to Philos Lab!',
    message: (username) => {
      return `<p>
                Hey ${username}, Thank you for applying for our bootcamp!
                You're about to experience something unique.</p>
              <p>
                 We will contact you shortly by e-mail to set-up the In-person interview.
                 The interview will last around 25 min.
               </p>
              <b/>
              <p>
                Philos Team
               </p>`;
    },
    service: 'Gmail',
    authorisation: {
      user: 'ping@philos.io',
      username: 'Philos Bootcamp',
      pass: 'getbetter'
    }
  }
};

module.exports = config;
