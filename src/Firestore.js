import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDu8Pcc4gQOB-K_zQcaYdszHUBUdJL0D_o",
  authDomain: "mr-ready.firebaseapp.com",
  databaseURL: "https://mr-ready.firebaseio.com",
  projectId: "mr-ready",
  storageBucket: "mr-ready.appspot.com",
  messagingSenderId: "54629435784",
  appId: "1:54629435784:web:814d2dc3737175b145123d"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();