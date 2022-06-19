const firebaseConfig = {
    apiKey: "AIzaSyDFye84uVDwGIJHo4n9azAB7wa2Xdg9d7I",
    authDomain: "lets-chat-web-app-76b67.firebaseapp.com",
    databaseURL: "https://lets-chat-web-app-76b67-default-rtdb.firebaseio.com",
    projectId: "lets-chat-web-app-76b67",
    storageBucket: "lets-chat-web-app-76b67.appspot.com",
    messagingSenderId: "693646075825",
    appId: "1:693646075825:web:9782ac9fd338015be4ff90",
    measurementId: "G-9D94D2YSDG"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var user_name = localStorage.getItem("user_name", user_name);

  document.getElementById("user_name").innerHTML = "<h3>Welcome " + user_name + "!</h3>";

  function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;

            row = "<h3 class='room_name' id=" + Room_names + " onclick='redirect(this.id)'>" + Room_names + "</h3><hr>";

            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();

function redirect(name) {
    localStorage.setItem("room_name", name);

    window.location = "web-app-page.html";
}

function addRoom() {
    var room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        room_name: room_name,
        purpose: "adding room"
    })

    localStorage.setItem("room_name", room_name);

    window.location = "web-app-page.html";
}

function logOut() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location = "index.html";
}