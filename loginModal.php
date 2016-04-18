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
                <form action="/accounts/login.php?next=<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">
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
