<?php

class NailController
{
    public function actionView_laric()
    {
        require_once(ROOT . '/views/nails/laric.php');

        return true;
    }

    public function actionView_laric_pedicure()
    {
        require_once(ROOT . '/views/nails/laric_pedicure.php');

        return true;
    }

    public function actionView_shelac()
    {
        require_once(ROOT . '/views/nails/shelac.php');

        return true;
    }

    public function actionView_extension()
    {
        require_once(ROOT . '/views/nails/nail_extension.php');

        return true;
    }

    public function actionView_strengthening()
    {
        require_once(ROOT . '/views/nails/nail_strengthening.php');

        return true;
    }

    public function actionView_japan()
    {
        require_once(ROOT . '/views/nails/japanese_manicure.php');

        return true;
    }

    public function actionView_kart()
    {
        require_once(ROOT . '/views/nails/kart.php');

        return true;
    }

    public function actionView_ion()
    {
        require_once(ROOT . '/views/nails/ion_detox.php');

        return true;
    }
}