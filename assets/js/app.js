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

    // SIGN IN WITH EMAIL AND PASSWORD

    $("#signin").on("click", e => {
        event.preventDefault();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    })

    // REGISTER NEW USER WITH EMAIL AND PASSWORD

    $("#register").on("click", e => {
        event.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        const auth = firebase.auth();
        const userName = $("#name").val().trim();

        var userScore = 0;


        const promise = auth.createUserWithEmailAndPassword(email, password).then(function(user) {

            // STORES ADDITIONAL DATA FROM REGISTRATION FORM

            db.ref('users/' + user.uid).set({
                firstName: userName,
                email: email,
                password: password,
                score: userScore
            })

            // SEND VERIFICATION EMAIL

            firebase.auth().onAuthStateChanged(user => {
                user.sendEmailVerification();
                console.log("Verification email sent")
            })

        });
        promise.catch(e => console.log(e.message));
    });

    // LOGOUT

    $("#logout").on("click", e => {
        firebase.auth().signOut();
    })

    firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
            if (user.emailVerified) {
                var uid = user.uid;

                db.ref('users/' + uid).on('value', snapshot => {
                    activeUser = snapshot.val().firstName;
                    email = snapshot.val().email;
                    password = snapshot.val().password;
                    userScore = snapshot.val().score;
                });

                $("#push").on("click", function() {
                    userScore += 1;

                    db.ref('users/' + uid).update({
                        score: userScore
                    });

                });



            } else {

                console.log("not logged in");
            }
        }
    })

});

