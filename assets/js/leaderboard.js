$(document).ready(function() {
    console.log("hello world! docuement ready.");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBH-OgVkuMyOaep8meq0FJD1RxavuIlXlY",
        authDomain: "wagtive.firebaseapp.com",
        databaseURL: "https://wagtive.firebaseio.com",
        projectId: "wagtive",
        storageBucket: "wagtive.appspot.com",
        messagingSenderId: "248580578313"
    };
    firebase.initializeApp(config);
    const db = firebase.database();
    const auth = firebase.auth();

    var userName;
    var userLevel;
    var userPoints;

    //console.log(db.ref('/users'));
    console.log(db.ref().on('child_added'));

    //Adding users to the table
    //Display values on the page.
    // database.ref().on("child_added", function(childSnapshot){
    //    var _newUserRow = $("<tr>"):

    //     var _user = $("<th scope = 'row'>").html(childSnapshot.val().firstName);
    //     var _level =$("<th scope = 'row'>").html(childSnapshot.val().level);
    //     var _points = $("<td>").html(childSnapshot.val().score);
    //
    //     _newUserRow.append(_user)
    //         .append(_level)
    //         .append(_points);
;
    //     $("#LeaderboardInformation").append(_newUserRow);


    //});

  //document end.
});



