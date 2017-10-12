$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {

        db.ref().child('users/').orderByChild('score').on('child_added', function(snapshot){
            console.log(snapshot.val())
        });
            

})

})
