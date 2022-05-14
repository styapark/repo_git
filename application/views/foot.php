
        </div>
        <script>
        <!--//--><![CDATA[//><!--
            if ( !checkCookie(skin) ) { setCookie(skin, 'color-primary', 365); }
            var o = getCookie(skin).replace('color','');
            document.querySelector('body > .container-fluid').className = 'container-fluid color' + o;
            if ( o == '-dark-mood' ) {
                document.querySelector('body').className = 'color' + o;
            }
            document.querySelectorAll('.themes .btn').forEach(function(v,i){
                if ( v.className.search(o) !== -1 ) {
                    var cn = document.querySelector('.themes .btn'+o).className;
                    document.querySelector('.themes .btn'+o).className = cn + ' set';
                }
            });
            var fs = getCookie('fullscreen');
            if ( fs ) { 
            }
        //--><!]]>
        </script>
        <script src="_media/js/popper.min.js"></script>
        <script src="_media/js/bootstrap.js"></script>
        <script src="_media/js/mdb.js"></script>
        <script src="_media/js/jquery.dataTables.min.js"></script>
        <script src="_media/js/dataTables.bootstrap4.min.js"></script>
        <script src="_media/js/snarl.js"></script>
        <script src="_media/js/simple-scrollbar.js"></script>
        <script src="_media/js/jquery.multi-select.js"></script>
        <script src="_media/js/countUp.js"></script>
        <script src="_media/js/countup-jquery.js"></script>
        <script src="_media/js/jquery.mask.min.js"></script>
        <script src="_media/js/mylite.init.native.js?_=20220214"></script>
        <script src="_media/js/mylite.init.jquery.js"></script>
        <script src="_media/js/javascript.js?_=20220214"></script>
    </body>
</html>
