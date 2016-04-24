<!-- Modal 2-->
<div id="modal-2" class="modal fade" style="margin-top:9em;" role="dialog">
  <div id="loginModal" class="modal-dialog modal-sm">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header header" id ="popups">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" >Sign Up</h4>
		</div>
      <div id="loginModal" class="modal-body body">
        <form action="/accounts/soluRegistration.php?next=<?php echo $_SERVER['REQUEST_URI']; ?>" id = "signup" method="post">
					<input type = "text" name="firstname" id="firstname" placeholder="First name"><br>
					<input type = "text" name="lastname" id="lastname" placeholder="Last name"><br>
					<input type = "text" name="username" id="uname" placeholder="Username"><span id="availableMessage" class="availableMessage"></span><br>
					<input type = "password" name="password" id="pass1" placeholder="Password" onkeyup="checkPass(); return false;"><br>
					<input type = "password" name="confirmpassword" id="pass2" placeholder="Confirm Password" onkeyup="checkPass(); return false;"><br>
					<span id="confirmMessage" class="confirmMessage"></span><br>
                    <span id="invalidChars" class="availableMessage"></span>

      <div class="modal-footer footer">
      	<input type="submit" class="submit" name="submit" id="signupSubmit" value="Sign Up" disabled="disabled">
        <input type="button" class="cancel" data-dismiss="modal" value="Cancel">
      </div>
      </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal 3-->
<div id="modal-3" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header" id ="popups">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Change Password</h4>
            </div>
            <div class="modal-body">
                <form action="/accounts/changePass.php" method="post">
                    <input type = "password" name="oldPassword" id="oldPass" placeholder="Old Password"><br>
                    <input type = "password" id="newPass" name="newPassword" placeholder="New Password" onkeyup="checkPassChange()"><br>
                    <input type = "password" id="newPass2" placeholder="Confirm Password" onkeyup="checkPassChange()"><br>
                    <span id="confirmPass" class="confirmMessage"></span><br>
                    <div class="modal-footer">
                        <input type="submit" class="btn btn-success" name="submit" id="changePassSubmit" value="Change Password">
                        <input type="button" class="btn btn-primary" name="signup" data-dismiss="modal" value="Cancel">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    $('#uname').change(function checkUsername(){
        var $uname = $("#uname");
        var $message = $("#availableMessage");
        var $invalid = $("#invalidChars");
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
                    $invalid.text("Allowing: a-z, A-Z, 0-9 ONLY! All other characters will be removed!");
                    $('#signupSubmit').prop('disabled', false);
                }
            });
    });

    function checkPass(){
        var $pass2 = $("#pass2");
        var $message = $("#confirmMessage");
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        if($("#pass1").val() == $pass2.val() && $pass2.val() != ""){
            $pass2.css("backgroundColor", goodColor);
            $message.css("color", goodColor);
            $message.text("Passwords Match!");
            $("#signupSubmit").prop('disabled', false);
        }else{
            $pass2.css("backgroundColor", badColor);
            $message.css("color", badColor);
            $message.text("Passwords Do Not Match!");
            $("#signupSubmit").prop('disabled', true);
        }
    }

    function checkPassChange(){
        var $newPass2 = $("#newPass2");
        var $message = $("#confirmPass");
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        if($("#newPass").val() == $newPass2.val() && $newPass2.val() != ""){
            $newPass2.css("backgroundColor", goodColor);
            $message.css("color", goodColor);
            $message.text("Passwords Match!");
            $("#changePassSubmit").prop('disabled', false);
        }else{
            $newPass2.css("backgroundColor", badColor);
            $message.css("color", badColor);
            $message.text("Passwords Do Not Match!");
            $("#changePassSubmit").prop('disabled', true);
        }
    }
    $('form#signup input').each(function () {
        $(this).change(function(event){
            var first_name_value = $('input#firstname').val();
            var last_name_value = $('input#lastname').val();
            var username_value = $('input#uname').val();
            var password_one_value = $('input#pass1').val();
            var password_two_value = $('input#pass2').val();
            var submit_button = $('#signupSubmit');

            if(first_name_value && last_name_value && username_value && password_one_value && password_two_value){
                console.log("enabling button", username_value);
                submit_button.prop('disabled', false);
            }
            else{
                submit_button.prop('disabled', true);
            }
        });
    });
</script>