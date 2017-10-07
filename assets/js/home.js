$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {

        if (user.emailVerified) {

            var uid = user.uid;

            db.ref('users/' + uid).on('value', snapshot => {
                userFirst = snapshot.val().firstName;
                userLast = snapshot.val().firstLast;
                email = snapshot.val().email;
                hTown = snapshot.val().hTown;
                petName = snapshot.val().petName;
                score = snapshot.val().score;
                level = snapshot.val().level;
            });
        }
    })

})