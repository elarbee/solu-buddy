<header>	
<nav class="navbar navbar-inverse">
<a href="/" class="pull-left"><img src="/static/images/logoWhite.png" style="height:60px;margin: 10px;"></a>
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
		<!--Creates rest of navbar dynamically by passing in variables from hash table-->
		<li> <a href="/accounts/solutionsTable.php"><?= htmlspecialchars($navField2) ?></a></li>
        <li> <a href="/accounts/sendEmail.php">Leave Feedback</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
          <li class="logged-message">
              Welcome, <?= $_SESSION['username'] ?>
          </li>
          <li>
              <form action="/accounts/logOut.php" method="post">
                  <button type="submit" id = "btn-log" class="btn btn-danger">Log Out</button>
              </form>
          </li>
          <li>
              <button type="submit" id = "btn-changePass" class="btn btn-info" data-toggle="modal" data-target="#modal-3">Change Password</button>
          </li>
      </ul>
    </div>
  </div>
</nav>
</header>


