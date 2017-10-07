$(document).ready(function() {

firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
            if (user.emailVerified) {

                var uid = user.uid;

                db.ref('users/' + uid).on('value', snapshot => {
                    var userFirst = snapshot.val().firstName;
                    var userLast = snapshot.val().lastName;
                    var email = snapshot.val().email;
                    var hTown = snapshot.val().hTown;
                    var petName = snapshot.val().petName;
                    var score = snapshot.val().score;
                    var level = snapshot.val().level;
                    var loggedIn = true;
                    var verified = true;

                    $('#nameSpan').text(userFirst + userLast)
                    $('#level').text(' '+ level)
                    $('#score').text(' '+ score)

                })

            } else {

                console.log("email not verified");
            }
        } else {

            location.replace('../Wagtive/index.html');
        }
    })

})