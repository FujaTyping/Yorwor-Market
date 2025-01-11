const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_apiKey}`,
  authDomain: "market.yorwor.siraphop.me",
  projectId: "yorwormarket",
  storageBucket: `${process.env.NEXT_PUBLIC_storageBucket}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_messagingSenderId}`,
  appId: `${process.env.NEXT_PUBLIC_appId}`,
  measurementId: `${process.env.NEXT_PUBLIC_appId}`,
};

export default firebaseConfig;
