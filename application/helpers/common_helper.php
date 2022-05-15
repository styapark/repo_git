<?php
if ( !function_exists('benchmark_total_execution') ) {
    function benchmark_total_execution() {
        global $BM;
        return doubleval($BM->elapsed_time('total_execution_time_start', 'total_execution_time_end'));
    }
}

if ( !function_exists('print_json') ) {
    function print_json( $arr, $header = TRUE, $count = FALSE, $stamp = FALSE ) {
        $val = $arr;
        if ( is_array($arr) || is_object($arr) ) {
            if ( $count ) {
                $arr = [ 'count' => count($val), 'data' => $val, 'execute_duration' => benchmark_total_execution() ];
            }
            if ( $header && !is_cli() ) {
                header('Content-Type: application/json');
                header('Content-Length: '. @strlen(@json_encode($arr)));
            }
            die(json_encode($arr));
        }
        if ( is_string($arr) ) {
            if ( $header && !is_cli() ) {
                header('Content-Type: text/plan');
                if ( is_html($arr) ) {
                    header('Content-Type: text/html');
                }
                if ( $stamp ) {
                    $arr .= (is_html($arr)?'<br>':"\n").'Stamp: '.benchmark_total_execution();
                }
                header('Content-Length: '. strlen($arr));
            }
            die($arr);
        }
        var_dump($val);
        die();
    }
}

if ( !function_exists('handle_json_result') ) {
    function handle_json_result( $row ) {
        $keys = $result = [];
        $columns = @array_keys($row);
        if ( is_object($row) ) {
            $columns = array_keys((array) $row);
        }

        if ( !empty($row) ) {
            foreach ($columns as $col) {
                $keys[ $col ] = strtolower($col);
            }

            foreach ($keys as $k1=>$k2) {
                $result[ $k2 ] = $row->{$k1};
            }
        }

        if ( is_object($row) ) {
            $result = (object) $result;
        }

        return $result;
    }
}

if ( !function_exists('is_json') ) {
    function is_json( $string, $search_key = NULL ) {
        if ( is_string($string) ) {
            $result = is_array( json_decode($string, TRUE) );
            if ( $result ) {
                $keys = array_keys( json_decode($string, TRUE) );
                if ( !empty($search_key) ) {
                    return in_array($search_key, $keys);
                }
                return $result;
            }
        }
        return FALSE;
    }
}

if ( !function_exists('is_html') ) {
    function is_html( $string ) {
        return $string != strip_tags($string) ? TRUE: FALSE;
    }
}

if ( !function_exists('is_darwin') ) {
    function is_darwin() {
        return strtoupper(substr(php_uname(), 0, 6)) === 'DARWIN';
    }
}

if ( !function_exists('is_windows') ) {
    function is_windows() {
        return strtoupper(substr(php_uname(), 0, 3)) === 'WIN';
    }
}

if ( !function_exists('get_uuid') ) {
    function get_uuid() {
        $sh = "lsblk -f | grep 'ext3\|ext4' | grep -v '\/home' | awk '{print $3}' | sha1sum | awk '{print $1}'";
        if ( is_windows() ) {
            $sh = "mountvol C:\ /L";
            preg_match('/\{(.*)\}/', shell_exec($sh), $output);
            return sha1(@$output[1]);
        }
        elseif ( is_darwin() ) {
            $sh = "system_profiler SPHardwareDataType | awk '/UUID/ {print $3}' | shasum -a 1 | awk '{print $1}'";
        }
        return str_replace("\n", '', shell_exec($sh));
    }
}

if ( !function_exists('git_version') ) {
    function git_version() {
        $sh = "git describe";
        return str_replace("\n", '', shell_exec($sh));
    }
}

if ( !function_exists('is_valid_directory') ) {
    function is_valid_directory( $path, $return_path = FALSE, $ignore_system = TRUE ) {
        if ( $ignore_system && substr($path, 0, 1) != '/' ) {
            $path = dirname(FCPATH).DIRECTORY_SEPARATOR.ltrim($path);
        }
        if ( $ignore_system && strpos($path, FCPATH) !== FALSE ) {
            return FALSE;
        }
        if ( $return_path ) {
            return realpath($path);
        }
        return (bool) realpath($path);
    }
}

