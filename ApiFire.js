import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgepRQY78xHywkPKK_aTVh1LSOdu2a1PQ",
    authDomain: "reab-incor.firebaseapp.com",
    projectId: "reab-incor",
    storageBucket: "reab-incor.appspot.com",
    messagingSenderId: "146034345704",
    appId: "1:146034345704:web:4ae45bd08b45189e0d2b5d",
    measurementId: "G-2ECVZZPZ6E"
};

// Initialize Firebase
const FbApp = initializeApp(firebaseConfig);

export function LoginOnFirebase(Email, Senha) {
    return new Promise((resolve, reject) => {
        const AuthFB = getAuth(FbApp);

        signInWithEmailAndPassword(AuthFB, Email, Senha)
            .then((userCredential) => {
                const FBuser = userCredential.user;
                resolve(FBuser);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(`Authentication failed: ${errorCode} - ${errorMessage}`);
            });
    });
}