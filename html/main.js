// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAKRlqSdDXkXrZidXzsBlQdQYGme4RIwU",
  authDomain: "ecom-ee733.firebaseapp.com",
  projectId: "ecom-ee733",
  storageBucket: "ecom-ee733.appspot.com",
  messagingSenderId: "84411977541",
  appId: "1:84411977541:web:5931d3dcc72009e33c782c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firestore
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  if (signupForm) {
    console.log("Signup form found");
    signupForm.addEventListener('submit', signup);
  }

  if (loginForm) {
    console.log("Login form found");
    loginForm.addEventListener('submit', login);
  }
});

function signup(event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const pass = document.getElementById('signup-password').value;
  
  console.log("Signup function triggered");

  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      alert("Sign-up Successful!");
      console.log(userCredential.user.uid);
    })
    .catch((error) => {
      alert("Error creating user account: " + error.message);
      console.error("Error creating user account: ", error);
    });
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;
  
  console.log("Login function triggered");

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      alert("Login Successful");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Invalid Email or Password: " + error.message);
      console.error("Invalid Email or Password: ", error);
    });
}
