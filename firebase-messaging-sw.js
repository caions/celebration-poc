importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  //credenciais
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((message) => {
  console.log('chegou uma background mensagem')
  console.log(message.notification.title)
  console.log(message.notification.body)
});

messaging.addEventListener('notificationclick', function (event) {
  event.notification.close();
  clients.openWindow("/");
});