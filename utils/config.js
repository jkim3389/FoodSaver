import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDWMnChSTxW3DistQ3vIlKpQ6I_44z-9S0",
    authDomain: "foodsaver-8b9f0.firebaseapp.com",
    databaseURL: "https://foodsaver-8b9f0.firebaseio.com",
    projectId: "foodsaver-8b9f0",
    storageBucket: "foodsaver-8b9f0.appspot.com",
    messagingSenderId: "161899945933",
    appId: "1:161899945933:web:e1b37ff88e4a7e9c406e84",
    measurementId: "G-8RCWSVCSCW"
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
