$(document).ready(function() {

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

        firebase.auth().onAuthStateChanged(user =>
        {
             db = firebase.database();
             user = firebase.auth().currentUser;

             //logs current user
             console.log(user)

                //logs specific value of current usser
                console.log(user.email)

                db.ref('users/').on('value', snapshot => {
                allUsers = snapshot.val();

                //logs all users
                console.log(allUsers)

                //logs specific value of all users
                var userList = []

                for (var x in allUsers) {

                    db.ref('users/' + x).on('value', snapshot => {
                     //console.log(snapshot.val());
                    console.log("The level is: " +snapshot.val().level);
                    console.log("The first name is: " +snapshot.val().firstName);
                })

            }

        })

    })

})

    ////console.log(snapshot.val());
    //console.log(snapshot.val().level);
    //console.log(snapshot.child("level").val());
//var firstName = snapshot.child("name/first").val();