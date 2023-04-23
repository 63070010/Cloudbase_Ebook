import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCiQ042Sqzj1diGwm80Nc6mNEqnvWf6vjU",
    authDomain: "image-a4852.firebaseapp.com",
    projectId: "image-a4852",
    storageBucket: "image-a4852.appspot.com",
    messagingSenderId: "282990400797",
    appId: "1:282990400797:web:fc35f3ee83b0591939bdf4"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };