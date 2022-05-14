gpid.controller('sasaran', function($scope,$http) {
    $scope.json = {};
    $scope.add = {
        idMisi: document.querySelector('[ng-model="add.idMisi"]').value,
        tujuan: {},
        dropdownTujuan: {},
        idTujuan: 0
    };
    $scope.edit = {
        idMisi: 0,
        tujuan: {},
        dropdownTujuan: {},
        idTujuan: undefined
    };
    $http.get(root + 'services/dropdown/' + surl[2] + '/' + $scope.controllerName ).then( function(e) {
        if ( e.status === 200 && e.data.status ) {
            $scope.json = e.data.data;
            $scope.add.tujuan = $scope.json[$scope.add.idMisi];
            $scope.add.dropdownTujuan = $scope.add.tujuan[0].id;
        }
    });
    
    $scope.modalEdit = function(row) {
        $scope.$apply(function() {
            console.log(row);
            console.log($scope);
            $scope.edit.idMisi = row.id_misi;
            $scope.edit.dropdownMisi = row.id_misi;
            $scope.edit.idTujuan = row.id_tujuan;
            $scope.edit.tujuan = $scope.json[row.id_misi];
            $scope.edit.dropdownTujuan = row.id_tujuan;
        });
    };
    
    $scope.$watch('add.dropdownMisi', function(value) {
        if ( value == undefined ) {
            $scope.add.dropdownMisi = $scope.add.idMisi;
        }
        if ( value !== undefined ) {
            $scope.add.idMisi = value;
            if ( $scope.json[value] !== undefined ) {
                $scope.add.tujuan = $scope.json[value];
                
                if ( $scope.json[value][0] !== undefined ) {
                    $scope.add.dropdownTujuan = $scope.json[value][0].id;
                }
            }
        }
    });
    
    $scope.$watch('add.dropdownTujuan', function(value) {
        if ( value !== undefined ) {
            $scope.add.idTujuan = value;
        }
    });
    
    $scope.$watch('edit.dropdownMisi', function(value) {
        if ( value === undefined ) {
            $scope.edit.dropdownMisi = $scope.edit.idMisi;
        }
        if ( value !== undefined ) {
            $scope.edit.idMisi = value;
        }
    });
    
    $scope.$watch('edit.dropdownTujuan', function(value) {
        if ( value === undefined ) {
            $scope.edit.dropdownTujuan = $scope.edit.idTujuan;
        }
        if ( value !== undefined ) {
            $scope.edit.idTujuan = value;
        }
    });
});