<?php require_once APPPATH.'views/head.php'; ?>
<div class="col d-flex justify-content-center">
<form class="login-box align-self-center">
    <div class="card card-body">
        <div class="card-header text-center mb-4-5">
            <i class="zmdi zmdi-account-circle mt-2"></i>
            <br>
            <h6 class="mt-2">Hi there! Please Sign in</h6>
        </div>
        <div class="form-group md">
            <input class="form-control md" type="text" name="username" autocomplete="off">
            <label class="md-label">Username</label>
            <i class="form-bar"></i>
        </div>
        <div class="form-group md">
            <div class="input-group">
                <input class="form-control md" type="password" name="password" autocomplete="off">
                <label class="md-label">Password</label>
                <span class="input-group-append"><i class="zmdi zmdi-eye"></i></span>
                <i class="form-bar"></i>
            </div>
        </div>
        <div class="form-group md">
            <button type="submit" class="btn md" style="width: 106px">Login</button>
        </div>
        <div class="form-group text-right">
            Create by <a href="https://www.greenproject.id">Green Project ID</a><br>
            2016<?= date('Y') > 2016 ? ' - '.date('Y'):'' ?>
        </div>
    </div>
</form>
</div>
<?php require_once APPPATH.'views/foot.php'; ?>