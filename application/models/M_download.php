<?php

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/PHPClass.php to edit this template
 */

/**
 * Description of M_download
 *
 * @author styapark
 */
class M_download extends M_parent {
    public $real_path;
    public $paths = [];
    public function __construct() {
        parent::__construct();

        $this->load->helper('directory');
        $this->load->helper('download');
    }

    public function loaded( $alias ) {
        if ( !empty($alias) ) {
            $_alias = strtolower($alias);

            $this->m_git->fetch(NULL, NULL, NULL, $_alias);
            $this->real_path = $this->m_git->get_row(NULL,'path_source');
        }
    }

    public function get_path( $recursive = TRUE ) {
        if ( !empty($this->real_path) ) {
            $full_path = directory_map($this->real_path, 0, TRUE);

            // ignore file and path
            $ignores = ['.DS_Store','.git*','.error*','*.sql','composer.json','*.txt'];
            if ( in_array('.gitignore', $full_path) ) {
                $load = read_file($this->real_path.'/.gitignore');
                if ( strpos($load, chr(10)) !== FALSE ) {
                    $load = explode(chr(10), $load);
                }
                if ( is_array($load) && !empty($load) ) {
                    foreach ($load as $l) {
                        if ( substr($l, 0, 1) !== '#' ) {
                            $ignores[] = ltrim(str_replace('/*', '/', $l),'/');
                        }
                    }
                }
            }

            // process ignoring
            $filters = $this->process_ignores( $full_path, $ignores );
            $this->paths = recursive_off($filters);
            if ( !$recursive ) {
                $filters = $this->paths;
            }
            return $filters;
        }
        return FALSE;
    }

    private function process_ignores($full_path, $ignores = [], $filters = []) {
        if ( !empty($full_path) ) {
            foreach ($full_path as $key=>$row) {
                if ( is_string($row) ) {
                    $check = is_match_array( $row, $ignores );
                    if ( !$check ) {
                        $filters[] = $row;
                    }
                }
                else {
                    if ( !is_match_array($key, $ignores) ) {
                        $filters[$key] = $this->process_ignores($row, $ignores);
                    }
                }
            }
        }
        return $filters;
    }

    public function get_meta() {
        $tmp = [];
        if ( $this->paths ) {
            foreach ($this->paths as $filename) {
                $tmp[ $filename ] = get_metafile($this->real_path.'/'.$filename, $filename);
            }
        }
        return $tmp;
    }

    public function grab( $filename = NULL ) {
        if ( !empty($filename) && file_exists($this->real_path.'/'.$filename) ) {
            force_download( $this->real_path.'/'.$filename, NULL );
        }
        else {
            show_404();
        }
    }
}
