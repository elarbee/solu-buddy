function checkUsername(){
	var $uname = $("#uname");
	var $message = $("#availableMessage");
	var goodColor = "#66cc66";
	var badColor = "#ff6666";
	$.post( "/accounts/CheckUnameAvailability.php", { uname: $uname.val()})
		.done(function( data ) {
			if(data == 0){
				$uname.css("backgroundColor", badColor);
				$message.css("color", badColor);
				$message.text("Not Available");
				$('#signupSubmit').prop('disabled', true);
			}
			else {
				$uname.css("backgroundColor", goodColor);
				$message.css("color", goodColor);
				$message.text("Available");
				$('#signupSubmit').prop('disabled', false);
			}
		});
}

function checkPass(){
	var $pass = $("#pass1");
	if(preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{5,25}$/', $pass)) {
		 $pass.css("backgroundColor", badColor);
		 $message.css("color", badColor);
		 $message.text("Invalid Password Format!");
	}
	var $pass2 = $("#pass2");
	var $message = $("#confirmMessage");
	var goodColor = "#66cc66";
	var badColor = "#ff6666";
	if($pass.val() == $pass2.val() && $pass2.val() != ""){
		$pass2.css("backgroundColor", goodColor);
		$message.css("color", goodColor);
		$message.text("Passwords Match!");
		$('#signupSubmit').prop('disabled', false);
	}else{
		$pass2.css("backgroundColor", badColor);
		$message.css("color", badColor);
		$message.text("Passwords Do Not Match!");
		$('#signupSubmit').prop('disabled', true);
	}
}
