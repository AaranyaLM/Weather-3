<?php include "weather.php";?>

<html >
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather History</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">     
            <div class="search-container">
                <form method="GET" action="weather.php">
                    <input type="text" id="search" name="search" placeholder="Search your City">
                </form>
            </div>
        </div>   
        <div class="title" id="title" style="margin:60px; ">
            <h1><?php echo $cityName?></h1>
        </div>
        <div class="weather-history">
                <?php
                for ($i=6; $i>=1; $i--) {
                    $date = (new DateTime())->sub(new DateInterval('P'.$i.'D'))->format('Y-m-d');
                ?>
                <div class="day">
                    <div class="item-title">
                        <?php echo $date;?>
                    </div>
                    <div class="item-content">
                        <?php echo $temp2[6 - $i]."°C"; ?>
                    </div>
                </div>
                <?php } ?>
            </div>
        <div class="button7" style="margin:100px">
            <a href="index.php">Current Weather</a>
        </div>
    </div>
</body>
</html>