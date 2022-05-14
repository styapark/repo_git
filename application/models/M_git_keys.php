<?php
/**
 * Description of M_git_keys
 *
 * @author styapark
 */
class M_git_keys extends M_parent {
    public $table;
    public $field = [
        'key_id',
        'id',
        'client_id',
        'added_date',
        'modified_date'
    ];

    public function __construct() {
        parent::__construct();

        $this->table = get_nametable($this);
    }

    public function fetch( $id = NULL, $client_id = NULL, $key_id = NULL ) {
        $this->db->from($this->table);
        if ( !empty($id) ) {
            $this->db->where('id', intval($id));
        }
        if ( !empty($client_id) ) {
            $this->db->where('client_id', filter_alphanumeric($id));
        }
        if ( !empty($key_id) ) {
            $this->db->where('key_id', intval($key_id));
        }

        $this->db->order_by('added_date ASC, key_id ASC');

        return clone $this->db;
    }

    public function insert( $option = array() ) {
        if ( !empty($option) ) {
            if ( empty($option['id']) || empty($option['client_id']) ) {
                return FALSE;
            }
            $this->fetch( $option['id'], $option['client_id'] );
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
            if ( empty($option['id']) || empty($option['client_id']) ) {
                return FALSE;
            }
            $this->fetch( $option['id'], $option['client_id'] );
            if ( $this->get_nums() > 1 ) {
                return FALSE;
            }
            $key_id = @$this->get_row($fetch)->key_id;

            $filter = $this->_filter( $option, ['key_id','added_date'] );

            $this->db->set($filter);
            $this->db->where('key_id', intval($key_id));
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
