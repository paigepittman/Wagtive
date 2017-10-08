$(document).ready(function() {
	
    firebase.auth().onAuthStateChanged(user => {

        var user = firebase.auth().currentUser;

        console.log(user)

        console.log(firebase.storage().ref('users/'+user.uid))

        var fileButton = $("#file")

        fileButton.on('change', e => {
            var file = e.target.files[0];

            var reader = new FileReader();
            reader.onloadend = function() {
                var blob = new Blob([file], { type: "image/jpeg" });
                console.log(blob)

                var storageRef = firebase.storage().ref(user.uid + '/' + file.name);
                console.warn(file);
                var uploadTask = storageRef.put(blob);

            }

            var photoUrl = 'https://firebasestorage.googleapis.com/v0/b/wagtive.appspot.com/o/users%2F'+ user.uid + '%2F' + file.name + '?alt=media&token=ead404cf-8598-418c-91a6-8a7509daf2be';

            user.updateProfile({
                	photoURL: photoUrl
                })

            reader.onerror = function(e) {
                console.log("Failed file read: " + e.toString());
            };
            reader.readAsArrayBuffer(file);
        })

    });

});