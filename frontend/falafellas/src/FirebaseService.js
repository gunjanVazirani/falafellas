import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//
const firebaseConfig = {
  apiKey: "AIzaSyB3RNs6n3iXKdXHXb27EYK2-SKtdE0MYic",
  authDomain: "falafellas-dc6b2.firebaseapp.com",
  projectId: "falafellas-dc6b2",
  storageBucket: "falafellas-dc6b2.appspot.com",
  messagingSenderId: "868632777447",
  appId: "1:868632777447:web:759d1faec03a236608c842",
  measurementId: "G-CTG1VJ80CD",
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

