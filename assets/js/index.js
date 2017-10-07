$(document).ready(function() {
    console.log('hi');

    firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            location.replace('../Wagtive/home.html');
        }
    })

})