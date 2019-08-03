import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAedV4u1nMAOL4JIMwXWa2ZMCGtmOPzVZI",
  authDomain: "colors-db-df2df.firebaseapp.com",
  databaseURL: "https://colors-db-df2df.firebaseio.com",
  projectId: "colors-db-df2df",
  storageBucket: "",
  messagingSenderId: "584470325422",
  appId: "1:584470325422:web:c13c9f21360553b6"
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore().doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export const auth = firebase.auth()
export const firestore = firebase.firestore

//google authenthication utility
const provider = new firebase.auth.GoogleAuthProvider()
//Sets the OAuth custom parameters to pass in a Google OAuth 
//request for popup and redirect sign-in operations
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)


//export the rest library in case we'll need smth
export default firebase