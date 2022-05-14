<?php
/**
 * Description of M_keys
 *
 * @author styapark
 */
class M_keys extends M_parent {
    public $table;
    public $field = [
        'client_id',
        'client_secret',
        'user_id',
        'added_date',
        'name',
        'deleted'
    ];

    public function __construct() {
        parent::__construct();

        $this->table = get_nametable($this);
    }

    public function fetch( $client_id = NULL, $user_id = NULL, $ignore_deleted = FALSE ) {
        $this->db->from($this->table);
        if ( !empty($client_id) ) {
            $this->db->where('client_id', filter_alphanumeric($client_id) );
        }
        if ( is_numeric($user_id) ) {
            $this->db->where('user_id', $user_id );
        }
        if ( !$ignore_deleted ) {
            $this->db->where('deleted', 0 );
        }

        $this->db->order_by('added_date ASC, client_id ASC');

        return clone $this->db;
    }

    public function _generate( $check_loop = TRUE, $algo = 'sha1' ) {
        $key = $this->config->item('encryption_key');
        $hash = hash($algo, $key.time());

        if ( $check_loop ) {
            $this->fetch( $hash );
            if ( $this->get_nums() ) {
                return $this->_generate($check_loop, $algo);
            }
        }
        return $hash;
    }

    public function insert( $option = array(), $autogenerate = FALSE ) {
        if ( !empty($option) ) {
            if ( $autogenerate && !empty($option['name']) ) {
                $option['client_id'] = $this->_generate();
                $option['client_secret'] = $this->_generate( FALSE, 'sha256' );
            }
            if ( empty($option['user_id']) ) {
                $option['user_id'] = $this->session->userdata('user_id');
            }

            if ( !is_alphanumeric($option['client_id']) ) {
                return FALSE;
            }

            $this->fetch( $option['client_id'] );
            if ( $this->get_row() ) {
                return FALSE;
            }

            $filter = $this->_filter( $option );

            $this->db->set($filter);
            $this->db->from($this->table);
            return $this->db->insert();
        }
        return FALSE;
    }

    public function update( $option = array() ) {
        if ( !empty($option) ) {
            $this->fetch( $option['client_id'], NULL );
            if ( $this->get_nums() > 1 ) {
                return FALSE;
            }
            if ( empty($option['user_id']) ) {
                $option['user_id'] = $this->session->userdata('user_id');
            }

            $filter = $this->_filter( $option, ['client_id'] );

            $this->db->set($filter);
            $this->db->where('id', $option['client_id']);
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

    public function _dropdown() {
        $this->fetch();
        $result = $this->get_result();
        if ( !empty($result) ) {
            $tmp = [];
            foreach ($result as $row) {
                $tmp[ $row->client_id ] = $row->name;
            }
            return $tmp;
        }
    }

    public function dropdown( $selected = array(), $extra = '' ) {
        $options = $this->_dropdown();
        return form_dropdown('client_id', $options, $selected, $extra);
    }
}
