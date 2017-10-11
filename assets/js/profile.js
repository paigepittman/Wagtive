$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {

        var user = firebase.auth().currentUser;
        var fileButton = $("#file");
        var photoUrl;

        //UPDATE TEXT FIELDS

        $('#saveProfile').on('click', function(e) {
            e.preventDefault();

            var first = $('#inputFName').val().trim();
            var last = $('#inputLName').val().trim();
            var email = $('#inputEmail').val().trim();
            var pName = $('#inputPName').val().trim();
            var hTown = $('#inputHTown').val().trim();

            db.ref('users/' + user.uid).update({
                firstName: first,
                lastName: last,
                email: email,
                hTown: hTown,
                petName: pName
            });

            $('form').trigger('reset')
        });



        fileButton.on('change', e => {

            //GETS FILE SELECTED 
            var file = e.target.files[0];

            //CREATES NEW FILE READER
            var reader = new FileReader();
            reader.onloadend = function() {

                //TURNS FILE INTO BLOB
                var blob = new Blob([file], { type: "image/jpeg" });

                //PHOTO STORAGE LOCATION
                var storageRef = firebase.storage().ref(user.uid + '/' + file.name);
                console.warn(file);

                //UPLOADS FILE TO FIREBASE
                var uploadTask = storageRef.put(blob);

                //GETS NEWLY CREATED PHOTO URL
                storageRef.getDownloadURL().then(function(url) {
                    photoUrl = url


                    user.updateProfile({
                        photoURL: photoUrl
                    })

                })

            }

            //UPDATES USERS PROFILE WITH NEW PHOTO


            reader.onerror = function(e) {
                console.log("Failed file read: " + e.toString());
            };
            reader.readAsArrayBuffer(file);
        })

    });

});