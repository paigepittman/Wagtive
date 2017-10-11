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
                    var activities = snapshot.val().activities;
                    var level;

                    if (points < 1000) {
                        level = "Puppy";
                    } else if (points < 2000) {
                        level = "Lap Dog";
                    } else if (points < 3000) {
                        level = "Tail Wagger";
                    } else if (points < 4000) {
                        level = "Lively Pooch";
                    } else if (points < 5000) {
                        level = "Sporty Hound";
                    } else if (points > 5001) {
                        level = "Alpha Dog";
                    };

                    $('#nameSpan').text(userFirst + ' ' + userLast)
                    $('#level').text(' ' + level)
                    $('#points').text(' ' + points)
                })

                $('#profileImage').attr('src', user.photoURL)


                // db.ref('users/' + uid + '/activities' + '/' + activities).set(
                //         {
                //             name: 'Walking',
                //             date: '10/10/17',
                //             location: 'Los Angeles'
                //         }
                //     )



            } else {

                console.log("email not verified");
            }
        } else {

            //IF NOT LOGGED IN RETURN TO INDEX
            
            location.replace('../Wagtive/index.html');
        }
    })

})