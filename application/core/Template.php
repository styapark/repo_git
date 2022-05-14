<?php
/**
 * Description of __cname__
 *
 * @author styapark
 */

class __cname__ extends GIT_Controller {
    private $path;
    public function __construct($config = 'rest') {
        parent::__construct($config);

        $this->load->model('m_download');
        $this->m_download->loaded('__cname__');
        $this->path = $this->get('path');
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
}
