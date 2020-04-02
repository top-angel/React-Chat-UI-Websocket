import * as firebase from 'firebase';
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDsZrFJhQNhel7imgeagMrA1MkWba-neJ4",
  authDomain: "vault-chat.firebaseapp.com",
  databaseURL: "https://vault-chat.firebaseio.com",
  projectId: "vault-chat",
  storageBucket: "vault-chat.appspot.com",
  messagingSenderId: "953698227547",
  appId: "1:953698227547:web:b75fa627a318de578ff67e",
  measurementId: "G-KGF3C83B15"
});

export default app;
