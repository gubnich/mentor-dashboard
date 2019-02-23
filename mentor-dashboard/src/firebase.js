import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC4hg8iF0GYzvmMB9OolQjrT6S5sNO2Mq0",
  authDomain: "mentor-dashboard-8e6f3.firebaseapp.com",
  databaseURL: "https://mentor-dashboard-8e6f3.firebaseio.com",
  projectId: "mentor-dashboard-8e6f3",
  storageBucket: "mentor-dashboard-8e6f3.appspot.com",
  messagingSenderId: "1070646049854"
};
const fire = firebase.initializeApp(config);
const provider = new firebase.auth.GithubAuthProvider();
provider.addScope('read:user');

export const fb = {
  login: () => fire.auth().signInWithPopup(provider)
}
