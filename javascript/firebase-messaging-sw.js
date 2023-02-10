importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  return self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: 'https://www.example.com/icon.png',
    image: 'https://www.example.com/image.png',
    badge: 'https://www.example.com/badge.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    sound: 'https://www.example.com/sound.mp3',
    dir: 'ltr',
    lang: 'en-US',
    renotify: true,
    sticky: true,
    data: {
      url: payload.url
    }
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});