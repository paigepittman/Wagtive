$(document).ready(function(){
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

	$("#signIn").on("click", function(event){
		event.preventDefault();
	})
})