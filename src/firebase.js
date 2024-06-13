import firebase from 'firebase/compat/app'; // For compatibility with older versions
import 'firebase/compat/firestore'; // For Firestore
import 'firebase/compat/functions'; // For Cloud Functions


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC60mFZLpUfPlyqVDhmOm-KdM2cvVdVZtQ",
  authDomain: "react-survey-backend.firebaseapp.com",
  projectId: "react-survey-backend",
  storageBucket: "react-survey-backend.appspot.com",
  messagingSenderId: "466362312129",
  appId: "1:466362312129:web:6640eefc24c83076583b40",
  measurementId: "G-QTXT4LNF8N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export { firebaseConfig };