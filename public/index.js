import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
import { getDatabase, connectDatabaseEmulator, ref, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAQ3prZB4zxJ1jhIg9qwD1cuNTnNUlo6Ho',
    authDomain: 'dlnr-dev.firebaseapp.com',
    databaseURL: 'https://dlnr-dev.firebaseio.com',
    projectId: 'dlnr-dev',
    storageBucket: 'dlnr-dev.appspot.com',
    messagingSenderId: '776926493994',
    appId: '1:776926493994:web:be449c8aba4ccc32edf253',
    // measurementId: 'G-S6D4D9WXCN',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase();
if (location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "localhost", 9000);
}

// const portfolio = db.ref('portfolio');

// const portfolio = ref(db, 'portfolio/');


// const dbRef = ref(db, 'portfolio');

// onValue(dbRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });
// get(child(dbRef, 'straightaway')).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

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

// ref.orderByChild('timestamp').on('child_added', (snapshot) => {
//   console.log(snapshot.key + ' was ' + snapshot.val().height + ' meters tall');
// });

console.log('db', dbRef);