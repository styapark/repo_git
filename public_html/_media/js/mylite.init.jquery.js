/*
    Initial jQuery Javascript of MyLite Core Javascript
*/
/* 
    Created on : Nov 2, 2017, 10:31:01 PM
    Author     : styapark
*/


/* start snarl custom */
if ( Snarl !== undefined ) {
    function snarlDanger( e, id = null ) {
        var html = '<div class="snarl-notification danger-color waves-effect waves-light ' + (id !== null ? id: '') + '"><div class="snarl-icon"></div><h3 class="snarl-title"></h3><p class="snarl-text"></p><div class="snarl-close waves-effect"><svg class="snarl-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M49.5,5c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S74.4,5,49.5,5z M71.3,65.2c0.3,0.3,0.5,0.7,0.5,1.1   s-0.2,0.8-0.5,1.1L67,71.8c-0.3,0.3-0.7,0.5-1.1,0.5s-0.8-0.2-1.1-0.5L49.5,56.6L34.4,71.8c-0.3,0.3-0.7,0.5-1.1,0.5   c-0.4,0-0.8-0.2-1.1-0.5l-4.3-4.4c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.4,0.2-0.8,0.5-1.1L43,49.9L27.8,34.9c-0.6-0.6-0.6-1.6,0-2.3   l4.3-4.4c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5l15.2,15l15.2-15c0.3-0.3,0.7-0.5,1.1-0.5s0.8,0.2,1.1,0.5l4.3,4.4   c0.6,0.6,0.6,1.6,0,2.3L56.1,49.9L71.3,65.2z"/></g></svg></div></div>';
        Snarl.setNotificationHTML( html );
        return Snarl.addNotification( e );
    }
    function snarlDefault( e, id = null ) {
        var html = '<div class="snarl-notification waves-effect ' + (id !== null ? id: '') + '"><div class="snarl-icon"></div><h3 class="snarl-title"></h3><p class="snarl-text"></p><div class="snarl-close waves-effect"><svg class="snarl-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M49.5,5c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S74.4,5,49.5,5z M71.3,65.2c0.3,0.3,0.5,0.7,0.5,1.1   s-0.2,0.8-0.5,1.1L67,71.8c-0.3,0.3-0.7,0.5-1.1,0.5s-0.8-0.2-1.1-0.5L49.5,56.6L34.4,71.8c-0.3,0.3-0.7,0.5-1.1,0.5   c-0.4,0-0.8-0.2-1.1-0.5l-4.3-4.4c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.4,0.2-0.8,0.5-1.1L43,49.9L27.8,34.9c-0.6-0.6-0.6-1.6,0-2.3   l4.3-4.4c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5l15.2,15l15.2-15c0.3-0.3,0.7-0.5,1.1-0.5s0.8,0.2,1.1,0.5l4.3,4.4   c0.6,0.6,0.6,1.6,0,2.3L56.1,49.9L71.3,65.2z"/></g></svg></div></div>';
        Snarl.setNotificationHTML( html );
        return Snarl.addNotification( e );
    }
    function snarlInfo( e, id = null ) {
        var html = '<div class="snarl-notification info-color waves-effect waves-light ' + (id !== null ? id: '') + '"><div class="snarl-icon"></div><h3 class="snarl-title"></h3><p class="snarl-text"></p><div class="snarl-close waves-effect"><svg class="snarl-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M49.5,5c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S74.4,5,49.5,5z M71.3,65.2c0.3,0.3,0.5,0.7,0.5,1.1   s-0.2,0.8-0.5,1.1L67,71.8c-0.3,0.3-0.7,0.5-1.1,0.5s-0.8-0.2-1.1-0.5L49.5,56.6L34.4,71.8c-0.3,0.3-0.7,0.5-1.1,0.5   c-0.4,0-0.8-0.2-1.1-0.5l-4.3-4.4c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.4,0.2-0.8,0.5-1.1L43,49.9L27.8,34.9c-0.6-0.6-0.6-1.6,0-2.3   l4.3-4.4c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5l15.2,15l15.2-15c0.3-0.3,0.7-0.5,1.1-0.5s0.8,0.2,1.1,0.5l4.3,4.4   c0.6,0.6,0.6,1.6,0,2.3L56.1,49.9L71.3,65.2z"/></g></svg></div></div>';
        Snarl.setNotificationHTML( html );
        return Snarl.addNotification( e );
    }
    function snarlSuccess( e, id = null ) {
        var html = '<div class="snarl-notification success-color waves-effect waves-light ' + (id !== null ? id: '') + '"><div class="snarl-icon"></div><h3 class="snarl-title"></h3><p class="snarl-text"></p><div class="snarl-close waves-effect"><svg class="snarl-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M49.5,5c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S74.4,5,49.5,5z M71.3,65.2c0.3,0.3,0.5,0.7,0.5,1.1   s-0.2,0.8-0.5,1.1L67,71.8c-0.3,0.3-0.7,0.5-1.1,0.5s-0.8-0.2-1.1-0.5L49.5,56.6L34.4,71.8c-0.3,0.3-0.7,0.5-1.1,0.5   c-0.4,0-0.8-0.2-1.1-0.5l-4.3-4.4c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.4,0.2-0.8,0.5-1.1L43,49.9L27.8,34.9c-0.6-0.6-0.6-1.6,0-2.3   l4.3-4.4c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5l15.2,15l15.2-15c0.3-0.3,0.7-0.5,1.1-0.5s0.8,0.2,1.1,0.5l4.3,4.4   c0.6,0.6,0.6,1.6,0,2.3L56.1,49.9L71.3,65.2z"/></g></svg></div></div>';
        Snarl.setNotificationHTML( html );
        return Snarl.addNotification( e );
    }
    function snarlWarning( e, id = null ) {
        var html = '<div class="snarl-notification warning-color waves-effect waves-light ' + (id !== null ? id: '') + '"><div class="snarl-icon"></div><h3 class="snarl-title"></h3><p class="snarl-text"></p><div class="snarl-close waves-effect"><svg class="snarl-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M49.5,5c-24.9,0-45,20.1-45,45s20.1,45,45,45s45-20.1,45-45S74.4,5,49.5,5z M71.3,65.2c0.3,0.3,0.5,0.7,0.5,1.1   s-0.2,0.8-0.5,1.1L67,71.8c-0.3,0.3-0.7,0.5-1.1,0.5s-0.8-0.2-1.1-0.5L49.5,56.6L34.4,71.8c-0.3,0.3-0.7,0.5-1.1,0.5   c-0.4,0-0.8-0.2-1.1-0.5l-4.3-4.4c-0.3-0.3-0.5-0.7-0.5-1.1c0-0.4,0.2-0.8,0.5-1.1L43,49.9L27.8,34.9c-0.6-0.6-0.6-1.6,0-2.3   l4.3-4.4c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5l15.2,15l15.2-15c0.3-0.3,0.7-0.5,1.1-0.5s0.8,0.2,1.1,0.5l4.3,4.4   c0.6,0.6,0.6,1.6,0,2.3L56.1,49.9L71.3,65.2z"/></g></svg></div></div>';
        Snarl.setNotificationHTML( html );
        return Snarl.addNotification( e );
    }
}
/* end snarl custom */

