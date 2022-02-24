'use strict';

const functions = require('firebase-functions');
// const { html, renderToString } = require('@popeindustries/lit-html-server');
// import {html} from '@popeindustries/lit-html-server';

// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://dlnr-dev.firebaseio.com',
// });

// exports.addProject = functions.https.onCall((title, timestamp) => {
//     // return await renderToString(
//     //     html`
//     //     <div class="project">
//     //         <h2>${title}</h2>
//     //         <time>${timestamp}</time>
//     //     </div>
//     // `);

//     return timestamp;
// })