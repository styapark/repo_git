var base = window.location.protocol + '//' + window.location.host + window.location.pathname;
var path = base.replace(root, '');
var surl = path.split('/');

if ( $ !== undefined ) {
    // pick color of colors theme
    var colorDarkGreen = $('.themes .btn-dark-green').css('background-color');
    //########################################################################//
    /// START FUNCTION #########################################################
    function notif_empty(ini) {
        var error = 0;
        var arr = $(ini).serializeArray();
        var regex = new RegExp(/<\/?[^>]+(>|$)/g);
        for (var i=0; i < arr.length; i++){
            var e = arr[i];
            var parent = $('[name="'+e.name+'"]').parents('.form-group');
            var label = $('[name="'+e.name+'"]').attr('placeholder');
            var dataRequired = $('[name="'+e.name+'"]').attr('data-required');
            var minLength = parseInt( $('[name="'+e.name+'"]').attr('minlength') );
            if ( label == undefined ) {
                label = parent.find('label').html();
                if ( regex.test(label) ) {
                    label = label.replace(/<\/?[^>]+(>|$)/g, "");
                }
            }
            console.log(e);
            if ( (e.value == "" || e.value == null) && dataRequired !== undefined ) {
                snarlWarning({
                    title: 'Form Kosong',
                    text: 'Kolom "' + label + '" tidak boleh kosong',
                    icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                    timeout: 3000
                });
                error++;
            }
            if ( e.value != "" && dataRequired !== undefined && minLength !== undefined && e.value.length < minLength ) {
                snarlWarning({
                    title: 'Minimal Karakter',
                    text: 'Kolom "' + label + '" kurang dari ' + minLength + ' karakter',
                    icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                    timeout: 3000
                });
                error++;
            }
        }
        return error;
    }
    function notif_delete(title, url, api, ajax, custom_url = null ) {
        var notification = snarlDanger({
            title: 'Are you sure ? ' + title,
            text: 'Ya, klik disini. Tidak, silakan klik silang',
            icon: '<i class="zmdi zmdi-help-outline"></i>',
            timeout: null,
            action: function(notification) {
                Snarl.removeNotification(notification);
                var urls = custom_url != null? custom_url + url: root + 'services/' + url;
                $.get(urls, function(e){
                    console.log( e );
                    if ( e.status ) {
                        snarlSuccess({
                            title: e.message,
                            text: 'Berhasil menghapus ' + title + ' dari database',
                            icon: '<i class="zmdi zmdi-shield-check"></i>',
                            timeout: 1500
                        });
                        if ( typeof ajax !== 'object' ) {
                            api.remove().draw(false);
                        }
                        ajax.reload();
                    }
                    else {
                        snarlDanger({
                            title: e.message,
                            text: 'Gagal menghapus,silakan ulangi',
                            icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                            timeout: 3000
                        });
                    }
                },'json');
            }
        }, 'delete');
    }
    function response_save(e,url) {
        if ( e.csrf ) {
            $('[name='+e.csrf.name+']').val(e.csrf.hash);
        }
        if ( e.status ) {
            snarlSuccess({
                title: 'Success',
                text: 'Berhasil menyimpan ke database',
                icon: '<i class="zmdi zmdi-shield-check"></i>',
                timeout: 1500
            });
            setTimeout(function(){
                window.location.href = url;
            }, 1600);
        }
        else {
            snarlDanger({
                title: 'Failed',
                text: 'Gagal menyimpan ke database. Ulangi kembali',
                icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                timeout: 3000
            });
        }
    }
    function btn_slidedown($p,$q) {
        var $main = $('#'+$p);
        $main.find('#'+$q+' button').on('click', function(){
            $main.find('#'+$q+' .collapse').collapse('toggle');
            var attr = $(this).attr('type');
            if ( attr == 'button' ) {
                setTimeout(function(){
                    $main.find('#'+$q+' [type=button]').attr('type','submit');
                },500);
            }
            if ( attr == 'submit' ) {
                if ( ['realisasi','pemantauan'].indexOf($p) !== -1 ) {
                    $('#'+$q).submit();
                }
                setTimeout(function(){
                    $main.find('#'+$q+' [type=submit]').attr('type','button');
                }, 500);
            }
        });
    }
    function add_dropup($p, $q, $dataType = 'text', $services = false, $custom_url = null) {
        var $main = $('#'+$p);
        var isSubmit = false;
        $main.find('#'+$q).submit(function(e){
            e.preventDefault();
            var data = $(this).serialize(), name = false, files = false;
            var formdata = new FormData(this);
            var url = root + 'api/'+ ( $services ? $services: $p+'/'+$q);
            if ( $custom_url != null ) {
                url = $custom_url + ( $services ? $services: $p+'/'+$q);
            }
            if ( $(this).find('[type=file]').length > 0 ) {
                name = $(this).find('[type=file]').attr('name');
                files = $(this).find('[type=file]').prop('files');
                console.log(files[0]);
                formdata.append(name, files[0]);
            }

            var error = notif_empty(this);
            console.log(url);

            isSubmit = true;
            if ( error == 0 ) {
                // reset
                $(this).trigger('reset');
                
                $.ajax({
                    url: url,
                    data: formdata,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(e) {
                        console.log(e);
                        if ( e.data == false ) {
                            snarlDanger({
                                title: 'Duplikat',
                                text: 'Periode Duplikat',
                                icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                                timeout: 3000
                            });
                        }
                        response_save(e, base);
                        isSubmit = false;
                    }
                });
            }
        });
    }
    function edit_popup($p, $q, $dataType = 'html', $services = false, custom_url = null){
        var $main = $('#'+$p);
        $main.find('#'+$q).submit(function(e){
            e.preventDefault();
            var data = $(this).serialize();
            $q = $q.replace('edit[name=','').replace(']','');
            var url = root + 'services/'+( $services ? $services: $p+'/'+$q )+'/' + data.split('&')[1].split('=')[1];
            if ( custom_url != null ) {
                url = custom_url + ( $services ? $services: $p+'/'+$q ) + '/' + data.split('&')[1].split('=')[1];
            }
            console.log(url);

            var error = notif_empty(this);

            // reset
            $(this).trigger('reset');
            // close modal
            $(this).modal('toggle');

            if ( error == 0 ) {
                $.post(url, data, function(e){
                    console.log(e);
                    response_save(e, base);
                },$dataType);
            }
        });
    }
    function create_popup($p, $q, $dataType = 'html', $services = false){
        var $main = $('#'+$p);
        $main.find('#create').submit(function(e){
            e.preventDefault();
            var data = $(this).serialize();
            var url = root + 'services/'+( $services ? $services: $p+'/'+$q )+'/' + data.split('&')[1].split('=')[1];

            var error = notif_empty(this);
            
            // reset
            $(this).trigger('reset');
            // close modal
            $(this).modal('toggle');

            if ( error == 0 ) {
                $.post(url, data, function(e){
                    console.log(e);
                    response_save(e, base);
                },$dataType);
            }
        });
    }
    function module_visi($p) {
        var main = $('#'+$p);
        var $q = 'visi';
        var q = $q;
        main.find('#'+$q).submit(function(e){
            e.preventDefault();
            var data = $(this).serialize();
            var url = root + 'services/'+$p+'/'+q;
            var error = 0;

            $(this).serializeArray().forEach(function(e){
                notif_empty(e, error);
            });

            if ( error == 0 ) {
                $.post(url, data, function(e){
                    console.log(e);
                    response_save(e,base);
                },'json');
            }
        });
    }
    function module_add_edit($p,$q) {
        btn_slidedown($p,$q);
        add_dropup($p,$q,'json');
        edit_popup($p,'edit[name='+$q+']','json');
    }
    function misi_sasaran_kebijakan($p) {
        // MISI
        var $q = 'misi';
        module_add_edit($p,$q);
        
        // TUJUAN
        var $q = 'tujuan';
        module_add_edit($p,$q);
        
        // SASARAN
        var $q = 'sasaran';
        module_add_edit($p,$q);
        
        // STRATEGI
        var $q = 'strategi';
        module_add_edit($p,$q);
        
        // KEBIJAKAN
        var $q = 'kebijakan';
        module_add_edit($p,$q);

        // INDIKATOR
        var $q = 'indikator';
        module_add_edit($p, $q);
        
        // PROGRAM PRIORITAS
        var $q = 'program-prioritas';
        module_add_edit($p,$q);
        
        // KEGIATAN PRIORITAS
        var $q = 'kegiatan-prioritas';
        module_add_edit($p,$q);
    }
    function module_btn_create_member_skpd($row,$m) {
        if ( $row.id !== undefined ) {
            $m.modal();
            var name = $row.name;
            var len = name.length;
            // escape last space
            if ( $row.name.substr(-1,1) == ' ' ) {
                name = $row.name.substr(len - 1);
            }
            var exp = $row.name.split(' ');
            var count = exp.length;
            var first = exp[0];
            var last = exp[1];
            var username = $row.code.replace(new RegExp(' ','g'),'');
            var email = username + '@' + root.replace(new RegExp('http://','g'),'').replace('/','');
            if ( count > 2 ) {
                first = exp[0] + ' ' + exp[1];
                last = [];
                for (var i=0; i < count; i++) {
                    if ( i >= 2 ) {
                        last.push(exp[i]);
                    }
                }
                last = last.join(' ');
            }
            
            $m.find('[name=id]').val( $row.id );
            $m.find('[name=username]').val( username );
            $m.find('[name=email]').val( email );
            $m.find('[name="name[first]"]').val( first );
            $m.find('[name="name[last]"]').val( last );
        }
        else {
            alert('ini adalah Master, tidak dapat dimanipulasi');
        }
    }
    function module_btn_edit_misi_sasaran_kebijakan($row,$m,$root) {
        if ( $row.id_visi !== undefined && $row.id !== undefined ) {
            var $split = $root.split('/');
            var $master = $root.replace($split[0]+'/','');
            
            $m.modal();
            $m.find('[name=id]').val( $row.id );
            $m.find('[name=indicator]').val( $row.indicator );
            $m.find('[name=name]').val( $row.name );
            if ( $split[0] !== 'rpjpd' ) {
                if ( ['misi'].indexOf($master) === -1 ) {
                    $m.find('[name=id_misi]').val( $row.id_misi );
                }
                if ( ['misi','tujuan','sasaran'].indexOf($master) === -1 ) {
                    $m.find('[name=id_sasaran]').val( $row.id_sasaran );
                }
                if ( ['misi','tujuan'].indexOf($master) === -1 ) {
                    $m.find('[name=id_tujuan]').val( $row.id_tujuan );
                    
                    var scope = angular.element('[ng-controller]').scope();
                    scope.modalEdit($row);
                }
                if ( ['sasaran'].indexOf($master) !== -1 ){
                    if ( $row.id_bidang !== null ) {
                        var decode = JSON.parse($row.id_bidang.replace(/\\/g,''));
                        $("[name=\"id_bidang[]\"]").multiSelect('deselect_all');
                        $("[name=\"id_bidang[]\"]").multiSelect('select', decode);
                    }
                }
            }
        }
        else {
            alert('ini adalah Master, tidak dapat dimanipulasi');
        }
    }
    function module_btn_delete_misi_sasaran_kebijakan($row,$name,$api,$ajax) {
        if ( $row.id_visi !== undefined ) {
            notif_delete('"' + $row.name + '"', $name + $row.id, $api, $ajax);
        }
        else {
            alert('ini adalah Master, tidak dapat dimanipulasi');
        }
    }
    function import_progress($id,$n) {
        var m = $('#import-progress');
        var url = root + 'power-admin/import/process/' + $n + '/' + $id;
        m.find('#'+$n).on('click', function() {
            var ini = $(this);
            var span = $('<span></span>').addClass('float-right');
            ini.after(span);
            ini.html('Proses');

            var Count = new countUp({
                onCountProgress: function(sec){ ini.parent().find('span').html(sec); },
                onCountEnd: function(){
                    ini.html('Selesai');
                    ini.removeClass('btn-outline-primary');
                    ini.addClass('btn-outline-warning');
                    ini.attr('disabled', true);
                }
            });
            Count.start();
            $.get(url, function(e) {
                console.log(e);
                Count.stop();
            },'json').fail(function(e){
                if ( e.status == 405 ) {
                    alert('Periode File tidak sesuai dengan Periode Import');
                    Count.stop();
                }
            });
        });
    }
    function last(array, n) {
        if (array == null) return void 0;
        if (n == null) return array[array.length - 1];
        return array.slice(Math.max(array.length - n, 0));
    };
    /// END FUNCTION ###########################################################
    //########################################################################//
    
    
    // click delay effect ######################################################
    $(document).ready(function(){
        $('a').on('click', function(e){
            e.preventDefault();
            var href = $(this).attr('href');
            if ( href !== undefined ) {
                if ( href.indexOf('#') === -1 && href !== 'javascript:void(0);' ) {
                    setTimeout(function(){
                        window.open( href, '_self');
                    },500);
                }
            }
        });
    });
    
    
    // Preloader ###############################################################
    $(document).ready(function(){
        setTimeout(function(){
            $('.preloader-cycle').fadeOut(500);
        },1500);
    });
    
    
    // LOGIN ###################################################################
    $(document).ready(function(){
        $('.login-box').submit(function(e){
            e.preventDefault();
            var parent = $(this);
            var data = $(this).serialize();
            var url = root + 'api/auth_login';
            var error = 0;
            parent.find('[type=submit]').prop('disabled', true);
            parent.find('[type=submit]').html('<img src="' + root + '_media/images/svg/fading lines transparent.svg" title="Loading" style="height: 16.8px; width: 16.8px">');

            $(this).serializeArray().forEach(function(e){
                var parent = $('[name='+e.name+']').parent();
                var label = parent.find('label').html();
                if ( !e.value ) {
                    snarlWarning({
                        title: 'Form Kosong',
                        text: 'Kolom "' + label + '" tidak boleh kosong',
                        icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                        timeout: 3000
                    });
                    error++;
                }
            });

            if ( error == 0 ) {
                $.post(url, data, function(e){
                    if ( e.csrf ) {
                        $('[name='+e.csrf.name+']').val(e.csrf.hash);
                    }
                    if ( e.status ) {
                        snarlSuccess({
                            title: 'Success',
                            text: 'Tunggu.. Sedang mengarahkan',
                            icon: '<i class="zmdi zmdi-shield-check"></i>',
                            timeout: 1500
                        });
                        setTimeout(function(){
                            window.location.href = root;
                        }, 1600);
                    }
                    else {
                        parent.find('[type=submit]').prop('disabled', false);
                        parent.find('[type=submit]').html('Login');
                        snarlDanger({
                            title: 'Failed',
                            text: 'Username dan Password anda tidak ditemukan',
                            icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                            timeout: 3000
                        });
                    }
                },'json').fail(function(e,status) {
                    parent.find('[type=submit]').prop('disabled', false);
                    parent.find('[type=submit]').html('Login');
                    snarlDanger({
                        title: 'Failed',
                        text: status,
                        icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                        timeout: 3000
                    });
                });
            }
            else {
                parent.find('[type=submit]').prop('disabled', false);
                parent.find('[type=submit]').html('Login');
            }
        });
        $('#logout').on('click', function(e){
            e.preventDefault();
            if ( $('.alert-login')[0] == undefined ) {
                var notification = snarlInfo({
                    title: 'Are you sure ?',
                    text: 'Ya, klik disini. Tidak, silakan klik silang',
                    icon: '<i class="zmdi zmdi-help-outline"></i>',
                    timeout: null,
                    action: function(notification) {
                        Snarl.removeNotification(notification);
                        var url = root + 'api/auth_logout';
                        $.get(url, function(e){
                            if ( e.status ) {
                                setTimeout(function(){
                                    window.location.href = root;
                                }, 500);
                            }
                        }, 'json');
                    }
                }, 'alert-login');
            }
        });
        $('.login-box').find('.zmdi').on('click', function(){
            var ini = $(this), parent = ini.parents('.input-group');
            if ( ini.is('.zmdi-eye') ) {
                ini.removeClass('zmdi-eye');
                ini.addClass('zmdi-eye-off');
                ini.css('color','red');
                parent.find('input').attr('type','text');
            }
            else if ( ini.is('.zmdi-eye-off') ) {
                ini.addClass('zmdi-eye');
                ini.removeClass('zmdi-eye-off');
                ini.css('color','inherit');
                parent.find('input').attr('type','password');
            }
        });
    });
    
    
    // Skin Color Selection ####################################################
    $(document).ready(function(){
        var skin = 'themes';
        $('.themes .btn').on('click', function(){
            $('.themes .btn').each(function(i,e){
                if ( $(e).attr('class').indexOf('set') !== -1 ) {
                    $(e).removeClass('set');
                    var x = $(e).attr('class').replace(/btn|set|waves-effect|waves-light| /gi,'');
                    $('body > .container-fluid').removeClass(function (index, className) {
                        return (className.match (/(^|\s)color-\S+/g) || []).join(' ');
                    });
                    if ( x !== 'dark-mood' ) {
                        $('body').removeClass( 'color' + x );
                    }
                }
            });
            $(this).addClass('set');
            var c = $(this).attr('class').replace(/btn|set|waves-effect|waves-light| /gi,'');
            setCookie(skin, 'color' + c, 365);
            $('body > .container-fluid').addClass( 'color' + c );
            if ( c === '-dark-mood' ) {
                $('body').addClass( 'color' + c );
            }
        });
    });
    
    
    // Scrollbar ###############################################################
    $(document).ready(function(){
        if ( $('.scrollbar')[0] ) {
            SimpleScrollbar.initEl( document.querySelector('.scrollbar') );
        }
    });
    
    
    // accordion / side-dropdown navigation ####################################
    $(document).ready(function(){
        $('.sidebar .side-dropdown a').on('click', function(){
            var parent = $(this).parent('.side-dropdown');
            $('ul li').each(function(){
                if ( $(this).is('.show') && !parent.is('.show')) {
                    $(this).removeClass('show');
                    $(this).find('.nav-link').removeClass('active');
                    $(this).find('.dropdown-menu').slideUp();
                }
            });
            if ( parent.attr('class') != '' ) {
                if ( parent.attr('class').indexOf('show') === -1 ) {
                    parent.addClass('show');
                    parent.find('.nav-link').addClass('active');
                    parent.find('.dropdown-menu').slideDown();
                }
                else if ( parent.attr('class').indexOf('show') !== -1 ) {
                    parent.removeClass('show');
                    parent.find('.nav-link').removeClass('active');
                    parent.find('.dropdown-menu').slideUp();
                }
            }
        });

        $('.sidebar ul.nav li').each(function(){
            var href = $(this).find('a.nav-link').attr('href');
            var sub = $(this).attr('data-sub');
            if ( path === '' && href == root ){
                $(this).find('.nav-link').addClass('active');
            }
            if ( [path,base].indexOf(href) !== -1 ){
                $(this).find('.nav-link').addClass('active');
            }
            if ( ['javascript:void(0);','#'].indexOf(href) !== -1 && $(this).is('.side-dropdown') && sub == surl[1] ){
                $(this).addClass('show');
                $(this).find('.nav-link').addClass('active');
                $(this).find('.dropdown-menu').slideDown();
                $(this).find('.dropdown-menu a').each(function(){
                    if ( base.indexOf( $(this).attr('href') ) == 0 ){
                        $(this).addClass('active');
                    }
                });
            }
        });
    });
    
    
    // Nav-pills ###############################################################
    $(document).ready(function(){
        $('.nav-pills .nav-link').each(function(){
            var href = $(this).attr('href');
            if ( [path,base].indexOf(href) !== -1 ){
                $(this).addClass('active');
            }
        });
    });

    // DASHBOARD ###############################################################
    $(document).ready(function(){
        var $p = 'dashboard';
        var main = $('#'+$p);
        btn_slidedown($p,'add');
        add_dropup($p,'add','json');
        if ( main.length > 0 ) {
            edit_popup($p,'edit','json','report/'+$p);

            main.find('[name=name]').on('keyup', function(e) {
                var parent = $(this).parent().parent();
                var val = $(this).val().toLowerCase().replace(/\s+/g,'');
                parent.find('[name=alias]').val( val );
            });
        }
    });
    $(document).ready(function(){
        var $p = 'git';
        var main = $('#'+$p);
        btn_slidedown($p,'add');
        if ( main.length > 0 ) {
            edit_popup($p,'edit','json','report/'+$p);
        }
    });
    $(document).ready(function(){
        var $p = 'keys';
        var main = $('#'+$p);
        btn_slidedown($p,'add');
        add_dropup($p,'add','json');
        if ( main.length > 0 ) {
            edit_popup($p,'edit','json','report/'+$p);
        }
    });

    // SAVE
    $(document).ready(function(){
        var $p = 'save';
        var main = $('#'+$p);
        if ( main.length > 0 ) {
            edit_popup($p,'edit','json','report/'+$p);
        }
    });
    
    // SETTINGS ################################################################
    // Setting > general
    $(document).ready(function(){
        $('[id*="settings-"]').find('form').submit(function(e){
            e.preventDefault();
            var data = $(this).serialize();
            var url = root + 'services/settings/setup';

            $.post(url, data, function(e){
                console.log(e);
                response_save(e, base);
            }, 'json');
        });
    });

    // Setting > account
    $(document).ready(function(){
        var $p = 'accounts';
        var main = $('#'+$p);
        btn_slidedown($p,'add');
        add_dropup($p,'add','json','settings/'+$p);
        edit_popup($p,'edit','json','settings/'+$p);
        
        // confirm password
        function confirm_password() {
            var parent = $(this).parent();
            var pass = $(this).parents('#update').find('[name=password]').val();
            var val = $(this).val();
            if ( pass !== val ) {
                parent.find('.form-bar').addClass('bg-danger');
            }
            if ( pass === val ) {
                parent.find('.form-bar').removeClass('bg-danger');
            }
        }
        $('#profile #update [name=confirm_password]').on('keyup', confirm_password);
        $('#change_password #update [name=confirm_password]').on('keyup', confirm_password);
        function update_password(e) {
            e.preventDefault();
            
            var parent = $(this);
            var data = $(this).serialize(), name = false, files = false;
            var formdata = new FormData(this);
            var url = root + 'services/settings/profile';

            var error = notif_empty(this);
            
            var pass = parent.find('[name=password]').val();
            var val = parent.find('[name=confirm_password]').val();
            if ( pass !== val ) {
                error = 1;
                snarlWarning({
                    title: 'Tidak Cocok',
                    text: 'Konfirmasi password tidak sesuai',
                    icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                    timeout: 3000
                });
            }

            if ( error == 0 ) {
                // reset
                $(this).trigger('reset');
                
                $.ajax({
                    url: url,
                    data: formdata,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(e) {
                        console.log(e);
                        if ( e.data == false ) {
                            snarlDanger({
                                title: 'Duplikat',
                                text: 'Periode Duplikat',
                                icon: '<i class="zmdi zmdi-alert-triangle"></i>',
                                timeout: 3000
                            });
                        }
                        response_save(e, base);
                    }
                });
            }
        };
        $('#profile #update').on('submit', update_password);
        $('#change_password #update').on('submit', update_password);
    });
    
    
    // DATATABLES ##############################################################
    window.datatables = { _table: {}, url: '', data: [] };
    $(document).ready(function(){
        var lang = root + '_media/js/dataTables.indonesian.lang';
        var src = $('#datatables').attr('data-src');
        var column = [], lengthMenu = [];
        var callback = $('#datatables').find('th[data-callback]').attr('data-callback');
        var ordering = $('#datatables').attr('data-ordering') !== undefined ? $('#datatables').attr('data-ordering'): true;
        var lengthMenus = $('#datatables').attr('data-lengthmenu') !== undefined ? $('#datatables').attr('data-lengthmenu').split(','): [ 10, 25, 50, 100 ];
        lengthMenus.forEach(function(value,index){
            lengthMenu[index] = parseInt(value);
        });
        $('#datatables').find('th[data-field]').each(function(i,e){
            var a = {};
            a['data'] = $(this).attr('data-field');
            column.push(a);
        });
        
        if ( src !== undefined ) {
            window.datatables._table = $('#datatables').dataTable({
                "lengthMenu": lengthMenu,
                "ordering": ordering,
                "ajax": src,
                "columns": column,
                "columnDefs": [
                    {
                        "orderable": false,
                        "targets": 0,
                        "className": "text-nowrap"
                    },
                    {
                        "targets": -1,
                        "className": "text-nowrap",
                        "data": "__callback",
                        "defaultContent": eval( callback )
                    }
                ],
                "createdRow": function( row, data, dataIndex){
                    window.datatables.data.push(data);
                    if ( data.status == 1 ) {
                        $(row).addClass('light-green lighten-5');
                    }
                }
            });
            window.datatables.url = window.datatables._table.api().ajax.url();
        }
        /* action */
        /* ON COMPLETE */
        if ( src !== undefined ) {
            window.datatables._table.on('xhr.dt', function ( e, settings, json, xhr ) {
                xhr.done(function(result) {
                    $('#datatables tbody tr').each(function() {
                        var row = window.datatables._table.api().row(this).data();
                        
                        if ( base.search('report/evaluasi') !== -1  ) {
                            $('.backdrop').remove();
                            $('.backdrop-text').remove();
                        }


//                        /* Setting *********************************************************/
//                        // accounts
//                        if ( base.search('settings/accounts') !== -1 ) {
//                            if ( [undefined,'0',null].indexOf(row.active) !== -1 ) {
//                                $(this).find('[title=Power] i').removeClass('zmdi-power green-text');
//                                $(this).find('[title=Power] i').addClass('zmdi-power-setting red-text');
//                            }
//                        }
                    });
                });
            });
        }
        /* ON Action Pagination */
        if ( src !== undefined ) {
            window.datatables._table.on('draw.dt', function ( e, settings, json ) {
                $('#datatables tbody tr').delay(500).each(function() {
                    var row = window.datatables._table.api().row(this).data();
                    if ( undefined === row ) return;

                    /* Setting *********************************************************/
                    // accounts
                    if ( base.search('settings/accounts') !== -1 ) {
                        if ( [undefined,'0',null].indexOf(row.active) !== -1 ) {
                            $(this).find('[title=Power] i').removeClass('zmdi-power green-text');
                            $(this).find('[title=Power] i').addClass('zmdi-power-setting red-text');
                        }
                    };
                });
            });
        }
        
        /* IN ACTIVE */
        $('#datatables tbody').on('click', 'label[title=Inactive]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            window.location = base + ( base.search('set') === -1 ? '/set/' + row.id: '');
        });
        /* POWER */
        $('#datatables tbody').on('click', 'span[title=Power]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            if ( base.search('settings/accounts') !== -1 ) {
                window.location = base + ( base.search('suspend') === -1 ? '/suspend/' + row.id: '');
            }
        });
        /* ASSIGN */
        $('#datatables tbody').on('click', 'span[title=Assign]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            if ( base.search('settings/accounts') !== -1 ) {
                window.location = base + ( base.search('assign') === -1 ? '/assign/' + row.id: '');
            }
        });
        /* CREATE */
        $('#datatables tbody').on('click', 'span[title=Create]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            var m = $('#create');
            if ( base.search('master/skpd') !== -1 || base.search('master/opd') !== -1 ) {
                module_btn_create_member_skpd(row,m);
            }
        });
        /* DETAIL */
        $('#datatables tbody').on('click', 'span[title=Detail]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            var m = $('#detail');
            var $master = base.replace(root + 'power-admin/master/','');
        });
            
        /* EDIT */
        $('#datatables tbody').on('click', 'span[title=Edit]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            var m = $('#edit');
            var $master = base.replace(root + 'power-admin/master/','');
            // Save
            if ( base.search('dashboard') !== -1 ) {
                if ( row.id !== undefined ) {
                    m.modal();
                    m.find('[name=id]').val( row.id );
                    m.find('[name=year]').val( row.year );
                    m.find('[name=form]').val( row.form_text );
                    m.find('[name=name]').val( row.name_text );
                    m.find('[name=title]').val( row.title );
                }
                else {
                    alert('ini adalah Master, tidak dapat dimanipulasi');
                }
            }
            
            /* Setting *********************************************************/
            // accounts
            if ( base.search('settings/accounts') !== -1 ) {
                if ( row.id !== undefined ) {
                    m.modal();
                    m.find('[name=id]').val( row.id );
                    m.find('[name=first_name]').val( row.first_name );
                    m.find('[name=last_name]').val( row.last_name );
                    m.find('[name=username]').val( row.username );
                    m.find('[name=email]').val( row.email );
                }
                else {
                    alert('Tidak dapat dimanipulasi');
                }
            }
        });
        /* DELETE */
        $('#datatables tbody').on('click', 'span[title=Delete]', function(){
            var parent = $(this).parents('tr');
            var api = window.datatables._table.api().row( parent );
            var ajaxs = window.datatables._table.api().ajax;
            var row = api.data();
            var name = $(this).parents('table').attr('name') + '/';

            /* Report *********************************************************/
            // save
            if ( base.search('report/save') !== -1 ) {
                if ( row.id !== undefined ) {
                    notif_delete('"' + row.name_text + ' - ' + row.title + '"', name + row.id, api, ajaxs, root + 'apis/');
                }
                else {
                    alert('ini adalah Master, tidak dapat dimanipulasi');
                }
            }

            /* Setting *********************************************************/
            // accounts
            if ( base.search('settings/accounts') !== -1 ) {
                if ( row.id !== undefined && row.group_id < 9 ) {
                    notif_delete('"' + row.fullname + '"', name + row.id, api);
                }
                else {
                    alert('Tidak dapat dimanipulasi');
                }
            }
            
        });

        /* EXPORT */
        $('#datatables tbody').on('click', 'span[title=Export]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            var m = $('#print');
            if ( base.search('report/save') !== -1 ) {
                window.location.href = root + 'power-admin/report/export/'+ row.id;
            }
        });

        /* PRINT */
        $('#datatables tbody').on('click', 'span[title=Print]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            var m = $('#print');
            if ( base.search('report/save') !== -1 ) {
                var url = root + 'power-admin/report/evaluasi/print/'+ row.form + '/' + row.id;
                var win = window.open(url, '_blank');
                win.focus();
            }
        });
        /* Import */
        $('#datatables tbody').on('click', 'span[title=Import]', function(){
            var row = window.datatables._table.api().row( $(this).parents('tr') ).data();
            var m = $('#import-progress');
            var status = JSON.parse(row.status);
            m.modal();
            m.find('.modal-title').find('i').html(row.name);
            if ( m.find('.list-group').find('li').length == 0 ) {
                for (var index in status) {
                    var a = $('<button></button>').addClass('btn btn-outline-primary btn-sm float-right').html('Mulai');
                    a.attr('id',index);
                    if ( status[index] == true ) {
                        a.attr('disabled',true);
                        a.html('Selesai');
                        a.removeClass('btn-outline-primary');
                        a.addClass('btn-outline-warning');
                    }
                    var li = $('<li></li>').html(index.toLocaleUpperCase()).append(a).css({'line-height': '42px'});
                    $('.list-group').append(li.addClass('list-group-item'));
                    import_progress(row.id,index);
                }
            }
        });
        $('#import-progress').on('hidden.bs.modal', function (e) {
            $(this).find('.modal-title').find('i').html('');
            if ( $(this).find('.list-group').find('li').length > 0 ) {
                $(this).find('.list-group').find('li').remove();
            }
        });
    });
}