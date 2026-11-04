importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCoc7aWgxiEa-2hlh-tgeiznhOy6wu_zkY",
  authDomain: "shop-user-fb456.firebaseapp.com",
  projectId: "shop-user-fb456",
  storageBucket: "shop-user-fb456.firebasestorage.app",
  messagingSenderId: "829084399931",
  appId: "1:829084399931:web:be5c6945a826496b041f1e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Notification";

  const options = {
    body: payload.notification?.body || "",
  };

  self.registration.showNotification(title, options);
});