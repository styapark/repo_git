
<!--Sidebar-->
<aside class="sidebar collapse" id="sidebar">
    <div class="scrollbar">
        <div class="user dropdown">
            <div class="user-info" data-toggle="dropdown">
                <div class="user-images">
                    <img src="_media/images/user1.png" class="img-responsive"/>
                </div>
                <div class="user-text">
                    <h6><?= $user_info->first_name.' '.$user_info->last_name ?></h6>
                    <span><?= $user_group->description ?></span>
                </div>
            </div>
            <div class="dropdown-menu">
                <a href="#" class="dropdown-item waves-effect" id="logout">Log Out</a>
            </div>
        </div>
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link waves-effect" href="/dashboard"><i class="zmdi zmdi-home"></i>Dashboard</a>
            </li>
            <!--li class="nav-item side-dropdown" data-sub="master">
                <a class="nav-link waves-effect" href="#"><i class="zmdi zmdi-memory"></i>Master</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item waves-effect">RPJPD</a>
                </div>
            </li-->
            <li class="nav-item">
                <a class="nav-link waves-effect" href="/keys"><i class="zmdi zmdi-key"></i>Keys</a>
            </li>
            <li class="nav-item">
                <a class="nav-link waves-effect" href="/sync"><i class="zmdi zmdi-refresh-sync"></i>Syncronize</a>
            </li>
        </ul>
    </div>
</aside>
<!--/.Sidebar-->