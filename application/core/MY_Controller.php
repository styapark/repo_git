<?php

/**
 * Description of MY_Controller
 *
 * @author styapark
 */
require_once APPPATH.'libraries/Format.php';
require_once APPPATH.'libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class MY_Controller extends RestController {
    protected $app_name = 'Repository System';
    protected $data_view = [
        'title' => ''
    ];
    public function __construct($config_name = 'rest_default') {
        parent::__construct($config_name);

        // assign
        $this->data_view['title'] = $this->app_name;
    }

    public function ion_is_login() {
        return $this->ion_auth->logged_in();
    }
}

class Login_Controller extends MY_Controller {
    public function __construct($config_name = 'rest_basic') {
        parent::__construct($config_name);

        if ( !((bool) $this->config->item('encryption_key')) ) {
            $hash = hash('sha256', get_uuid());
            $data = PHP_EOL.'$config[\'encryption_key\'] = hex2bin(\''.$hash.'\');'.PHP_EOL;
            write_file(realpath(__DIR__.'/../config/config.php'), $data, 'a+');
        }

        if ( $this->ion_is_login() ) {
            $this->data_view['user_info'] = $this->ion_auth->user()->row();
            $this->data_view['user_group'] = $this->ion_auth->get_users_groups()->row();
        }
    }

    protected function __error() {
        $this->response([
            'status' => FALSE,
            'message' => 'Unknown method'
        ]);
    }
}

class GIT_Controller extends MY_Controller {
    public function __construct($config_name = 'rest_git') {
        parent::__construct($config_name);

    }
}