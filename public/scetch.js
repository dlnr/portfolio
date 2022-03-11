import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-performance.js";
import { getStorage, getDownloadURL, ref, listAll } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js";

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

const grid = document.getElementById('grid');
const scetches = ref(storage, 'scetch');

listAll(scetches)
  .then((res) => {
    console.log(typeof(res));
    res.items.forEach((itemRef) => {
      const keyref = ref(storage, itemRef.fullPath);
      let imgurl = false;
      
      getDownloadURL(keyref)
      .then((url) => {
        imgurl = url;
        let image = document.createElement('img');
        let thumb = document.createElement('div');
        thumb.className = 'scetch';
        image.setAttribute('src', imgurl);
        image.setAttribute('loading', 'lazy');
        thumb.appendChild(image);
        grid.appendChild(thumb);
      })
      .catch((error) => {
        console.log('err',error)
      });
    });
  }).catch((error) => {
      console.log('err',error)
  });
