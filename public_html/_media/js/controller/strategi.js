gpid.controller('strategi', function($scope,$http) {
    $scope.json = {};
    $scope.add = {
        idMisi: document.querySelector('[ng-model="add.idMisi"]').value,
        tujuan: {},
        idTujuan: undefined,
        dropdownTujuan: {},
        sasaran: {},
        idSasaran: undefined,
        dropdownSasaran: {}
    };
    $scope.edit = {
        idMisi: 0,
        tujuan: {},
        idTujuan: undefined,
        dropdownTujuan: {},
        sasaran: {},
        idSasaran: undefined,
        dropdownSasaran: {}
    };
    $http.get(root + 'services/dropdown/' + surl[2] + '/' + $scope.controllerName ).then( function(e) {
        if ( e.status === 200 && e.data.status ) {
            $scope.json = e.data.data;
            $scope.add.tujuan = $scope.json[$scope.add.idMisi];
            $scope.add.dropdownTujuan = $scope.add.tujuan[0].id;
            $scope.add.sasaran = $scope.json[$scope.add.idMisi][0].data;
            $scope.add.dropdownSasaran = $scope.add.tujuan[0].data[0].id;
        }
    });
    
    $scope.modalEdit = function(row) {
        $scope.edit.idMisi = row.id_misi;
        $scope.edit.dropdownMisi = row.id_misi;
        $scope.edit.idTujuan = row.id_tujuan;
        $scope.edit.tujuan = $scope.json[row.id_misi];
        $scope.edit.dropdownTujuan = row.id_tujuan;
        
        $scope.edit.idSasaran = row.id_sasaran;
        if ( $scope.json[row.id_misi] !== undefined ) {
            // listing of tujuan
            for ( var indexTujuan in $scope.json[row.id_misi] ) {
                if ( $scope.json[row.id_misi][indexTujuan].id == row.id_tujuan ) {
                    $scope.edit.sasaran = $scope.json[row.id_misi][indexTujuan].data;
                    
                    if ( $scope.json[row.id_misi][indexTujuan].data !== undefined ) {
                        // listing of sasaran
                        for ( var indexSasaran in $scope.json[row.id_misi][indexTujuan].data ) {
                            if ( $scope.json[row.id_misi][indexTujuan].data[indexSasaran].id == row.id_sasaran ) {
                                $scope.edit.dropdownSasaran = $scope.json[row.id_misi][indexTujuan].data[indexSasaran].id;
                            }
                        }
                    }
                }
            }
        }
        $scope.$apply();
    };
    
    $scope.$watch('add.dropdownMisi', function(value) {
        if ( value == undefined ) {
            $scope.add.dropdownMisi = $scope.add.idMisi;
        }
        if ( value !== undefined ) {
            $scope.add.idMisi = value;
            if ( $scope.json[value] !== undefined ) {
                // update list dropdown tujuan
                $scope.add.tujuan = $scope.json[value];
                
                if ( $scope.json[value][0] !== undefined ) {
                    $scope.add.dropdownTujuan = $scope.json[value][0].id;
                    
                    if ( $scope.json[value] !== undefined ) {
                        // update list dropdown sasaran
                        $scope.add.sasaran = $scope.json[value][0].data;
                    }
                    $scope.add.idSasaran = $scope.json[value][0].data[0].id;
                    $scope.add.dropdownSasaran = $scope.add.idSasaran;
                }
            }
        }
    });
    
    $scope.$watch('add.dropdownTujuan', function(value) {
        if ( value !== undefined ) {
            $scope.add.idTujuan = value;
            var id_misi = $scope.add.idMisi;
            
            if ( $scope.json[id_misi] !== undefined ) {
                for ( var indexTujuan in $scope.json[id_misi] ) {
                    if ( $scope.json[id_misi][indexTujuan].id == value ) {
                        // update list dropdown sasaran
                        $scope.add.sasaran = $scope.json[id_misi][indexTujuan].data;
                        $scope.add.idSasaran = $scope.json[id_misi][indexTujuan].data[0].id;
                        $scope.add.dropdownSasaran = $scope.add.idSasaran;
                    }
                }
            }
        }
    });
    
    $scope.$watch('add.dropdownSasaran', function(value) {
        if ( value !== undefined ) {
            $scope.add.idSasaran = value;
        }
    });
    
    $scope.$watch('edit.dropdownMisi', function(value) {
        if ( value == undefined ) {
            $scope.edit.dropdownMisi = $scope.edit.idMisi;
        }
        if ( value !== undefined ) {
            $scope.edit.idMisi = value;
            if ( $scope.json[value] !== undefined ) {
                $scope.edit.tujuan = $scope.json[value];
                $scope.edit.dropdownTujuan = $scope.json[value][0].id;
            }
        }
    });
    
    $scope.$watch('edit.dropdownTujuan', function(value) {
        var id_misi = $scope.edit.idMisi;
        if ( value == undefined ) {
            $scope.edit.dropdownTujuan = $scope.edit.idTujuan;
        }
        if ( value !== undefined ) {
            $scope.edit.idTujuan = value;
            
            if ( $scope.json[id_misi] !== undefined ) {
                for ( var indexTujuan in $scope.json[id_misi] ) {
                    if ( $scope.json[id_misi][indexTujuan].id == value ) {
                        // update list dropdown sasaran
                        $scope.edit.sasaran = $scope.json[id_misi][indexTujuan].data;
                        $scope.edit.dropdownSasaran = $scope.json[id_misi][indexTujuan].data[0].id;
                    }
                }
            }
        }
    });
    
    $scope.$watch('edit.dropdownSasaran', function(value) {
        if ( value !== undefined ) {
            $scope.edit.idSasaran = value;
        }
    });
});