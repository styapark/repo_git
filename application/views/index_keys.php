<?php require_once APPPATH.'views/head.php'; ?>
<?php require_once APPPATH.'views/navbar_top.php'; ?>
<?php require_once APPPATH.'views/sidebar_left.php'; ?>

<section class="content-body">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><i class="zmdi zmdi-home"></i> Dashboard</li>
    </ol>
    <div class="row">
        <div class="col-12">
            <div class="card card-body" id="<?= $p ?>">
                <div class="h6 font-bold">
                    <span>Keys List</span>
                </div>
                <hr class="my-1">
                <form method="POST" id="add">
                    <div class="collapse">
                        <div class="form-group md">
                            <label>Name</label>
                            <input type="text" name="name" class="form-control md" autocomplete="off" placeholder="Key ABC" data-required>
                            <i class="form-bar"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary btn-sm m-0 float-right"><i class="zmdi zmdi-mail-send"></i> Create</button>
                    </div>
                </form>
                <hr class="my-3">
                <div class="row">
                    <div class="table-responsive">
                    <table class="table table-hover" id="datatables" name="<?= $p ?>" data-src="<?= MyLite_base.'api/'.$p.'/table' ?>">
                        <thead>
                            <tr>
                                <th data-field="client_id">Client ID</th>
                                <th data-field="added_date">Added</th>
                                <th data-field="name">Name</th>
                                <th data-field="name_user">By</th>
                                <th data-field="__callback" data-callback="actionEditDelete">Action</th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                </div>
                <form class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Show Key</h5>
                            </div>
                            <div class="modal-body">
                                <div class="form-group md">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control md" readonly>
                                    <i class="form-bar"></i>
                                </div>
                                <div class="form-group md">
                                    <label>Client ID</label>
                                    <input type="text" name="client_id" class="form-control md" readonly>
                                    <i class="form-bar"></i>
                                </div>
                                <div class="form-group md">
                                    <label>Client Secret</label>
                                    <input type="text" name="client_secret" class="form-control md" readonly>
                                    <i class="form-bar"></i>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-sm btn-outline-secondary" data-dismiss="modal"><i class="zmdi zmdi-undo"></i> Close</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<?php require_once APPPATH.'views/foot.php'; ?>