$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBH-OgVkuMyOaep8meq0FJD1RxavuIlXlY",
        authDomain: "wagtive.firebaseapp.com",
        databaseURL: "https://wagtive.firebaseio.com",
        projectId: "wagtive",
        storageBucket: "wagtive.appspot.com",
        messagingSenderId: "248580578313"
    };//end

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user =>
    {
         db = firebase.database();
         user = firebase.auth().currentUser;

         //logs current user
         console.log(user);
        //logs specific value of current usser
        console.log(user.email);

        db.ref().child('users/').orderByChild('points').on('child_added', function(snapshot) {

            var newRow = $('<tr>');
            var newName = $('<td>').text(snapshot.val().firstName).addClass("text-center");
            var newLevel = $('<td>').text(snapshot.val().level).addClass("text-center");
            var newScore = $('<td>').text(snapshot.val().points).addClass("text-center");
            newRow.append(newName).append(newLevel).append(newScore);
            
            $('#LeaderboardInformation').prepend(newRow);
        })//end db.ref()
    })//end firebase.auth

}) //end document.ready

