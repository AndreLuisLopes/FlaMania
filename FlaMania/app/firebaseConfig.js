import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAx2_Itrkf9D3UGmSmJNDEdcXNcIoQloAs',
  authDomain: 'flamania-22470.firebaseapp.com',
  projectId: 'flamania-22470',
  storageBucket: 'flamania-22470.firebasestorage.app',
  messagingSenderId: '77316430917',
  appId: '1:77316430917:web:0dff06f54f8c1e282c572c',
  measurementId: "G-DFMEYC3MBD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
