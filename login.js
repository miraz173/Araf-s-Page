// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCuI6qWnKp3ky_bqdl9Dxuocp4O7ggqMsI",
//   authDomain: "miraz-fa035.firebaseapp.com",
//   databaseURL: "https://miraz-fa035.firebaseio.com",
//   projectId: "miraz-fa035",
//   storageBucket: "miraz-fa035.appspot.com",
//   messagingSenderId: "130767717396",
//   appId: "1:130767717396:web:ff0bc1b023207d154bd301",
//   measurementId: "G-KFJ0P2LYKB"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

function writeData(){
    app.database.ref("User").set({
        name: document.getElementById("mameField").value,
        age: document.getElementById("ageField").value
    });console.log("called");
}

// function insertData() {
//     set(ref(db, "Peoples/"+ nameBox.value),{
//         NameOfStd: nameBox.value,
//         Age: ageBox.value
//     })
//         .then(()=>{
//             alert("Data Stored");
//         })
//         .catch((error)=>{
//             alert("Unsuccessful, error"+error);
//         })
// }