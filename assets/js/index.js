$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {
    	if (user) {
    		console.log(user)
    		// CHECK IF USER IS SIGNED IN
        	if (user.emailVerified) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
            	location.replace('../Wagtive/home.html');
        	} else {
        		$('#emailVerificationModal').toggle();
        		$('#closeEmailModal').on('click', function(){
        			location.reload();
        		})
        	}
    	}    
    })
})