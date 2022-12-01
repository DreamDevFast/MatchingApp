// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWUTbbTZRAseG-AQVx2AbEMaraahqZYHM',
  authDomain: 'matchingapp-4688d.firebaseapp.com',
  projectId: 'matchingapp-4688d',
  storageBucket: 'matchingapp-4688d.appspot.com',
  messagingSenderId: '973151292642',
  appId: '1:973151292642:web:6172c8483e1f4ce41ce2bb',
  measurementId: 'G-GGZM5FHQQ1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
