$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
            if (user.emailVerified) {

                var uid = user.uid;
                var activities;
                var points;
                var nextLevel;

                db.ref('users/' + uid).once('value', snapshot => {

                    //FILLS OUT USERS PROFILE

                    var userFirst = snapshot.val().firstName;
                    var userLast = snapshot.val().lastName;
                    var email = snapshot.val().email;
                    var hTown = snapshot.val().hTown;
                    var petName = snapshot.val().petName;
                    points = snapshot.val().points;
                    activities = snapshot.val().activities;
                    var level;

                    if (points < 1000) {
                        level = "Puppy";
                        nextLevel = 1000;
                    } else if (points < 2000) {
                        level = "Lap Dog";
                        nextLevel = 2000;
                    } else if (points < 3000) {
                        level = "Tail Wagger";
                        nextLevel = 3000;
                    } else if (points < 4000) {
                        level = "Lively Pooch";
                        nextLevel = 4000;
                    } else if (points < 5000) {
                        level = "Sporty Hound";
                        nextLevel = 5000;
                    } else if (points > 5001) {
                        level = "Alpha Dog";
                    };

                    $('#nameSpan').text(userFirst + ' ' + userLast)
                    $('#level').text(' ' + level)
                    $('#points').text(' ' + points)

                    var progressPerct = ((points / nextLevel) * 100);


                    var bar1 = new ldBar("#progress", {
                        "stroke-width": 10,
                        "stroke": 'data:ldbar/res,gradient(0,1,#007A00,#00D700)',
                        "preset": 'circle'
                    });

                    var bar2 = document.getElementById('progress').ldBar;
                    bar1.set(progressPerct);




                })

                $('#profileImage').attr('src', user.photoURL);


                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '10/13/17',
                //             activityType: "Check-In",
                //             location: 'PetSmart' ,
                //             points: 100,
                //             distance: ""
                //         })
                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '10/09/17',
                //             activityType: "Check-In",
                //             location: 'North Hollywood Park' ,
                //             points: 100,
                //             distance: ""
                //         })
                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '10/01/17',
                //             activityType: "Check-In",
                //             location: 'Red Barn' ,
                //             points: 100,
                //             distance: ""
                //         })
                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '09/21/17',
                //             activityType: "Check-In",
                //             location: 'Lake Hollywood Park' ,
                //             points: 100,
                //             distance: ""
                //         })
                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '09/18/17',
                //             activityType: "Check-In",
                //             location: 'North Hollywood Park' ,
                //             points: 100,
                //             distance: ""
                //         })

                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '10/05/17',
                //             activityType: "Running",
                //             location: 'Los Angeles, CA' ,
                //             points: 32,
                //             distance: "1.3 miles"
                //         })
                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '10/10/17',
                //             activityType: "Running",
                //             location: 'Los Angeles, CA' ,
                //             points: 45,
                //             distance: "1.8 miles"
                //         })
                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '09/16/17',
                //             activityType: "Running",
                //             location: 'North Hollywood, CA' ,
                //             points: 19,
                //             distance: "0.8 miles"
                //         })
                //  db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '09/28/17',
                //             activityType: "Running",
                //             location: 'North Hollywood, CA' ,
                //             points: 28,
                //             distance: "1.1 miles"
                //         })
                //  db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '09/15/17',
                //             activityType: "Walking",
                //             location: 'North Hollywood, CA' ,
                //             points: 95,
                //             distance: "3.8 miles"
                //         })
                //  db.ref('users/' + uid + '/activities').push(
                //         {
                //             date: '09/07/17',
                //             activityType: "Walking",
                //             location: 'Los Angeles, CA' ,
                //             points: 58,
                //             distance: "2.3 miles"
                //         })




                var activityRef = db.ref('users/' + uid + '/activities');

                activityRef.orderByChild('date').limitToLast(10).on('child_added', function(snapshot) {
                    var newRow = $('<tr>')

                    var newDate = $('<td>').text(snapshot.val().date)
                    var newActivity = $('<td>').text(snapshot.val().activityType)
                    var newLocation = $('<td>').text(snapshot.val().location)
                    var newDistance = $('<td>').text(snapshot.val().distance)
                    var newPoints = $('<td>').text(snapshot.val().points)


                    newRow.append(newDate);
                    newRow.append(newActivity);
                    newRow.append(newLocation);
                    newRow.append(newDistance);
                    newRow.append(newPoints);


                    $('#activities').prepend(newRow);


                })

                var checkinRef = db.ref('users/' + uid + '/activities');

                checkinRef.orderByChild('date').limitToLast(10).on('child_added', function(snapshot) {
                    var newRow = $('<tr>')

                    var newDate = $('<td>').text(snapshot.val().date)
                    var newLocation = $('<td>').text(snapshot.val().location)
                    var newPoints = $('<td>').text(snapshot.val().points)

                    newRow.append(newDate);
                    newRow.append(newLocation);
                    newRow.append(newPoints);


                    $('#checkins').prepend(newRow);


                })





            } else {

                console.log("email not verified");
            }
        } else {

            //IF NOT LOGGED IN RETURN TO INDEX

            location.replace('index.html');
        }
    })

})