<script>
function checkUsername(){
			var $uname = $("#uname");
			var $message = $("#availableMessage");
			var goodColor = "#66cc66";
			var badColor = "#ff6666";
			$.post( "accounts/CheckUnameAvailability.php", { uname: $uname.val()})
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
			var $pass2 = $("#pass2");
			var $message = $("#confirmMessage");
			var goodColor = "#66cc66";
			var badColor = "#ff6666";
			if($("#pass1").val() == $pass2.val() && $pass2.val() != ""){
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
</script>
<!-- Modal 1-->
<div id="modal-1" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" id ="popups">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Log In</h4>
      </div>
      <div class="modal-body">
        <form action="./accounts/login.php" method="post">
					<input type = "text" name="username" id="textbox" placeholder="Username"><br>
					<input type = "password" name="password"  id="textbox" placeholder="Password"><br>
      <div class="modal-footer">
      	<input type="submit" class="btn btn-success" name="submit" value="Log In">
        <input type="button" class="btn btn-primary" name="signup" data-dismiss="modal" value="Cancel">
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal 2-->
<div id="modal-2" class="modal fade" role="dialog">
  <div class="modal-dialog modal-sm">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" id ="popups">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" >Sign Up</h4>
		</div>
      <div class="modal-body">
        <form action="./accounts/soluRegistration.php" id = "signup" method="post">
					<input type = "text" name="firstname" id="textbox" placeholder="First name"><br>
					<input type = "text" name="lastname" id="textbox" placeholder="Last name"><br>
					<input type = "text" name="username" id="uname" placeholder="Username" onkeyup="checkUsername()";><span id="availableMessage" class="availableMessage"></span><br>
					<input type = "password" name="password" id="pass1" placeholder="Password" onkeyup="checkPass(); return false;"><br>
					<input type = "password" name="confirmpassword" id="pass2" placeholder="Confirm Password" onkeyup="checkPass(); return false;"><br>
					<span id="confirmMessage" class="confirmMessage"></span><br>

      <div class="modal-footer">
      	<input type="submit" class="btn btn-success" name="submit" id="signupSubmit" value="Sign Up">
        <input type="button" class="btn btn-primary" data-dismiss="modal" value="Cancel">
      </div>
      </form>
      </div>
    </div>
  </div>
</div>
