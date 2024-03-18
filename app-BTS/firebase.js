// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCUfX2f8GhBknHRnX0qxgS0-OY3KbbUe0",
  authDomain: "reactbts-88055.firebaseapp.com",
  projectId: "reactbts-88055",
  storageBucket: "reactbts-88055.appspot.com",
  messagingSenderId: "797594771578",
  appId: "1:797594771578:web:269ccedff6894cdef31bc3"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth, app };