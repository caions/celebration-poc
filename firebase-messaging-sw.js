importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: 'AIzaSyBdWss7LxBLZ9P9mzhW8Ha8FdL1q2F9Yg8',
  authDomain: 'poc-flutter-notification.firebaseapp.com',
  projectId: 'poc-flutter-notification',
  storageBucket: 'poc-flutter-notification.appspot.com',
  messagingSenderId: '980765464706',
  appId: '1:980765464706:web:f18427882e5a1b38e07c9b',
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((message) => {
  console.log('chegou uma background message aaa')
  console.log(message.notification.title)
  console.log(message.notification.body)
});