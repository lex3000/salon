<?php

class SiteController
{

    public function actionIndex()
    {
        require_once(ROOT . '/views/site/index.php');

        return true;
    }

    public function actionAbout()
    {

        require_once(ROOT . '/views/contacts/about.php');

        return true;
    }

    public function actionContact()
    {

        require_once(ROOT . '/views/contacts/contact.php');

        return true;
    }

}
