import firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your project's config object
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBWMID7QUzVHKGMGTTw0vDmazUKmJwj9Y4',
  authDomain: 'lab3-cd1bd.firebaseapp.com',
  databaseURL: 'https://lab3-cd1bd.firebaseio.com',
  projectId: 'lab3-cd1bd',
  storageBucket: 'lab3-cd1bd.appspot.com',
  messagingSenderId: '131952945734',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  // do something here
  database.ref('notes').on('value', (snapshot) => {
    // callback() when done
    callback(snapshot.val());
  });
}

export function addNote(text) {
  const { key } = firebase.database().ref('notes').push();
  firebase.database().ref('notes').child(key).set({
    title: text, text: 'enter text', x: 30, y: 30,
  });
}

export function deleteNote(id) {
  console.log('firebase delete function');
  console.log(database.ref('notes').child(id));
  database.ref('notes').child(id).remove();
}

export function updateContent(id, body) {
  console.log('at updateContent in firebase');
  database.ref('notes').child(id).update({ text: body });
}

export function updateXY(id, posx, posy) {
  console.log('firebase updateXY function');
  database.ref('notes').child(id).update({ x: posx, y: posy });
}

export function updateTitle(id, t) {
  console.log('at updateTitle in firebase');
  database.ref('notes').child(id).update({ title: t });
}
