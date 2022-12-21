import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDnE9SQZ_0v3TWgyxmALdXNIKNZw_wWSvQ",
    authDomain: "my-management-site.firebaseapp.com",
    projectId: "my-management-site",
    storageBucket: "my-management-site.appspot.com",
    messagingSenderId: "1087419646055",
    appId: "1:1087419646055:web:71bbd9b1943fef1efb94c2"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.timestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }
