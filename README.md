# [Mementoes](https://mementoes.herokuapp.com/)
Inspired by the idea of a [Happiness Jar](https://www.elizabethgilbert.com/lets-talk-about-those-happiness-jars-shall-we-dear-lovelies-about-a-y/), Mementoes asks you to make a note of one thing that made you happy each day. This exercise allows you to connect with the good things in your life as they happen and to reflect back upon them over time.

This repository hosts a React.js web application. A React Native sister application is also available ([GitHub](https://github.com/mchlltt/mementoes-mobile)). The React Native application currently supports Android phones.

## Features
- Effortless account creation and authentication with Google OAuth 2.0
- Data is synchronized across the web application and the mobile application
- Tagging mementoes allows you to track and group entries by theme
- `Calendar`, `Tag`, and `Random` views give you different ways to engage with your past mementoes
- You can export your data to a CSV file at any time with the click of a button
- Beautiful, mobile-responsive layout makes using the application fun and easy

## Getting Started
To use the application, please visit <https://mementoes.herokuapp.com>.

### Installing
If you would like to run the application locally, please ensure that you have installed Node.js, Webpack, and MySQL, then take the following steps:
- Clone this repository to your local machine with `git clone http://github.com/mchlltt/mementoes.git`.
- Install NPM dependencies by running `npm install` in the project directory.
- If you use a MySQL username other than `root` or have a non-blank MySQL password, open `config/config.js` and update these values.
- Create a database in MySQL called `mementoes_db`.
- Ensure that you are in the root project directory, then run `npm start`.
- The application will be running at `localhost:3000/` and tables will be created in the database.
- If you want changes you may make to the files to be reflected, you will need to run `webpack` (or `webpack -w` to watch for changes).

_Please note that any entries you make on a local instance will not be synchronized with your account, even if you use the same Google account for sign-in._

## Built with
- Express.js (Server framework)
- Heroku (Cloud platform)
- JawsDB (Heroku database add-on)
- MySQL (RDBMS)
- Node.js (JavaScript environment)
- Passport.js (Authentication middleware)
- React.js (UI framework)
- React Modules/Components
  - [React Router](https://github.com/ReactTraining/react-router)
  - [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
  - [React Bootstrap Router](https://github.com/react-bootstrap/react-router-bootstrap)
  - [React Big Calendar](https://github.com/intljusticemission/react-big-calendar)
  - [React Datepicker](https://github.com/Hacker0x01/react-datepicker)
  - [React Tagcloud](https://github.com/madox2/react-tagcloud)
  - [React Tags Input](https://github.com/olahol/react-tagsinput)
  - [React Toastr](https://github.com/tomchentw/react-toastr)
- Sequelize (ORM)
- StartReact (React.js theme)
- Webpack (Module bundler)
- WebStorm (IDE)

## Author
- Mich Elliott - [mchlltt](https://github.com/mchlltt)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgements
The author of this project would like to thank Northwestern University Coding Boot Camp for direction and support in creating this product, as well as the vibrant community of React.js and Node.js users for sharing their work and wisdom.

Additionally, the jar in the application logo was used with permission from <a href="http://www.freepik.com/free-photos-vectors/background">Freepik</a>.
