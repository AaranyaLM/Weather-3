<?php
function city($city){
    $url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1bb0ad32be0d73c2ed42f310d07ee508&units=metric";
    $data = file_get_contents($url);
    $data = json_decode($data, true);
    conmysql($data, $city);
}

function conmysql($data, $city){
    $localhost = "localhost";
    $username = "root";
    $password = "";
    $dbname = "weather app 3";
    $mysql = mysqli_connect($localhost, $username, $password, $dbname);
    entry($mysql, $data, $city);
}

function entry($mysql, $data, $city){
    $cityname = $data['name'];
    $temp = $data['main']['temp'];

    $sql = "INSERT INTO weather (id, city, temp) VALUES (1, '$cityname', $temp)";
    $sql2 = "DELETE FROM weather";
    $sql3 = "UPDATE weather SET id = 1";
    mysqli_query($mysql, $sql2);
    mysqli_query($mysql, $sql3);
    mysqli_query($mysql, $sql);

    for ($i = 2; $i <= 8; $i++) {
        $end_date=(new DateTime())->sub(new DateInterval('P'.($i-1).'D'))->format('Y-m-d');
        $start_date = (new DateTime())->sub(new DateInterval('P'.$i.'D'))->format('Y-m-d');
        $urlhis="https://api.weatherbit.io/v2.0/history/daily?city=" . $city . "&start_date=".$start_date."&end_date=".$end_date."&key=2c573df600fd49a7a2418ffc76978e17";
        $Data = file_get_contents($urlhis);
        $Data = json_decode($Data, true);
        $temp=$Data['data'][0]['temp'];
        $cityname=$Data['city_name'];
        $datetime=$Data['data'][0]['datetime'];

        $sql = "INSERT INTO weather (id, city, temp, date) VALUES ($i, '$cityname', $temp, '$datetime')";
        mysqli_query($mysql, $sql);
    }

    retrive($mysql);
}

function retrive($mysql){
    global $city_name1, $temp1, $temp2;

    $sql = "SELECT city FROM weather WHERE id=1";
    $row = mysqli_fetch_assoc(mysqli_query($mysql, $sql));
    $city_name1 = $row['city'];

    $sql = "SELECT temp FROM weather WHERE id=1";
    $row = mysqli_fetch_assoc(mysqli_query($mysql, $sql));
    $temp1 = $row['temp'];

    for ($i = 2; $i <= 8; $i++){
        $sql = "SELECT temp FROM weather WHERE id=$i";
        $row = mysqli_fetch_assoc(mysqli_query($mysql, $sql));
        $temp2[$i-2] = $row['temp'];
    }
}

if (isset($_GET['search'])) {
    $Searched_City_Name = $_GET['search'];
    header("Location: index.php?passed_city_name=" . urlencode($Searched_City_Name));
    exit();
}

if (!isset($_GET['passed_city_name'])) {
    $cityName = "Aylesbury Vale";
} else {
    $cityName = $_GET['passed_city_name'];
}

city($cityName);

?>