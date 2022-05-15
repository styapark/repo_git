<?php
/**
 * Description of Token
 *
 * @author styapark
 * @property CI_Loader $load
 * @property CI_DB_query_builder|CI_DB_mysqli_driver $db
 * @property CI_Input $input
 * 
 * @property M_git $m_git
 * @property M_keys $m_keys
 * @property M_git_keys $m_git_keys
 * @property M_download $m_download
 */
class Token {
    protected $CI;
    protected $load;
    protected $db;
    protected $input;
    const table = 'tokens';

    protected $m_keys;
    protected $m_git;

    public function __construct() {
        $this->CI =& get_instance();
        $this->load = $this->CI->load;
        $this->db = $this->CI->db;
        $this->input = $this->CI->input;

        $this->load->model('m_keys');
        $this->m_keys = $this->CI->m_keys;
        $this->m_git = $this->CI->m_git;
    }

    public function login( $client_id, $client_secret ) {
        $this->m_keys->match( $client_id, $client_secret );
        $row = $this->m_keys->get_row();

        if ( !empty($row->client_id) ) {
            $this->generate( $client_id, $client_secret );
            return TRUE;
        }
        return FALSE;
    }

    private function _hash( $client_id, $client_secret ) {
        $hash = hash_hmac('sha256', $client_id. mt_rand(), $client_secret);
        $token_new = substr($hash, 0, config_item('rest_key_length'));

        // check duplicate
        $row = $this->check_token($token_new, $client_id, FALSE);
        if ( $row ) {
            return $this->_hash($client_id, $client_secret);
        }
        return $token_new;
    }

    public function generate( $client_id, $client_secret ) {
        $_client_id = filter_alphanumeric($client_id);
        $_client_secret = filter_alphanumeric($client_secret);

        $res = $this->get_active_token($_client_id);

        // suspend other token
        if ( $res->num_rows() ) {
            $ids = array_column($res->result_array(), 'token_id');
            $this->db->where_in('token_id', $ids);
            $this->db->set('level', 0);
            $this->db->update(self::table);
        }

        // insert new token
        $data['client_id'] = $_client_id;
        $data['token'] = $this->_hash($_client_id, $_client_secret);
        $data['level'] = 1;
        $data['date_created'] = function_exists('now') ? now() : time();
        $this->db->set($data);
        $this->db->insert(self::table);
    }

    public function get_active_token( $client_id ) {
        $this->db->from(self::table);
        $this->db->where('client_id', $client_id);
        $this->db->where('level >', 0);
        $this->db->order_by('token_id', 'DESC');

        // suspend other token
        return $this->db->get();
    }

    /**
     * get privilege of git access
     */
    public function check_token( $token_key = NULL, $client_id = NULL, $join = TRUE ) {
        $this->db->from(self::table);
        if ( $join ) {
            $this->db->join('git_keys', self::table.'.client_id=git_keys.client_id');
        }
        if ( $token_key ) {
            $this->db->where('token', filter_alphanumeric($token_key));
        }
        if ( $client_id ) {
            $this->db->where('client_id', filter_alphanumeric($client_id));
        }

        $res = $this->db->get();
        return $res->row();
    }

    public function get_client_id() {
        if ( ($authorization = $this->input->server('HTTP_AUTHORIZATION')) ) {
            list($client_id, $client_secret) = explode(':', base64_decode(substr($authorization, 6)));

            return $client_id;
        }
        return FALSE;
    }

    public function get_token() {
        $res = $this->get_active_token( $this->get_client_id() );
        return @$res->row()->token;
    }

    public function git_privileges( $token, $controller, $directory ) {
        if ( trim($directory,'/') !== 'git' ) {
            return FALSE;
        }

        // get git_key for search id of git
        $row = $this->check_token( $token );
        if ( !empty($row) ) {
            $this->m_git->fetch( @$row->id );
            $alias = $this->m_git->get_row(NULL, 'alias');
            if ( $alias === $controller ) {
                return TRUE;
            }
        }
        return FALSE;
    }
}
