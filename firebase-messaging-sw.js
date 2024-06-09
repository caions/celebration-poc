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

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = '/'; // URL que você deseja abrir ao clicar na notificação

  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
      .then((windowClients) => {
        // Verificar se a aplicação está aberta e focada
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }

        // Se a aplicação não estiver aberta, abri-la em uma nova aba
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
