import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, 
createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbkCJGdBCwX3UOxInw3_fDsKMYWCDDlLQ",
    authDomain: "fashion-monarchy.firebaseapp.com",
    projectId: "fashion-monarchy",
    storageBucket: "fashion-monarchy.appspot.com",
    messagingSenderId: "736488373200",
    appId: "1:736488373200:web:a9ab965b45ba7ec45bd7d5"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
   prompt: 'select_account' 
});

//Auth Token acquisition
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//Getting the access to the firestore database
export const db = getFirestore();

//function to add a collection of data to the database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//function to get the categories collection from database
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};


//function to create a new user in users collection in database
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth){
    return;
  }
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
    }
    catch(error){
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password){
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password){
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);