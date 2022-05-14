gpid.controller('indikator', function($scope,$http) {
    $scope.json = {};
    $scope.add = {
        idMisi: document.querySelector('[ng-model="add.idMisi"]').value,
        tujuan: {},
        idTujuan: undefined,
        dropdownTujuan: undefined,
        sasaran: {},
        idSasaran: undefined,
        dropdownSasaran: undefined,
        strategi: {},
        idStrategi: undefined,
        dropdownStrategi: undefined,
        kebijakan: {},
        idKebijakan: undefined,
        dropdownKebijakan: undefined
    };
    $scope.edit = {
        idMisi: 0,
        tujuan: {},
        idTujuan: undefined,
        dropdownTujuan: undefined,
        sasaran: {},
        idSasaran: undefined,
        dropdownSasaran: undefined,
        strategi: {},
        idStrategi: undefined,
        dropdownStrategi: undefined,
        kebijakan: {},
        idKebijakan: undefined,
        dropdownKebijakan: undefined
    };
    $http.get(root + 'services/dropdown/' + surl[2] + '/' + $scope.controllerName ).then( function(e) {
        if ( e.status === 200 && e.data.status ) {
            $scope.json = e.data.data;
            $scope.add.tujuan = $scope.json[$scope.add.idMisi];
            $scope.add.dropdownTujuan = $scope.add.tujuan[0].id;
            $scope.add.sasaran = $scope.json[$scope.add.idMisi][0].data;
            $scope.add.dropdownSasaran = $scope.add.tujuan[0].data[0].id;
            $scope.add.strategi = $scope.json[$scope.add.idMisi][0].data[0].data;
            $scope.add.dropdownStrategi = $scope.add.tujuan[0].data[0].data[0].id;
            $scope.add.kebijakan = $scope.json[$scope.add.idMisi][0].data[0].data[0].data;
            $scope.add.dropdownKebijakan = $scope.add.tujuan[0].data[0].data[0].data[0].id;
        }
    });
    
    $scope.modalEdit = function(row) {
        $scope.edit.idMisi = row.id_misi;
        $scope.edit.dropdownMisi = row.id_misi;
        $scope.edit.idTujuan = row.id_tujuan;
        $scope.edit.tujuan = $scope.json[row.id_misi];
        $scope.edit.dropdownTujuan = row.id_tujuan;
        
        $scope.edit.idSasaran = row.id_sasaran;
        $scope.edit.idStrategi = row.id_strategi;
        $scope.edit.idKebijakan = row.id_kebijakan;
        if ( $scope.json[row.id_misi] !== undefined ) {
            // listing of tujuan
            for ( var indexTujuan in $scope.json[row.id_misi] ) {
                if ( $scope.json[row.id_misi][indexTujuan].id == row.id_tujuan ) {
                    $scope.edit.sasaran = $scope.json[row.id_misi][indexTujuan].data;
                    
                    // listing of sasaran
                    for ( var indexSasaran in $scope.json[row.id_misi][indexTujuan].data ) {
                        if ( $scope.json[row.id_misi][indexTujuan].data[indexSasaran].id == row.id_sasaran ) {
                            $scope.edit.dropdownSasaran = $scope.json[row.id_misi][indexTujuan].data[indexSasaran].id;
                            
                            // listing of strategi
                            for ( var indexStrategi in $scope.json[row.id_misi][indexTujuan].data[indexSasaran].data ) {
                                if ( $scope.json[row.id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].id == row.id_strategi ) {
                                    $scope.edit.dropdownStrategi = $scope.json[row.id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].id;
                            
                                    // listing of kebijakan
                                    for ( var indexKebijakan in $scope.json[row.id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data ) {
                                        if ( $scope.json[row.id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data[indexKebijakan].id == row.id_kebijakan ) {
                                            $scope.edit.dropdownKebijakan = $scope.json[row.id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data[indexKebijakan].id;
                                        }
                                    }
                                }
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
                        $scope.add.strategi = $scope.json[value][0].data[0].data;
                    }
                    $scope.add.idSasaran = $scope.json[value][0].data[0].id;
                    $scope.add.dropdownSasaran = $scope.add.idSasaran;
                    $scope.add.idStrategi = $scope.json[value][0].data[0].data[0].id;
                    $scope.add.dropdownStrategi = $scope.add.idStrategi;
                    $scope.add.idKebijakan = $scope.json[value][0].data[0].data[0].data[0].id;
                    $scope.add.dropdownKebijakan = $scope.add.idKebijakan;
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
                        // update list dropdown strategi
                        $scope.add.strategi = $scope.json[id_misi][indexTujuan].data[0].data;
                        $scope.add.idStrategi = $scope.json[id_misi][indexTujuan].data[0].data[0].id;
                        $scope.add.dropdownStrategi = $scope.add.idStrategi;
                        // update list dropdown kebijakan
                        $scope.add.kebijakan = $scope.json[id_misi][indexTujuan].data[0].data[0].data;
                        $scope.add.idKebijakan = $scope.json[id_misi][indexTujuan].data[0].data[0].data[0].id;
                        $scope.add.dropdownKebijakan = $scope.add.idKebijakan;
                    }
                }
            }
        }
    });
    
    $scope.$watch('add.dropdownSasaran', function(value) {
        if ( value !== undefined ) {
            $scope.add.idSasaran = value;
            var id_misi = $scope.add.idMisi;
            var id_tujuan = $scope.add.idTujuan;
            
            if ( $scope.json[id_misi] !== undefined ) {
                // listing tujuan
                for ( var indexTujuan in $scope.json[id_misi] ) {
                    if ( $scope.json[id_misi][indexTujuan].id == id_tujuan ) {
                        // listing sasaran
                        for ( var indexSasaran in $scope.json[id_misi][indexTujuan].data ) {
                            if ( $scope.json[id_misi][indexTujuan].data[indexSasaran].id == value ) {
                                // update list dropdown strategi
                                $scope.add.strategi = $scope.json[id_misi][indexTujuan].data[indexSasaran].data;
                                $scope.add.idStrategi = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[0].id;
                                $scope.add.dropdownStrategi = $scope.add.idStrategi;
                                // update list dropdown kebijakan
                                $scope.add.kebijakan = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[0].data;
                                $scope.add.idKebijakan = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[0].data[0].id;
                                $scope.add.dropdownKebijakan = $scope.add.idKebijakan;
                            }
                        }
                    }
                }
            }
        }
    });
    
    $scope.$watch('add.dropdownStrategi', function(value) {
        if ( value !== undefined ) {
            $scope.add.idStrategi = value;
            var id_misi = $scope.add.idMisi;
            var id_tujuan = $scope.add.idTujuan;
            var id_sasaran = $scope.add.idSasaran;
            
            if ( $scope.json[id_misi] !== undefined ) {
                // listing tujuan
                for ( var indexTujuan in $scope.json[id_misi] ) {
                    if ( $scope.json[id_misi][indexTujuan].id == id_tujuan ) {
                        // listing sasaran
                        for ( var indexSasaran in $scope.json[id_misi][indexTujuan].data ) {
                            if ( $scope.json[id_misi][indexTujuan].data[indexSasaran].id == id_sasaran ) {
                                // listing strategi
                                for ( var indexStrategi in $scope.json[id_misi][indexTujuan].data[indexSasaran].data ) {
                                    if ( $scope.json[id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].id == value ) {
                                        $scope.add.kebijakan = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data;
                                        $scope.add.idKebijakan = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data[0].id;
                                        $scope.add.dropdownKebijakan = $scope.add.idKebijakan;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    
    $scope.$watch('add.dropdownKebijakan', function(value) {
        if ( value !== undefined ) {
            $scope.add.idKebijakan = value;
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
        var id_misi = $scope.edit.idMisi;
        var id_tujuan = $scope.edit.idTujuan;
        if ( value == undefined ) {
            $scope.edit.dropdownSasaran = $scope.edit.idSasaran;
        }
        if ( value !== undefined ) {
            $scope.edit.idSasaran = value;
            
            if ( $scope.json[id_misi] !== undefined ) {
                // listing of tujuan
                for ( var indexTujuan in $scope.json[id_misi] ) {
                    if ( $scope.json[id_misi][indexTujuan].id == id_tujuan ) {
                        // listing of sasaran
                        for ( var indexSasaran in $scope.json[id_misi][indexTujuan].data ) {
                            if ( $scope.json[id_misi][indexTujuan].data[indexSasaran].id == value ) {
                                $scope.edit.strategi = $scope.json[id_misi][indexTujuan].data[indexSasaran].data;
                                $scope.edit.dropdownStrategi = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[0].id;
                            }
                        }
                    }
                }
            }
        }
    });
    
    $scope.$watch('edit.dropdownStrategi', function(value) {
        var id_misi = $scope.edit.idMisi;
        var id_tujuan = $scope.edit.idTujuan;
        var id_sasaran = $scope.edit.idSasaran;
        if ( value !== undefined ) {
            $scope.edit.idStrategi = value;
            
            if ( $scope.json[id_misi] !== undefined ) {
                // listing of tujuan
                for ( var indexTujuan in $scope.json[id_misi] ) {
                    if ( $scope.json[id_misi][indexTujuan].id == id_tujuan ) {
                        // listing of sasaran
                        for ( var indexSasaran in $scope.json[id_misi][indexTujuan].data ) {
                            if ( $scope.json[id_misi][indexTujuan].data[indexSasaran].id == id_sasaran ) {
                                // listing of strategi
                                for ( var indexStrategi in $scope.json[id_misi][indexTujuan].data[indexSasaran].data ) {
                                    if ( $scope.json[id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].id == value ) {
                                        $scope.edit.kebijakan = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data;
                                        $scope.edit.dropdownKebijakan = $scope.json[id_misi][indexTujuan].data[indexSasaran].data[indexStrategi].data[0].id;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    
    $scope.$watch('edit.dropdownKebijakan', function(value) {
        if ( value !== undefined ) {
            $scope.edit.idKebijakan = value;
        }
    });
});