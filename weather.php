<?php

function entry($mysql, $city){
    $sql2 = "DELETE FROM weather";
    $sql3 = "UPDATE weather SET id = 1";
    mysqli_query($mysql, $sql2);
    mysqli_query($mysql, $sql3);

    $start = strtotime("-7 days"); // Start date 7 days ago
    $end = time(); // Current timestamp

    $url = "https://api.weatherbit.io/v2.0/history/daily?city=" . urlencode($city) . "&start_date=".$start."&end_date=".$end."&key=2c573df600fd49a7a2418ffc76978e17";

    $data = file_get_contents($url);
    $data = json_decode($data, true);

    $i = 1;
    foreach ($data['list'] as $dataval) {
        $temp_kelvin = $dataval['main']['temp'];
        $temp_celsius = round($temp_kelvin - 273.15, 2);
        $cityname = $dataval['name'];
        $datetime = date('Y-m-d H:i:s', $dataval['dt']);

        $sql = "INSERT INTO weather (id, city, temp) VALUES ($i, '$cityname', $temp_celsius)";
        mysqli_query($mysql, $sql);

        if ($i >= 2 && $i <= 8) {
            $temp2[$i - 2] = $temp_celsius;
        }

        $i++;
    }
}

function retrive($mysql){
    global $temp2;

    for ($i = 2; $i <= 7; $i++){
        $sql = "SELECT temp FROM weather WHERE id = $i";
        $row = mysqli_fetch_assoc(mysqli_query($mysql, $sql));
        $temp2[$i - 2] = $row['temp'];
    }
}

if (isset($_GET['search'])) {
    $Searched_City_Name = $_GET['search'];
    header("Location:index.php?passed_city_name=" . urlencode($Searched_City_Name));
    exit();
}

if (!isset($_GET['passed_city_name'])) {
    $cityName = "Aylesbury Vale";
} else {
    $cityName = $_GET['passed_city_name'];
}

$con = mysqli_connect("localhost", "root", "", "weather app 3");
entry($con, $cityName);
retrive($con);
