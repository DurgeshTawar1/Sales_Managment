<?php
namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use Firebase\JWT\JWT;

class User extends ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return 'user';
    }

    public function rules()
    {
        return [
            [['username', 'email', 'password_hash'], 'required'],
            [['username', 'email'], 'unique'],
            ['email', 'email'],
        ];
    }

    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        try {
            $decoded = JWT::decode($token, Yii::$app->params['jwtSecretKey'], ['HS256']);
            return static::findOne(['id' => $decoded->sub]);
        } catch (\Exception $e) {
            return null;
        }
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return null; // Not used with JWT
    }

    public function validateAuthKey($authKey)
    {
        return false; // Not used with JWT
    }

    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    public function generateJwtToken()
    {
        $key = Yii::$app->params['jwtSecretKey'];
        $payload = [
            'iat' => time(),
            'exp' => time() + 3600,
            'sub' => $this->id,
        ];
        return JWT::encode($payload, $key, 'HS256');
    }
}