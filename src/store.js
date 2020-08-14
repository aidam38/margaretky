import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBV_6GglSqUF5XKUYKf10CJXbI9KbwEOS0",
    authDomain: "margaritky-9d201.firebaseapp.com",
    databaseURL: "https://margaritky-9d201.firebaseio.com",
    projectId: "margaritky-9d201",
    storageBucket: "margaritky-9d201.appspot.com",
    messagingSenderId: "1076939523090",
    appId: "1:1076939523090:web:d62dd930e2f342046684cb",
    measurementId: "G-6EYNR46VQ4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fb = firebase;

export const store = {
    people: [],
    getPeople: async () => {
        return firebase.firestore().collection("lidi").get().then(function (results) {
        var people = [];
            results.forEach(function(doc) {
                var person = doc.data();
                person.id = doc.id;
                people.push(person);
            });
            store.people = people;
            console.log(store.people);
        });
    },
    writeLetter: async (person, letter) => {
        return firebase.firestore().collection("lidi").doc(person.id).collection("letters").add(letter)
    },
    addPerson: async (person) => {
        return firebase.firestore().collection("lidi").add(person);
    }
}

export const storage = firebase.storage();

firebase.functions().useFunctionsEmulator('http://localhost:5001')
export const functions = firebase.functions();
