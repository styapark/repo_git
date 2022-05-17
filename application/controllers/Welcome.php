<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends Login_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
//    public function index_get() {
//        $this->load->view('welcome_message');
//    }

    public function index_get() {
        if ( $this->ion_is_login() ) {
            redirect('dashboard');
        }

        $res = $this->load->view('index_login', $this->data_view, TRUE);
        die($res);
    }

    public function dashboard_get() {
        if ( !$this->ion_is_login() ) {
            redirect('index');
        }

        $this->data_view['p'] = end($this->uri->segments);
        $this->data_view['dropdown_keys'] = $this->m_keys->dropdown([], 'class="form-control md"');
        $res = $this->load->view('index_list', $this->data_view, TRUE);
        die($res);
    }

    public function keys_get() {
        if ( !$this->ion_is_login() ) {
            redirect('index');
        }

        $this->data_view['p'] = end($this->uri->segments);
        $res = $this->load->view('index_keys', $this->data_view, TRUE);
        die($res);
    }


    // API
    public function api_post( $page, $option = NULL ) {
        if ( $page === 'auth_login' ) {
            $res = $this->_perform_library_auth( $this->post('username'), $this->post('password') );
            $this->response([
                'status' => (bool) $res,
                'message' => $res ? 'Success': 'Failed'
            ]);
        }
        if ( in_array($page, ['dashboard','git','keys']) && $this->ion_is_login() ) {
            if ( in_array($page, ['dashboard','git']) ) {
                $cname = ucfirst(strtolower($this->post('alias')));
                $arr = str_replace('__cname__', $cname, read_file(APPPATH.'/core/Template.php') );
                $filename = APPPATH.'controllers/git/'.$cname.'.php';

                if ( !file_exists($filename) ) {
                    $res = $this->m_git->insert( $this->post() );
                    if ( $res ) {
                        $_POST = array_merge($this->post(), ['id' => $this->db->insert_id() ] );
                        $this->m_git_keys->insert($_POST);
                        write_file($filename, $arr);
                    }
                }
                $this->response([
                    'status' => (bool) $res,
                    'message' => $res ? 'Success': 'Failed'
                ]);
            }
            if ( $page === 'keys' ) {
                $res = $this->m_keys->insert( $this->post(), TRUE );
                $this->response([
                    'status' => (bool) $res,
                    'message' => $res ? 'Success': 'Failed'
                ]);
            }
        }

        $this->__error();
    }

    public function api_put( $page, $option = NULL ) {
        if ( in_array($page, ['dashboard','git','keys']) && $this->ion_is_login() ) {
            if ( in_array($page, ['dashboard','git']) ) {
                $res = $this->m_git->update( $this->put() );
                $this->response([
                    'status' => (bool) $res,
                    'message' => $res ? 'Success': 'Failed'
                ]);
            }
        }

        $this->__error();
    }

    public function api_get( $page, $mode = 'table', $id = NULL ) {
        if ( $page === 'auth_logout' ) {
            $res = $this->ion_auth->logout();
            $this->response([
                'status' => (bool) $res,
                'message' => $res ? 'Success': 'Failed'
            ]);
        }
        if ( in_array($page, ['dashboard','git','keys']) && $this->ion_is_login() ) {
            // table
            if ( in_array($page, ['dashboard','git']) && $mode == 'table' ) {
                $this->m_git->fetch();
                $res = $this->m_git->get_result( NULL, function( $row ) {
                    $r = $this->ion_auth_model->user( $row->user_id )->row();
                    $row->name_user = @$r->first_name.' '.@$r->last_name;
                    $row->url_access = anchor(base_url('git/'.$row->alias));
                    return $row;
                });
                $this->response([
                    'status' => (bool) $res,
                    'data' => $res
                ]);
            }
            if ( $page === 'keys' && $mode == 'table' ) {
                $this->m_keys->fetch();
                $res = $this->m_keys->get_result( NULL, function( $row ) {
                    $r = $this->ion_auth_model->user( $row->user_id )->row();
                    $row->name_user = @$r->first_name.' '.@$r->last_name;
                    return $row;
                });
                $this->response([
                    'status' => (bool) $res,
                    'data' => $res
                ]);
            }

            // sync
            if ( in_array($page, ['dashboard','git']) && $mode == 'sync' && !empty($id) ) {
                $res = [];
                $this->response([
                    'status' => (bool) $res,
                    'data' => $res
                ]);
            }
        }

        $this->__error();
    }
}
