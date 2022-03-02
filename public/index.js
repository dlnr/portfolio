import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-performance.js";
import { getStorage, connectStorageEmulator, getDownloadURL, ref as ref_storage } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js";
// import { getFunctions, httpsCallable, connectFunctionsEmulator } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-functions.js";
import { getDatabase, connectDatabaseEmulator, ref, child, get, onValue, query, orderByChild } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js';

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
// const functions = getFunctions();
// const addProject = httpsCallable(functions, 'addProject');

if (location.hostname === "localhost") {
  connectDatabaseEmulator(db, "localhost", 9000);
  // connectStorageEmulator(storage, "localhost", 9199);
  // connectFunctionsEmulator(functions, "localhost", 5001);
}

const portfolio = query(ref(db, 'portfolio'), orderByChild('title'));
const timeline = document.getElementById('timeline');


onValue(portfolio, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    addProject(childKey, childData);
  });
}, {
  onlyOnce: true
});

async function addProject(key, val) {
  const content = val;
  const keyref = ref_storage(storage, `${key}/thumb.png`);
  let imgurl = false;
  
  
  
  let utime = new Date(content['timestamp'] * 1000);
  
  let project = document.createElement('article');
  let header = document.createElement('header');
  let heading = document.createElement('h2');
  let timestamp = document.createElement('time');
  
    
  console.log(keyref);
  
  getDownloadURL(keyref)
    .then((url) => {
      console.log('url', url);
      imgurl = url;
      let image = document.createElement('img');
      image.setAttribute('src', imgurl);
      project.appendChild(image);
    })
    .catch((error) => {
      console.log('err',error)
    });
  
  heading.innerHTML = content['title'];
  timestamp.innerHTML = `${utime.getUTCFullYear()}`;

  header.appendChild(heading);
  header.appendChild(timestamp);
  project.appendChild(header);
  timeline.appendChild(project);

}