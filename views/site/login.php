<?php
use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

$this->title = 'Login';
?>
<div class="site-login">
    <h1><?= Html::encode($this->title) ?></h1>
    <p>Please fill out the following fields to login:</p>
    <?php $form = ActiveForm::begin(['id' => 'login-form']); ?>
        <?= $form->field($model, 'username')->textInput(['autofocus' => true]) ?>
        <?= $form->field($model, 'password')->passwordInput() ?>
        <?= Html::submitButton('Login', ['class' => 'btn btn-primary', 'name' => 'login-button']) ?>
    <?php ActiveForm::end(); ?>
</div>

<?php if (isset($token)): ?>
<script>
    // Store token in sessionStorage
    localStorage.setItem('authToken', <?= json_encode($token) ?>);
   
    // Redirect to index view
    window.location.href = '<?= \yii\helpers\Url::to(['site/index']) ?>';
   
</script>
<?php endif; ?>