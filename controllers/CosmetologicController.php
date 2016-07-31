<?php

class CosmetologicController
{
    public function actionView_guinot()
    {
        require_once(ROOT . '/views/cosmetologic/guinot.php');

        return true;
    }

    public function actionView_skeyndor()
    {
        require_once(ROOT . '/views/cosmetologic/skeyndor.php');

        return true;
    }

    public function actionView_ultra()
    {
        require_once(ROOT . '/views/cosmetologic/ultrasonic_face_cleaning.php');

        return true;
    }

    public function actionView_bio()
    {
        require_once(ROOT . '/views/cosmetologic/bio_epilation.php');

        return true;
    }

    public function actionView_piling()
    {
        require_once(ROOT . '/views/cosmetologic/piling.php');

        return true;
    }
}