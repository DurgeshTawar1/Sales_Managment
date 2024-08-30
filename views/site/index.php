<?php
/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Home';
?>
<div class="site-index">

    <div class="hero-section">
        <div class="hero-content">
            <h1 class="display-4">Welcome to SalesEstream!</h1>
            <p class="lead">Elevate your sales strategy with cutting-edge tools and insights.</p>
            <p>
                <?= Html::a('Boost Your Sales with SalesEstream', ['/react'], ['class' => 'btn btn-primary btn-lg']) ?>
            </p>
        </div>
    </div>

    <div class="body-content">
        <div class="row">
            <div class="col-lg-4">
                <h2>Feature 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div class="col-lg-4">
                <h2>Feature 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            <div class="col-lg-4">
                <h2>Feature 3</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
        </div>
    </div>

</div>

<style>
    .site-index {
        text-align: center;
        padding: 2rem;
        background-color: #f0f4f8; /* Light background for the whole page */
    }

    .hero-section {
        background: linear-gradient(135deg, #007bff 0%, #00c6ff 100%); /* Blue gradient background */
        color: white;
        padding: 5rem 2rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .hero-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .hero-content h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    .hero-content p.lead {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    .btn-primary {
        background-color: #ff6f61; /* Warm coral color for the button */
        border-color: #ff6f61;
        padding: 12px 24px;
        font-size: 1.25rem;
        font-weight: bold;
        border-radius: 0.3rem;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .btn-primary:hover {
        background-color: #e55d50; /* Darker coral color for hover effect */
        border-color: #e55d50;
    }

    .body-content {
        padding: 2rem;
    }

    .body-content .row > div {
        padding: 1rem;
    }

    .body-content h2 {
        font-size: 1.75rem;
        margin-bottom: 1rem;
        color: #333;
    }

    .body-content p {
        font-size: 1rem;
        color: #555;
    }
</style>
