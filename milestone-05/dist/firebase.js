"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResume = exports.storeResume = void 0;
const firebaseConfig = {
    apiKey: "AIzaSyCuBLSyw6j3wsrAPRazxc5TU7wjPgFfwkQ",
    authDomain: "hackathon-01-f9950.firebaseapp.com",
    projectId: "hackathon-01-f9950",
    storageBucket: "hackathon-01-f9950.appspot.com",
    messagingSenderId: "715618959236",
    appId: "1:715618959236:web:7c9be4e55a76c3ffc8a7d1",
    measurementId: "G-04140EXE5V"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
;
const storeResume = async (userData) => {
    const uniqueID = '_' + Math.random().toString(36).substr(2, 9);
    try {
        const docRef = await db.collection("resumes").add({
            id: uniqueID,
            data: userData,
            createdAt: new Date().toISOString()
        });
        console.log("Document written with ID: ", docRef.id);
        return uniqueID;
    }
    catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Failed to store user data.");
    }
};
exports.storeResume = storeResume;
const getResume = async (id) => {
    const docRef = db.collection("resumes").doc(id);
    const doc = await docRef.get();
    if (!doc.exists()) {
        console.log("No such document!");
        alert("No portfolio found with this ID.");
        return;
    }
    const user = doc.data();
    return user.data;
};
exports.getResume = getResume;
