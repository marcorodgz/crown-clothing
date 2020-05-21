import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyABAICeHK36Z2yDTwONc-dOvaLQy5-IPFU',
  authDomain: 'crown-db-d5432.firebaseapp.com',
  databaseURL: 'https://crown-db-d5432.firebaseio.com',
  projectId: 'crown-db-d5432',
  storageBucket: 'crown-db-d5432.appspot.com',
  messagingSenderId: '919440321940',
  appId: '1:919440321940:web:7c28ebf0dd5c5c09faf381',
  measurementId: 'G-7920T9N78J',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ display: 'popup' });
export const signInWithFacebook = () => auth.signInWithPopup(providerFacebook);

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(providerGoogle);

export default firebase;
