<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\SignupForm;
use app\models\LoginForm;
use app\models\User;


class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
                'cors' => [
                    'Origin' => ['*'], // Allows requests from any origin
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Max-Age' => 86400, // Cache preflight request for 24 hours
                ],
            ],
          'access' => [
            'class' => AccessControl::class,
            'only' => ['logout', 'react', 'index', 'login', 'signup'],
            'rules' => [
                [
                    'actions' => ['login', 'signup', 'index'],
                    'allow' => true,
                    'roles' => ['?', '@'],
                ],
                [
                    'actions' => ['logout', 'react'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionReact()
    {
        
        // Ensure the path correctly points to the built React index.html file
        return $this->renderPartial('@app/web/react/index.html');
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionSignup()
    {
        $model = new SignupForm();
        if ($model->load(Yii::$app->request->post()) && $model->signup()) {
            Yii::$app->session->setFlash('success', 'Thank you for registration. Please login.');
            return $this->redirect(['site/login']);
        }

        return $this->render('signup', [
            'model' => $model,
        ]);
    }

    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }
        $model = new LoginForm();
        
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            $user = $model->getUser();
            $token = $user->generateJwtToken();
            
            return $this->render('login', [
                'model' => $model,
                'token' => $token,
            ]);
          
        }

        return $this->render('login', [
            'model' => $model,
        ]);
    }
    
    
 

    
    public function actionLogout()
{
    $model = new LoginForm();
    Yii::$app->user->logout();

    // Clear the session
    Yii::$app->session->destroy();

    return $this->render('login', [
        'model' => $model,
    ]);
}

 
}


 
    /**
     * Login action.
     *
     * @return Response|string
     */
   

    /**
     * Logout action.
     *
     * @return Response
     */
  

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
   

    /**
     * Displays about page.
     *
     * @return string
     */
   