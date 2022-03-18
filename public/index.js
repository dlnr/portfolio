import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-performance.js";
import { getStorage, getDownloadURL, ref as ref_storage } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js";
import { getDatabase, connectDatabaseEmulator, ref, child, get, onValue, query, orderByChild } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAQ3prZB4zxJ1jhIg9qwD1cuNTnNUlo6Ho',
    authDomain: 'dlnr-dev.firebaseapp.com',
    databaseURL: 'https://dlnr.europe-west1.firebasedatabase.app/',
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

const portfolio = query(ref(db, 'portfolio'), orderByChild('order'));
const timeline = document.getElementById('timeline');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('data-scale', '1');
    } else {
      entry.target.setAttribute('data-scale', '0');
    }
  })
}, {
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0
});

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
  const keyref = ref_storage(storage, `portfolio/${key}/thumb.webp`);
  let imgurl = false;
  
  let utime = new Date(content['timestamp'] * 1000);
  
  let project = document.createElement('article');
  let header = document.createElement('header');
  let heading = document.createElement('h2');
  let anchor = document.createElement('a');
  let timestamp = document.createElement('time');
  
  getDownloadURL(keyref)
    .then((url) => {
      imgurl = url;
      let image = document.createElement('img');
      let thumb = document.createElement('div');
      thumb.className = 'thumb';
      image.setAttribute('src', imgurl);
      image.setAttribute('loading', 'lazy');
      thumb.appendChild(image);
      project.appendChild(thumb);
    })
    .catch((error) => {
      console.log('err',error)
    });

  project.setAttribute('data-scale', '0');
  heading.innerHTML = content['title'];
  anchor.id = key;
  anchor.name = key;
  anchor.setAttribute('tabindex', '0');
  timestamp.innerHTML = `${utime.getUTCFullYear()}`;
  anchor.appendChild(heading);
  header.appendChild(anchor);
  header.appendChild(timestamp);

  if (content['url'] && content['link']) {
    let url = document.createElement('a');
    url.href = content['url'];
    url.innerHTML = content['link'];
    header.appendChild(url);
  }
  
  project.appendChild(header);
  timeline.appendChild(project);

  if(window.matchMedia('(prefers-reduced-motion: no-preference)')) {
    observer.observe(project);
  }
}

if (!navigator.onLine) {
  let offline = document.createElement('article');
  let header = document.createElement('header');
  let heading = document.createElement('h2');
  let timestamp = document.createElement('time');
  heading.innerHTML = 'Please try again later';
  timestamp.innerHTML = 'OFFLINE';
  header.appendChild(heading);
  header.appendChild(timestamp);
  offline.appendChild(header);
  timeline.appendChild(offline);
}