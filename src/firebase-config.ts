const firebaseConfig = {
    apiKey: `${process.env.apiKey}`,
    authDomain: "market.yorwor.siraphop.me",
    projectId: "yorwormarket",
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
    measurementId: `${process.env.appId}`
};

export default firebaseConfig