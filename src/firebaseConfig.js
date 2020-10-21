import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDhzg36VM71orHClvlmCD6j8vti0tDdbgI",
  authDomain: "english-school-ce688.firebaseapp.com",
  databaseURL: "https://english-school-ce688.firebaseio.com",
  projectId: "english-school-ce688",
  storageBucket: "english-school-ce688.appspot.com",
  messagingSenderId: "750359487303",
  appId: "1:750359487303:web:a470306e3d3baa52416262",
  measurementId: "G-WXMFHJ05B4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
let currentUser = auth.currentUser;
auth.onAuthStateChanged(user => {
  currentUser = user
});

// firebase collections
const usersCollection = db.collection('users');
const coursesCollection = db.collection('courses');
// const commentsCollection = db.collection('comments');
// const likesCollection = db.collection('likes');

export {
  firebase,
  db,
  auth,
  currentUser,
  usersCollection,
  coursesCollection,
  // commentsCollection,
  // likesCollection,
};