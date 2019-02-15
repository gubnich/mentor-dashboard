import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC4hg8iF0GYzvmMB9OolQjrT6S5sNO2Mq0",
  authDomain: "mentor-dashboard-8e6f3.firebaseapp.com",
  databaseURL: "https://mentor-dashboard-8e6f3.firebaseio.com",
  projectId: "mentor-dashboard-8e6f3",
  storageBucket: "mentor-dashboard-8e6f3.appspot.com",
  messagingSenderId: "1070646049854"
};
const fire = firebase.initializeApp(config);
var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('repo');
/*
fire.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;//eslint-disable-line
  // The signed-in user info.
  var user = result.user;//eslint-disable-line
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;//eslint-disable-line
  var errorMessage = error.message;//eslint-disable-line
  // The email of the user's account used.
  var email = error.email;//eslint-disable-line
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;//eslint-disable-line
  // ...
});
*/
export const fb = {
  login: () => fire.auth().signInWithPopup(provider)
}
