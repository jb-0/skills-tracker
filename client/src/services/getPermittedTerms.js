import firebase from 'firebase/app';
require('firebase/firestore');

// Public facing firebase config 
const firebaseConfig = {
  apiKey: 'AIzaSyBjKKngqvHciPZI-hIWKZb6FOQixIeMA2o',
  authDomain: 'skills-tracker-1e309.firebaseapp.com',
  projectId: 'skills-tracker-1e309',
};

// Init firebase and assign firestore db
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// The permitted terms
let permittedTerms = {};

// Go through DB and get permitted terms, add them into an object
db.collection("permittedTerms").get().then((querySnapshot) => {
  querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      permittedTerms = Object.assign(permittedTerms, data);
  })
});

export default permittedTerms;