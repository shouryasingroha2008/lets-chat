var firebaseConfig = {
    apiKey: "AIzaSyAJB7yiR8QMtn1F1VBz7vxNC7dXJLdAbsg",
    authDomain: "kwitter-web-app-ff4d6.firebaseapp.com",
    databaseURL: "https://kwitter-web-app-ff4d6-default-rtdb.firebaseio.com/",
    projectId: "kwitter-web-app-ff4d6",
    storageBucket: "kwitter-web-app-ff4d6.appspot.com",
    messagingSenderId: "91107571748",
    appId: "1:91107571748:web:25cf4e11f404685fedc0b1",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
  function Send(){
      msg = document.getElementById("msg").value;
     firebase.database().ref(room_name).push({
         name : user_name,
         message : msg,
         like : 0
     });
     document.getElementById("msg").value =  " " ;
  }
  function getData() {
       firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
            firebase_message_id = childKey;
             message_data = childData; 
             //Start code
             console.log(firebase_message_id);
         console.log(message_data);
         name1 = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_width_tag  = "<h4>" + name1 + "<img src='tick.png' class='user_tick'>" + "</h4>";
         message_width_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-danger' id=" + firebase_message_id + " value=" +  like + " onclick = 'updateLike(this.id)'>";
         span_width_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like:" + like + "</span> </button> <hr>";
         row = name_width_tag + message_width_tag + like_button + span_width_tag;
         document.getElementById("output").innerHTML += row;
         //End code 
        } }); }); } 
     getData();
     function logout(){
        localStorage.removeItem("user_name");
        localStorage.removeItem("room_name");
        window.location = "index.html";
  }     
  function updateLike(message_id){
button_id = message_id;
console.log(button_id);
likes = document.getElementById(button_id).value;
console.log(likes);
updated_likes = Number(likes) + 1;
console.log(updated_likes);
firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
});
  }