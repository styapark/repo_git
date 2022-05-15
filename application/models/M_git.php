<?php
/**
 * Description of M_git
 *
 * @author styapark
 */
class M_git extends M_parent {
    public $table;
    public $field = [
        'id',
        'user_id',
        'added_date',
        'modified_date',
        'name',
        'alias',
        'description',
        'path_source',
        'version'
    ];

    public function __construct() {
        parent::__construct();

        $this->table = get_nametable($this);
    }

    public function fetch( $id = NULL, $user_id = NULL, $path = NULL, $alias = NULL ) {
        $this->db->from($this->table);
        if ( is_numeric($id) ) {
            $this->db->where('id', $id);
        }
        if ( is_numeric($user_id) ) {
            $this->db->where('user_id', $id);
        }
        if ( !is_null($path) && ($_path = is_valid_directory($path)) ) {
            $this->db->where('path_source', $_path);
        }
        if ( is_string($alias) ) {
            $this->db->where('alias', filter_username($alias));
        }

        $this->db->order_by('user_id ASC, id ASC');

        return clone $this->db;
    }

    public function insert( $option = array() ) {
        if ( !empty($option) ) {
            if ( empty($option['user_id']) ) {
                $option['user_id'] = $this->session->userdata('user_id');
            }
            if ( !($path = is_valid_directory( $option['path_source'] )) ) {
                return FALSE;
            }
            print_json($path);
            $this->fetch(NULL, NULL, $path, $option['alias']);
            if ( $this->get_row() ) {
                return FALSE;
            }

            $option['added_date'] = date('Y-m-d H:i:s');
            $filter = $this->_filter( $option );

            $this->db->set($filter);
            $this->db->from($this->table);
            return $this->db->insert();
        }
        return FALSE;
    }

    public function update( $option = array() ) {
        if ( !empty($option) ) {
            if ( empty($option['user_id']) ) {
                $option['user_id'] = $this->session->userdata('user_id');
            }
            if ( !($path = is_valid_directory( $option['path_source'] )) ) {
                return FALSE;
            }

            $fetch = $this->fetch(NULL, NULL, $path, $option['alias']);
            if ( $this->get_nums() > 1 ) {
                return FALSE;
            }
            $id = @$this->get_row($fetch)->id;

            $filter = $this->_filter( $option, ['id','added_date'] );

            $this->db->set($filter);
            $this->db->where('id', intval($id));
            $this->db->from($this->table);
            return $this->db->update();
        }
        return FALSE;
    }

    public function _filter( $option, $skip_index = array() ) {
        if ( is_array($option) ) {
            $filters = [];
            foreach ($this->field as $index) {
                if ( !empty($option[$index]) ) {
                    if ( in_array($index, $skip_index) ) continue;

                    $filters[ $index ] = $this->db->escape_str($option[$index]);

                    if ( is_array($option[$index]) ) {
                        $filters[ $index ] = json_encode($option[$index]);
                    }
                }
            }
            return $filters;
        }
        return $option;
    }
}
