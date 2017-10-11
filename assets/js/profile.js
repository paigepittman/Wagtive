$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {

        var user = firebase.auth().currentUser;
        var fileButton = $("#file");
        var photoUrl;

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
                    photoUrl = url;
                    $('file').text(url);
                })

            }

            //UPDATES USERS PROFILE WITH NEW PHOTO


            reader.onerror = function(e) {
                console.log("Failed file read: " + e.toString());
            };
            reader.readAsArrayBuffer(file);
        })

        //UPDATE TEXT FIELDS

        $('#saveProfile').on('click', function(e) {
            e.preventDefault();

            var inputFirst = $('#inputFName').val().trim();
            var inputLast = $('#inputLName').val().trim();
            var inputEmail = $('#inputEmail').val().trim();
            var inputPName = $('#inputPName').val().trim();
            var inputHTown = $('#inputHTown').val().trim();

            db.ref('users/' + user.uid).on('value', function(snapshot) {
                first = snapshot.val().firstName;
                last = snapshot.val().lastName;
                email = snapshot.val().email;
                hTown = snapshot.val().hTown;
                pName = snapshot.val().petName;

                if (inputFirst !== ""){
                    first = inputFirst;
                }

                if (inputLast !== ""){
                    last = inputLast;
                }

                if (inputEmail !== ""){
                    email = inputEmail;
                    // user.updateEmail(email);
                }

                if (inputPName !== ""){
                    pName = inputPName;
                }

                if (inputHTown !== ""){
                    hTown = inputHTown;
                }

                db.ref('users/' + user.uid).update({
                firstName: first,
                lastName: last,
                email: email,
                hTown: hTown,
                petName: pName
            });

           

            console.log(photoUrl)

            user.updateProfile({
                photoURL: photoUrl
            })

            $('form').trigger('reset')

             })

            
        })

        });
    });


