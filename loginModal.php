<link rel="stylesheet" type="text/css" href="/shared-content/AccountModalStyle.css">

<!-- Modal 1-->
<div id="modal-1" class="modal fade" style="margin-top:9em;" role="dialog">
    <div class="modal-dialog modal-sm">
        <!-- Modal content-->
        <div id="loginModal" class="modal-content window">
            <div class=" header modal-header" id ="popups">
                <button type="button" class="exit close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Log In</h4>
            </div>
            <div  class="modal-body body">
                <form action="/accounts/login.php?next=<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">
                    <input type = "text" name="username" id="textbox" placeholder="Username"><br>
                    <input type = "password" name="password"  id="textbox" placeholder="Password"><br>
                    <div class="modal-footer">
                        <input type="submit" class="submit" name="submit" value="Log In">
                        <input type="button" class="cancel" name="signup" data-dismiss="modal" value="Cancel">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
