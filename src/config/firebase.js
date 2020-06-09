import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCCB5dJrviVv01SkTzXFhM_KH6ADI8R1S8",
  authDomain: "eventos-2abe5.firebaseapp.com",
  databaseURL: "https://eventos-2abe5.firebaseio.com",
  projectId: "eventos-2abe5",
  storageBucket: "eventos-2abe5.appspot.com",
  messagingSenderId: "346346877700",
  appId: "1:346346877700:web:ba36ab1d2a494803ef9651"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);