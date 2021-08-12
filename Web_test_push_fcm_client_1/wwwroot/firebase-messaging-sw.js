///Service Worker - bacground

importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js')

var firebaseConfig = {
    apiKey: "AIzaSyB4mzTxAplsmC37imEUy0yUQKDQEpKQNoE",
    authDomain: "web-push-1-2013d.firebaseapp.com",
    projectId: "web-push-1-2013d",
    storageBucket: "web-push-1-2013d.appspot.com",
    messagingSenderId: "907300725649",
    appId: "1:907300725649:web:a4cff1adf1481736cf7030",
    measurementId: "G-N83228LKL9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log("on background: "+payload);
});