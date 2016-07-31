<?php



class ServiceController
{
    public function actionView()
    {
        require_once(ROOT . '/views/services/service.php');

        return true;
    }

    public function actionViews()
    {
        require_once(ROOT . '/views/services/services.php');

        return true;
    }

    public function actionView_man()
    {
        require_once(ROOT . '/views/services/service_man.php');

        return true;
    }

    public function actionView_cold()
    {
        require_once(ROOT . '/views/services/service_cold.php');

        return true;
    }

    public function actionView_coloration()
    {
        require_once(ROOT . '/views/services/coloration.php');

        return true;
    }

    public function actionView_hair()
    {
        require_once(ROOT . '/views/services/hair_treatment.php');

        return true;
    }

    public function actionView_brazilian()
    {
        require_once(ROOT . '/views/services/brazilian_hair_straightening.php');

        return true;
    }

    public function actionView_wedding()
    {
        require_once(ROOT . '/views/services/wedding_hairstyles.php');

        return true;
    }

    public function actionView_braids()
    {
        require_once(ROOT . '/views/services/weaving_braids.php');

        return true;
    }

    public function actionView_sebastian()
    {
        require_once(ROOT . '/views/services/sebastian.php');

        return true;
    }

    public function actionView_perm()
    {
        require_once(ROOT . '/views/services/perm.php');

        return true;
    }
}