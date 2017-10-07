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


    const db = firebase.database();
    const auth = firebase.auth();

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

        const firstName = $("#modalFName").val().trim();
        const lastName = $("#modalLName").val().trim();
        const email = $("#modalEmail").val().trim();
        const password = $("#modalPassword").val().trim();
        const hTown = $("#modalHTown").val().trim();
        const petName = $("#modalPName").val().trim();



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
            console.log(user)
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

                $("#push").on("click", function() {
                    userScore += 1;

                    db.ref('users/' + uid).update({
                        score: userScore
                    });

                });



            } else {

                console.log("email not verified");
            }
        } else {

                console.log("not logged in");
            }
    })

});