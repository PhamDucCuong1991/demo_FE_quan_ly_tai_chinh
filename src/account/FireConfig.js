import { initializeApp  } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAq3OvjYQubAK5vMkbiHS-c_Knc5Yzvd5s",
    authDomain: "employee-img.firebaseapp.com",
    projectId: "employee-img",
    storageBucket: "employee-img.appspot.com",
    messagingSenderId: "634011249847",
    appId: "1:634011249847:web:82729cfe777e28223cb132",
    measurementId: "G-H9995DPS77"
}

initializeApp(firebaseConfig);

const storage = getStorage();
export default storage;
