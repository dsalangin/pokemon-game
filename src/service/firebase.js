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


class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshop) => {
      cb(snapshop.val());
    })
  }

  offPokemonSoket = () => {
    this.database.ref('pokemons').off();
  }
  
  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  } 

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data).then(() => cb && cb());
  }
}

export default Firebase;