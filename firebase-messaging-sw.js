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
  console.log('Mensagem recebida em background:', message);

  const notificationTitle = message.notification.title;
  const notificationOptions = {
    body: message.notification.body, // Usar o corpo da mensagem recebida
    // icon: '/firebase-logo.png'
    data: { url: '/' } // Adiciona a URL como parte dos dados da notificação
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const url = clickedNotification.data.url; // Pega a URL dos dados da notificação

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
