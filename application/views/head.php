<!DOCTYPE html>
<html ng-app="greenprojectid">
    <head>
        <script>
            <!--//--><![CDATA[//><!--
            function setCookie(cn,cv, x = 1) {var d= new Date();d.setTime(d.getTime()+(x*24*60*60*1000));document.cookie=cn+"="+cv+";expires="+d.toUTCString()+";path=/";}function deleteCookie(cn) {document.cookie=cn+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";}function getCookie(cn) {var n=cn+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1);}if(c.indexOf(n)==0){return c.substring(n.length,c.length);}}return "";}function checkCookie(cn) {var u=getCookie(cn);return u!="" && u!=null;}

            var root = '<?= MyLite_base ?>';
            var skin = 'themes';
            //--><!]]>
        </script>
        <meta name="geo.region" content="ID-JI" />
        <meta name="geo.placename" content="KANTOR INSPEKTORAT BAPPEDA TRENGGALEK" />
        <meta name="geo.position" content="-8.05056;111.70823" />
        <meta name="ICBM" content="-8.05056, 111.70823" />
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="robots" content="noindex,nofollow"/>
        <meta name="description" content="Web Application with MyLite cms concept"/>
        <title><?= $title ?></title>
        <base href="<?= MyLite_base ?>"/>
        <link rel="icon" href="_media/images/icon/pa.png">
        <link rel="stylesheet" href="_media/css/bootstrap.css"/>
        <link rel="stylesheet" href="_media/css/mdb.css"/>
        <link rel="stylesheet" href="_media/css/dataTables.bootstrap4.min.css"/>
        <link rel="stylesheet" href="_media/css/simple-scrollbar.css"/>
        <link rel="stylesheet" href="_media/css/material-design-iconic-font.css"/>
        <link rel="stylesheet" href="_media/css/snarl.css"/>
        <link rel="stylesheet" href="_media/css/multi-select.css"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="_media/css/style.css?_=<?= time() ?>"/>
        <script src="_media/js/jquery-3.3.1.min.js"></script>
        <script src="_media/js/angular.min.js"></script>
        <script src="_media/js/app.js"></script>
        <script src="_media/js/shim.min.js"></script>
    </head>
    <body>
        <div class="container-fluid">