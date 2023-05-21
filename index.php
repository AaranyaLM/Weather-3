<?php
    include "weather.php"
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Boy</title>
    <script src="https://kit.fontawesome.com/1ae1db6a1d.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css">
</head>
<body>


    <div class="container">

        <div class="header">     
            <div class="search-container">
                <form method="GET" action="weather.php">
                    <input type="text" id="search" name="search" placeholder="Search your City">
                <button onclick="getConnectionStatus(navigator.onLine)">
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                </button>
                </form>
                
                
                
            </div>
        </div>   

        <div class="title" id="title">
         
        </div>
         
        <div class="content" id="weather">

           
        </div>


        <!--7 days data here-->
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



        <div class="footer">
            &#169; Made by Aaranya Maskey
        </div>
    </div>
   
    <script src="weather.js"></script>
</body>
</html>