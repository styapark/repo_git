/*
    Initial Native Javascript of MyLite Core Javascript
*/
/* 
    Created on : Nov 2, 2017, 10:31:01 PM
    Author     : styapark
*/


function empty(str){
    return (!str || 0 === str.length || str === 0);
}
function log(v){
    return window.console.log(v);
}
function date_timestamp(string, sparator = '-'){
    var split = string.split(sparator).reverse().join(sparator);
    return (new Date( split )).getTime() / 1000;
}
function timestamp_date(stamp, mode = 'en', sparator = '-'){
    var d = new Date( stamp * 1000 );
    if (mode === 'id'){
        return (d.getDate() <= 9 ? '0': '') + d.getDate() + sparator + ((d.getMonth()+1) <= 9 ? '0': '') + ( d.getMonth() + 1) + sparator + d.getFullYear();
    }
    return d.getFullYear() + sparator + ((d.getMonth()+1) <= 9 ? '0': '') + ( d.getMonth() + 1) + sparator + (d.getDate() <= 9 ? '0': '') + d.getDate();
}
function timestamp_datetime(stamp, mode = 'en', sparator = '-'){
    var d = new Date( stamp * 1000 );
    var time = (d.getHours() <= 9 ? '0': '') + d.getHours() + ':' + (d.getMinutes() <= 9 ? '0': '') + d.getMinutes() + ':' + (d.getSeconds() <= 9 ? '0': '') + d.getSeconds();
    if (mode === 'id'){
        return (d.getDate() <= 9 ? '0': '') + d.getDate() + sparator + ((d.getMonth()+1) <= 9 ? '0': '') + ( d.getMonth() + 1) + sparator + d.getFullYear() + ' ' + time;
    }
    return d.getFullYear() + sparator + ((d.getMonth()+1) <= 9 ? '0': '') + ( d.getMonth() + 1) + sparator + (d.getDate() <= 9 ? '0': '') + d.getDate() + ' ' + time;
}
function getInitMonthEN( int = 0 ) {
    var month = ['Jan','Feb','Mar','Apr','Mey','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return month[int];
}
function getInitMonthID( int = 0 ) {
    var month = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
    return month[int];
}
function getFullMonthEN( int = 0 ) {
    var month = ['Jan','Feb','Mar','Apr','Mey','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return month[int];
}
function getFullMonthID( int = 0 ) {
    var month = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return month[int];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
function numberFormat(n, c, d = ',', t = '.'){
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    var s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
function setCookie(cname, cvalue, exdays = 1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(cname) {
    var expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = cname + "=;" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(cname) {
    var user = getCookie(cname);
    return user != "" && user != null;
}
function convertTo(int) {
    var res = int;
    var unit = 'b';
    if ( int > 1024000000 ) {
        res = int / 1024000000;
        unit = 'Gb';
    }
    else if ( int > 1024000 ) {
        res = int / 1024000;
        unit = 'Mb';
    }
    else if ( int > 1024 ) {
        res = int / 1024;
        unit = 'Kb';
    }
    return (res).toFixed(2) + ' ' + unit;
}
function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}
function isString (value) {
    return typeof value === 'string' || value instanceof String;
}
function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
}
function isArray (value) {
    return value && typeof value === 'object' && value.constructor === Array;
}
function str2Number ( string_num ) {
    var exp = new RegExp('.','');
    return parseInt( exp.exec(string_num) );
}

/* start fullscreen */
function toggleFullScreen() {
    var elem = document.documentElement;
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
/* end fullscreen */

/* start action table */
// fontawesome
var startIcon = ['<div class=" text-center">'];
/*var iconConfirm = ['<span class="badge badge-primary" title="Confirm">','<i class="fa fa-check-square-o fa-1x"></i>','</span>'];
var iconEdit = ['<span class="badge info-color" title="Edit">','<i class="fa fa-edit fa-1x"></i>','</span>'];
var iconDetail = ['<span class="badge badge-success" title="Detail">','<i class="fa fa-list-ul fa-1x"></i>','</span>'];
var iconDelete = ['<span class="badge red lighten-2" title="Delete">','<i class="fa fa-trash-o fa-1x"></i>','</span>'];
var iconPrint = ['<span class="badge badge-default" title="Print">','<i class="fa fa-print fa-1x"></i>','</span>'];
var iconPDF = ['<span class="badge badge-default" title="PDF">','<i class="fa fa-file-pdf-o fa-1x"></i>','</span>'];
var iconSummary = ['<span class="badge grey lighten-3" title="Rekap">','<i class="fa fa-bar-chart fa-1x grey-text"></i>','</span>'];*/
var endIcon = ['</div>'];
// zmdi
var iconAssign = ['<span class="badge transparent" title="Assign">','<i class="zmdi zmdi-accounts-outline indigo-text"></i>','</span>'];
var iconConfirm = ['<span class="badge transparent" title="Confirm">','<i class="zmdi zmdi-check-square indigo-text"></i>','</span>'];
var iconEdit = ['<span class="badge transparent" title="Edit">','<i class="zmdi zmdi-edit light-blue-text"></i>','</span>'];
var iconExport = ['<span class="badge transparent" title="Export">','<i class="fa fa-file-excel-o green-text" style="width: 20px;height: 17px;margin-top: 2px; font-size: 14px"></i>','</span>'];
var iconDetail = ['<span class="badge transparent" title="Detail">','<i class="zmdi zmdi-format-list-bulleted green-text"></i>','</span>'];
var iconDelete = ['<span class="badge transparent" title="Delete">','<i class="zmdi zmdi-delete red-text"></i>','</span>'];
var iconImport = ['<span class="badge transparent" title="Import">','<i class="zmdi zmdi-upload blue-text"></i>','</span>'];
var iconHistory = ['<span class="badge transparent" title="Histories">','<i class="zmdi zmdi-format-indent-decrease green-text"></i>','</span>'];
var iconPower = ['<span class="badge transparent" title="Power">','<i class="zmdi zmdi-power green-text"></i>','</span>'];
var iconPrint = ['<span class="badge transparent" title="Print">','<i class="zmdi zmdi-print text-black-50"></i>','</span>'];
var iconPDF = ['<span class="badge transparent" title="PDF">','<i class="zmdi zmdi-collection-pdf text-black-50"></i>','</span>'];
var iconSummary = ['<span class="badge transparent" title="Rekap">','<i class="zmdi zmdi-chart text-black-50"></i>','</span>'];
var iconSync = ['<span class="badge transparent" title="Sync">','<i class="zmdi zmdi-refresh-sync text-black-50"></i>','</span>'];

function actionConfirm(value, row, index) {
    return startIcon.concat(iconConfirm,endIcon).join('');
}
var actionConfirm = startIcon.concat(iconConfirm,endIcon).join('');

function actionConfirmDetail(value, row, index) {
    return startIcon.concat(iconConfirm,iconDetail,endIcon).join('');
}
var actionConfirmDetail = startIcon.concat(iconConfirm,iconDetail,endIcon).join('');

function actionConfirmPrint(value, row, index) {
    return startIcon.concat(iconConfirm,iconPrint,endIcon).join('');
}
var actionConfirmPrint = startIcon.concat(iconConfirm,iconPrint,endIcon).join('');

function actionDelete(value, row, index) {
    return startIcon.concat(iconDelete,endIcon).join('');
}
var actionDelete = startIcon.concat(iconDelete,endIcon).join('');

function actionDeletePDF(value, row, index) {
    return startIcon.concat(iconDelete,iconPDF,endIcon).join('');
}
var actionDeletePDF = startIcon.concat(iconDelete,iconPDF,endIcon).join('');

function actionDetail(value, row, index) {
    return startIcon.concat(iconDetail,endIcon).join('');
}
var actionDetail = startIcon.concat(iconDetail,endIcon).join('');

function actionDetailDelete(value, row, index) {
    return startIcon.concat(iconDetail,iconDelete,endIcon).join('');
}
var actionDetailDelete = startIcon.concat(iconDetail,iconDelete,endIcon).join('');

function actionDetailEdit(value, row, index) {
    return startIcon.concat(iconDetail,iconEdit,endIcon).join('');
}
var actionDetailEdit = startIcon.concat(iconDetail,iconEdit,endIcon).join('');

function actionEditDeleteExportPrint(value, row, index) {
    return startIcon.concat(iconEdit,iconDelete,iconExport,iconPrint,endIcon).join('');
}
var actionEditDeleteExportPrint = startIcon.concat(iconEdit,iconDelete,iconExport,iconPrint,endIcon).join('');

function actionDetailPDF(value, row, index) {
    return startIcon.concat(iconDetail,iconPDF,endIcon).join('');
}
var actionDetailPDF = startIcon.concat(iconDetail,iconPDF,endIcon).join('');

function actionDetailPrint(value, row, index) {
    return startIcon.concat(iconDetail,iconPrint,endIcon).join('');
}
var actionDetailPrint = startIcon.concat(iconDetail,iconPrint,endIcon).join('');

function actionDetailSummary(value, row, index) {
    return startIcon.concat(iconDetail,iconSummary,endIcon).join('');
}
var actionDetailSummary = startIcon.concat(iconDetail,iconSummary,endIcon).join('');

function actionEdit(value, row, index) {
    return startIcon.concat(iconEdit,endIcon).join('');
}
var actionEdit = startIcon.concat(iconEdit,endIcon).join('');

function actionEditDelete(value, row, index) {
    return startIcon.concat(iconEdit,iconDelete,endIcon).join('');
}
var actionEditDelete = startIcon.concat(iconEdit,iconDelete,endIcon).join('');

function actionEditDeleteDetail(value, row, index) {
    return startIcon.concat(iconEdit,iconDelete,iconDetail,endIcon).join('');
}
var actionEditDeleteDetail = startIcon.concat(iconEdit,iconDelete,iconDetail,endIcon).join('');

function actionEditDeletePrint(value, row, index) {
    return startIcon.concat(iconEdit,iconDelete,iconPrint,endIcon).join('');
}
function actionEditPDF(value, row, index) {
    return startIcon.concat(iconEdit,iconPDF,endIcon).join('');
}
function actionEditDeletePDF(value, row, index) {
    return startIcon.concat(iconEdit,iconDelete,iconPDF,endIcon).join('');
}
function actionImportDelete(value, row, index) {
    return startIcon.concat(iconImport,iconDelete,endIcon).join('');
}
var actionImportDelete = startIcon.concat(iconImport,iconDelete,endIcon).join('');

function actionPowerEditDelete(value, row, index) {
    return startIcon.concat(iconPower,iconEdit,iconDelete,endIcon).join('');
}
var actionPowerEditDelete = startIcon.concat(iconPower,iconEdit,iconDelete,endIcon).join('');

function actionPowerAssignEditDelete(value, row, index) {
    return startIcon.concat(iconPower,iconAssign,iconEdit,iconDelete,endIcon).join('');
}
var actionPowerAssignEditDelete = startIcon.concat(iconPower,iconAssign,iconEdit,iconDelete,endIcon).join('');

function actionPrintDelete(value, row, index) {
    return startIcon.concat(iconPrint,iconDelete,endIcon).join('');
}
function actionHistoryEditSync(value, row, index) {
    return startIcon.concat(iconHistory,iconEdit,iconSync,endIcon).join('');
}
var actionHistoryEditSync = startIcon.concat(iconHistory,iconEdit,iconSync,endIcon).join('');
/* end action table */

function countUp(options) {
    var timer,
    seconds = options.seconds || 0,
    countProgress = options.onCountProgress || function () {},
    countEnd = options.onCountEnd || function () {};
    
    function decrementCounter() {
        countProgress(formatTime(seconds));
        seconds++;
    }
    
    function formatTime(sec){
        var hours = sec > 3599 ? Math.floor(sec / 60 / 60): 0;
        hours = hours < 10 ? '0' + hours: hours;
        var minutes = sec > 59 ? Math.floor(sec / 60 % 60): 0;
        minutes = minutes < 10 ? '0' + minutes: minutes;
        var seconds = (sec % 60) < 60 ? Math.floor(sec % 60): 0;
        seconds = seconds < 10 ? '0' + seconds: seconds;
        return hours + ':' + minutes + ':' + seconds;
    }
    
    this.start = function () {
        clearInterval(timer);
        countProgress(formatTime(seconds));
        seconds++;
        timer = 0;
        timer = setInterval(decrementCounter, 1000);
    };
    
    this.stop = function () {
        countProgress(formatTime(seconds));
        countEnd();
        clearInterval(timer);
    };
}