if ( $ !== undefined ) {
    function checktelephone(x,e){
        var p = $(x).parent();
        var v = $(x).val();
        if (v.length < 9){
            p.removeClass('has-success');
            p.addClass('has-error');
        }
        else if (v.length >= 9){
            p.removeClass('has-error');
            p.addClass('has-success');
        }
        if (v.length >= 13){
            e.preventDefault();
        }
    }
    
    /* start initial */
    function dataNumber() {
        $('input[data-number]').on('keyup keypress', function(e) {
            var keyarr = [46,48,49,50,51,52,53,54,55,56,57];
            var keyCode = e.keyCode || e.which;
            if (jQuery.inArray(keyCode,keyarr) === -1) { 
                e.preventDefault();
                return false;
            }
        });
    }
    $(document).ready(function(){
        $('[data-tooltip="true"]').tooltip();
        dataNumber();
        $('input[maxlength]').on('keyup keypress', function(e) {
            var max = $(this).attr('maxlength');
            if ($(this).val().length >= max) { 
                e.preventDefault();
                return false;
            }
        });
        $('input[data-parsley-maxlength]').on('keyup keypress', function(e) {
            var max = $(this).attr('data-parsley-maxlength');
            if ($(this).val().length >= max) { 
                e.preventDefault();
                return false;
            }
        });
        $('a[title=Refresh]').on('click',function(){
            $(this).find('.fa').addClass('fa-spin');
            window.location.reload();
        });
        $('a[data-original-title=Refresh]').on('click',function(){
            $(this).find('.fa').addClass('fa-spin');
            window.location.reload();
        });
    });
    /* end initial */
}

window.geTemplate = null;
jQuery.fn.extend({
    animateNumber: function (option) {
        var text = $(this).text();
        let origin = $(this).attr('data-origin');
        var defaultOpt = {
            duration: 4000,
            easing: 'swing'
        };
        if ( defaultOpt.step == undefined ) {
            defaultOpt.step = function (now) {
                $(this).text( Math.ceil( now ) );
            };
        }
        var opt  = isObject(option) ? opt : defaultOpt;
        $(this).prop('Counter',0).animate({
            Counter: text
        }, opt );
    },
    eachTemplate: function ( data, count, option ) {
        var parent = $(this);
        var findAT = new RegExp(/\${(.*)}/, 'g');
        var geTemplate = window.geTemplate;
        if ( window.geTemplate === null ) {
            window.geTemplate = geTemplate = parent.find('li').html();
        }
        var uniqueKey = [], uniques = [];
        while ( (row = findAT.exec( geTemplate ) ) !== null ) {
            if ( uniqueKey.indexOf( row[0] ) === -1 ) {
                var lg = uniqueKey.length;
                uniqueKey.push( row[0] );
                uniques[lg] = row;
            }
        }
//        console.log( uniques );

        parent.find('li').remove();

        for ( var index in data ) {
            var row = data[index];
            var result = geTemplate;
            for ( var id = 0; id < uniqueKey.length; id++ ) {
                if ( uniques[id][0] == uniqueKey[id] ) {
                    result = result.split( uniques[id][0] ).join( row[uniques[id][1]] ? row[uniques[id][1]]: '' );
                }
            }
            parent.append( '<li class="' + ( count > 1? 'underline': '' ) + '">' + result + '</li>' );
        }
        
        var getInput = parent.find('[name]');
        for ( var i in getInput ) {
            if ( !isNaN(i) ) {
                var name = getInput[i].name;
                var pureName = name.split('[')[0];

                for ( var index in data ) {
                    var row = data[index];
                    parent.find('[name='+pureName+'\\['+row.index+'\\]]').val( row[pureName] );
                }
            }
        }
    }
});