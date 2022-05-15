<?php
/**
 * Description of __cname__
 *
 * @author styapark
 */
use chriskacerguis\RestServer\RestController;

class __cname__ extends GIT_Controller {
    private $path;
    public function __construct() {
        parent::__construct();

        $this->load->model('m_download');
        $this->m_download->loaded('__cname__');
        $this->path = $this->get('path');

        $this->methods['token_get']['key'] = FALSE;
        $this->methods['index_get']['limit'] = 10;
        $this->methods['master_get']['limit'] = 10;
        $this->methods['pull_get']['limit'] = 2000;
    }

    public function token_get() {
        $this->response([
            'status' => TRUE,
            'token' => $this->token->get_token()
        ], RestController::HTTP_CREATED);
    }

    public function index_get() {
        $this->master_get();
    }

    public function master_get() {
        if ($this->path ) {
            $this->m_download->grab($this->path);
            die();
        }
        else {
            $this->m_download->get_path();
            $meta = $this->m_download->get_meta();
            print_json($meta,1,1);
        }
    }

    public function pull_get() {
        if ($this->path ) {
            $this->m_download->grab($this->path);
            die();
        }
        $this->response([
            'status'  => false,
            'message' => 'This API key does not have access to the requested controller',
        ], self::HTTP_UNAUTHORIZED);
    }
}
