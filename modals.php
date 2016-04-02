<!-- Modal 1-->
<div id="modal-1" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" id ="popups">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Log In</h4>
      </div>
      <div class="modal-body">
        <form action="/accounts/login.php?next=<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">
					<input type = "text" name="username" id="textbox" placeholder="Username"><br>
					<input type = "password" name="password"  id="textbox" placeholder="Password"><br>
      <div class="modal-footer">
      	<input type="submit" class="btn btn-primary" name="submit" value="Log In">
        <input type="button" class="btn" name="signup" data-dismiss="modal" aria-hidden="true" value="Cancel">
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal 2-->
<div id="modal-2" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header" id ="popups">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" >Sign Up</h4>
		</div>
      <div class="modal-body">
        <form action="/accounts/soluRegistration.php?next=<?php echo $_SERVER['REQUEST_URI']; ?>" id = "signup" method="post">
					<input type = "text" name="firstname" id="textbox" placeholder="First name"><br>
					<input type = "text" name="lastname" id="textbox" placeholder="Last name"><br>
					<input type = "text" name="username" id="uname" placeholder="Username" onkeyup="checkUsername()";><span id="availableMessage" class="availableMessage"></span><br>
					<input type = "password" name="password" id="pass1" placeholder="Password" onkeyup="checkPass(); return false;"><br>
					<input type = "password" name="confirmpassword" id="pass2" placeholder="Confirm Password" onkeyup="checkPass(); return false;"><br>
					<span id="confirmMessage" class="confirmMessage"></span><br>

      <div class="modal-footer">
      	<input type="submit" class="btn btn-primary" name="submit" id="signupSubmit" value="Sign Up">
        <input type="button" data-dismiss="modal" aria-hidden="true" class="btn" value="Cancel">
      </div>
      </form>
      </div>
    </div>
  </div>
</div>
