import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBIXaa2NpsPsnzsDgwFHU6zfbP1klBlgAc",
  authDomain: "pokemon-game-dsa.firebaseapp.com",
  databaseURL: "https://pokemon-game-dsa-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-dsa",
  storageBucket: "pokemon-game-dsa.appspot.com",
  messagingSenderId: "225255390445",
  appId: "1:225255390445:web:8321690601ef80ad8720e4"
};


firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;