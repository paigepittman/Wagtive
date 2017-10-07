$(document).ready(function() {

    // SIGN IN WITH EMAIL AND PASSWORD

    $("#signIn").on("click", e => {
        event.preventDefault();
        const email = $("#inputEmail").val().trim();
        const password = $("#inputPassword").val().trim();

        const promise = auth.signInWithEmailAndPassword(email, password).then(function() {
            location.replace('../Wagtive/home.html');
        });
        promise.catch(e => console.log(e.message));

    })

    // REGISTER NEW USER WITH EMAIL AND PASSWORD

    $("#modalSignup").on("click", e => {
        event.preventDefault();

        firstName = $("#modalFName").val().trim();
        lastName = $("#modalLName").val().trim();
        email = $("#modalEmail").val().trim();
        password = $("#modalPassword").val().trim();
        hTown = $("#modalHTown").val().trim();
        petName = $("#modalPName").val().trim();



        const promise = auth.createUserWithEmailAndPassword(email, password).then(function(user) {

            // STORES ADDITIONAL DATA FROM REGISTRATION FORM

            db.ref('users/' + user.uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                htTown: hTown,
                petName: petName,
                score: 0,
                level: 'puppy'

            })

            // SEND VERIFICATION EMAIL

            firebase.auth().onAuthStateChanged(user => {
                const promise = user.sendEmailVerification().then(function() {
                    console.log("Verification email sent");
                    location.replace('../Wagtive/home.html');

                });

            })

        });
        promise.catch(e => console.log(e.message));
    });


    // LOGOUT

    $("#logout").on("click", e => {
        auth.signOut();
    })

    firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
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
            } else {

                console.log("email not verified");
            }
        } else {

            console.log("not logged in");
        }
    })
})
