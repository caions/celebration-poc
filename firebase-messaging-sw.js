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

// Manipulador de evento para notificações
self.addEventListener('notificationclick', function (event) {
  console.log('[firebase-messaging-sw.js] Notification click Received.');

  event.notification.close();

  // Verifique se a notificação possui um URL (se sim, redireciona para lá)
  if (event.notification.data && event.notification.data.url) {
    const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;

    const promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

    event.waitUntil(promiseChain);
  }
});