if ( !function_exists('is_valid_url') ) {
    function is_valid_url( $path, $return_path = FALSE ) {
        if ( substr($path, 0, 2) == '//' ) {
            $path = 'http:'.$path;
        }
        if ( strpos($path, 'https') === FALSE && strpos($path, 'http') === FALSE ) {
            @preg_match('|^[a-z0-9-]{2,}\.[\.a-z0-9-/]+$|i', $path, $match);
            if ( !empty($match) ) {
                $path = 'https://'.$path;
            }
        }
        if ( $return_path ) {
            return filter_var($path, FILTER_VALIDATE_URL);
        }
        return (bool) filter_var($path, FILTER_VALIDATE_URL);
    }
}

if ( !function_exists('get_nametable') ) {
    function get_nametable( $instance, $escape = array() ) {
        $tmp = ['M_'];
        if ( !empty($escape) && is_array($escape) ) {
            $tmp = array_merge($tmp, $escape);
        }
        if ( is_object($instance) ) {
            $instance = str_replace($tmp,'',get_class($instance));
        }
        return $instance;
    }
}

if ( !function_exists('is_alphanumeric') ) {
    function is_alphanumeric( $string ) {
        return ctype_alnum( $string );
    }
}

if ( !function_exists('filter_alphanumeric') ) {
    function filter_alphanumeric( $string ) {
        return preg_replace('/[^a-zA-Z0-9]+/', '', $string);
    }
}

if ( !function_exists('filter_username') ) {
    function filter_username( $string ) {
        return preg_replace('/[^a-zA-Z0-9\-\.\_]+/', '', $string);
    }
}

function is_match( $string, $pattern ) {
    $pattern = preg_replace_callback('/([^*])/', function($m) {return preg_quote($m[0], '/');}, $pattern);
    $pattern = str_replace('*', '.*', $pattern);
    return (bool) preg_match('/^' . $pattern . '$/i', $string);
}

function is_match_array( $string, $pattern_array = array() ) {
    if ( !empty($pattern_array) && is_array($pattern_array) ) {
        foreach ($pattern_array as $pattern) {
            if ( is_match($string, $pattern) ) return TRUE;
        }
        return FALSE;
    }
    return is_match($string, $pattern_array);
}

function recursive_off( $array, $parent = '', $tmp = array() ) {
    foreach ($array as $key=>$value) {
        if ( is_array($value) ) {
            $tmp = array_merge($tmp, recursive_off($value, $parent.$key));
        }
        else {
            $tmp[] = $parent.$value;
        }
    }
    return $tmp;
}

/**
 * @return _metaFile
 */
function _metafile() {
    return (object) [
        'dir' => '',
        'name' => '',
        'type' => '',
        'size' => 0,
        'perms' => 0,
        'owner' => '',
        'group' => '',
        'ctime' => 0,
        'ctimeh' => '',
        'mtime' => 0,
        'mtimeh' => 0,
        'atime' => 0,
        'atimeh' => 0,
    ];
}

/**
 * 
 * @param string $filename
 * @return _metaFile
 */
function get_metafile( $filename, $dir = NULL ) {
    $tmp = _metafile();
    $tmp->dir = dirname($filename);
    if ( !empty($dir) ) {
        $tmp->dir = dirname($dir);
    }
    $tmp->name = basename($filename);
    $tmp->type = @mime_content_type($filename);
    $tmp->size = @filesize($filename);
    $tmp->perms = (int) sprintf('%o', @fileperms($filename));
    $tmp->owner = @posix_getpwuid(@fileowner($filename))['name'];
    $tmp->group = @posix_getgrgid(@filegroup($filename))['name'];
    $tmp->ctime = @filectime($filename);
    $tmp->ctimeh = date('c', $tmp->ctime);
    $tmp->mtime = @filemtime($filename);
    $tmp->mtimeh = date('c', $tmp->mtime);
    $tmp->atime = @fileatime($filename);
    $tmp->atimeh = date('c', $tmp->atime);

    return $tmp;
}