import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-performance.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js";
import { getDatabase, connectDatabaseEmulator, ref, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAQ3prZB4zxJ1jhIg9qwD1cuNTnNUlo6Ho',
    authDomain: 'dlnr-dev.firebaseapp.com',
    databaseURL: 'https://dlnr-dev.firebaseio.com',
    projectId: 'dlnr-dev',
    storageBucket: 'dlnr-dev.appspot.com',
    messagingSenderId: '776926493994',
    appId: '1:776926493994:web:be449c8aba4ccc32edf253'
};

const app = initializeApp(firebaseConfig);
const perf = getPerformance(app);
const storage = getStorage(app);
const db = getDatabase();

if (location.hostname === "localhost") {
  connectDatabaseEmulator(db, "localhost", 9000);
}

const dbRef = ref(db);

get(child(dbRef, `portfolio`)).then((snapshot) => {
  console.log(snapshot);
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

