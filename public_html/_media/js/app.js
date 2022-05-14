var gpid = angular.module('greenprojectid',[]);
gpid.config(['$provide', function ($provide) {
    $provide.decorator('$controller', [ '$delegate', function ($delegate) {
        return function(constructor, locals) {
            if (typeof constructor == "string") {
                locals.$scope.controllerName =  constructor;
            }
            return $delegate.apply(this, [].slice.call(arguments));
        }
    }]);
}]);

var base = window.location.protocol + '//' + window.location.host + window.location.pathname;
var path = base.replace(root + 'power-admin/', '');
var surl = path.split('/');

function load( n ) {
    document.write('<script src="' + n + '"></script>');
}

if ( surl[0] === 'master' ) {
    if ( ['sasaran','strategi','kebijakan','indikator','program-prioritas'].indexOf(surl[2]) !== -1 ) {
        load( root + 'media/js/controller/' + surl[2] + '.js' );
    }
}