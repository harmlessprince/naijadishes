import  firebase from 'firebase/app'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCdQrCaoQZXnVUrCbW5Oadx2h0O1HRh9Nc",
    authDomain: "naijadishes-b2a3c.firebaseapp.com",
    databaseURL: "https://naijadishes-b2a3c.firebaseio.com",
    projectId: "naijadishes-b2a3c",
    storageBucket: "naijadishes-b2a3c.appspot.com",
    messagingSenderId: "803923651126",
    appId: "1:803923651126:web:2332b78e0fc69c7a96c697",
    measurementId: "G-H8QYD5DNSF"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  // firebase.firestore().settings({timestampsInSnapshots:true})

  //Export firestore database

  export default firebaseApp.firestore();