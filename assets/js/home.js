$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
            if (user.emailVerified) {

                var uid = user.uid;

                db.ref('users/' + uid).on('value', snapshot => {

                    //FILLS OUT USERS PROFILE

                    var userFirst = snapshot.val().firstName;
                    var userLast = snapshot.val().lastName;
                    var email = snapshot.val().email;
                    var hTown = snapshot.val().hTown;
                    var petName = snapshot.val().petName;
                    var points = snapshot.val().points;
                    var level;

                    $('#nameSpan').text(userFirst + ' ' + userLast)
                    $('#level').text(' ' + level)
                    $('#score').text(' ' + score)
                })

                $('#profileImage').attr('src', user.photoURL)


                db.ref('users/' + uid + '/activities').push(
                        {
                            name: 'Walking',
                            date: '10/10/17',
                            location: 'Los Angeles'
                        }
                    )



            } else {

                console.log("email not verified");
            }
        } else {

            //IF NOT LOGGED IN RETURN TO INDEX
            
            location.replace('../Wagtive/index.html');
        }
    })

})