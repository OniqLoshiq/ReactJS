import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA75L-RVumwI9feM2idepi0gcmGvwQh9fA",
    authDomain: "fb-storage-upload.firebaseapp.com",
    projectId: "fb-storage-upload",
    storageBucket: "fb-storage-upload.appspot.com",
    messagingSenderId: "1031667834618",
    appId: "1:1031667834618:web:abe99abb2274634b32f343"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage};