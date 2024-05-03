import axios from './baseUrl';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { auth } from "./FirebaseService";
import './Components/Authentication/Login.css';


// const app_url = 'https://falafellas.netlify.app';

const app_url = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://falafellas.netlify.app';

export const registerUserService = async (user) => {
    const { name, email, phone_number, designation, roles, password, birth_date, rewards_earned } = user;
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userDetails) => {
        // Signed up 
        const firebaseUser = userDetails.user;
        delete user.password;
        sessionStorage.setItem("token", firebaseUser.accessToken);
        sessionStorage.setItem("id", firebaseUser.uid);

         // Call your backend route to add user
         return axios.post('/users/add', { _id: firebaseUser.uid , name, email, phone_number, designation, roles: roles.toLowerCase(), password, birth_date, rewards_earned })
         .then(response => {
           // Redirect to homepage upon successful addition
           //navigate('/'); // Redirect to Course Page
           window.location.href = `${app_url}/course?user_id=${firebaseUser.uid}`;
         })
         .catch(error => {
           // Handle error, possibly retry adding user
           console.error('Error adding user:', error);
           // Retry adding user
           return registerUserService(user); // Recursively call registerUserService
         });
        //return firebaseUser.accessToken;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error Code ${errorCode}: ${errorMessage}`);
        return null;
        // ..
    });
}

export const loginUserService = async (user) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
        // Signed in 
        const firebaseUser = userCredential.user;
        sessionStorage.setItem("token", firebaseUser.accessToken);
        sessionStorage.setItem("id", firebaseUser.uid);
        //return {token: firebaseUser.accessToken, _id: firebaseUser.uid};
        // Check user role
        return axios.get(`/users/get/${firebaseUser.uid}`)
        .then(response => {
          //debugger;
          const userRole = response.data.user.roles;
          //Redirect based on user role
          if (userRole === 'admin') {
            window.location.href = `${app_url}/admin-course`; // Redirect to admin homepage
          } else if (userRole === 'employee') {
            window.location.href = `${app_url}/course?user_id=${firebaseUser.uid}`; // Redirect to employee homepage
          } else {
            console.error('Unknown user role');
            alert("User Role not valid");
            // Handle unknown user role
          }
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
          // Handle error
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error Code ${errorCode}: ${errorMessage}`);
        return null;
    });
}


export const forgotPassword = (user) => {
  sendPasswordResetEmail(auth, user.email)
  .then(() => {
    window.location.href = `${app_url}/login`;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code ${errorCode}: ${errorMessage}`);
  });
}


export const getUserRole = async( user ) => {
  try {
    const response = await axios.get(`/users/get/${user.uid}`);
    console.log("USer:", user);
    const userRole = response.data.user.roles;
    return userRole;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error; // Propagate the error to the caller
  }
}
