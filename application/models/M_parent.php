<?php
/**
 * Description of M_parent
 *
 * @author styapark
 */
class M_parent extends CI_Model {
    public function __construct() {
        parent::__construct();
    }

    public function get_nums( $db = NULL ) {
        if ( !empty($db) && is_object($db) ) {
            $res = $db->get();
        }
        else {
            $res = $this->db->get();
        }

        return $res->num_rows;
    }

    public function get_row( $db = NULL, $name = NULL ) {
        if ( !empty($db) && is_object($db) ) {
            $res = $db->get();
        }
        else {
            $res = $this->db->get();
        }

        if ( !empty($name) ) {
            return @$res->row()->{$name};
        }
        return $res->row();
    }

    public function get_result( $db = NULL, $callback_row = NULL ) {
        if ( !empty($db) && is_object($db) ) {
            $res = $db->get();
        }
        else {
            $res = $this->db->get();
        }

        if ( is_callable($callback_row) ) {
            $tmp = [];
            foreach ($res->result() as $row) {
                $tmp[] = $callback_row( $row );
            }
            return $tmp;
        }

        return $res->result();
    }
}
