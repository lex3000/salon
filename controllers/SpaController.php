<?php

class SpaController
{
    public function actionView_env()
    {
        require_once(ROOT . '/views/spa/envelopment.php');

        return true;
    }

    public function actionView_barrel()
    {
        require_once(ROOT . '/views/spa/barrel.php');

        return true;
    }

    public function actionView_massaj()
    {
        require_once(ROOT . '/views/spa/massaj.php');

        return true;
    }
}