<?php
function city($city){
    $url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1bb0ad32be0d73c2ed42f310d07ee508&units=metric";
    $data = file_get_contents($url);
    $data = json_decode($data, true);
    conmysql($data,$city);
}


function conmysql($data,$city){
    $localhost = "sql212.epizy.com";
    $username = "epiz_34167897";
    $password = "g9OljOD7Ul0ESel";
    $dbname = "epiz_34167897_practice";
    $mysql = mysqli_connect($localhost, $username, $password, $dbname);
    entry($mysql,$data,$city);
}

function entry($mysql,$data,$city){
    
    $cityname = $data['name'];
    $temp = $data['main']['temp'];
    
    $sql = "INSERT INTO weather (id, city, temp) VALUES (1, '$cityname', $temp)";
    $sql2="DELETE FROM weather";
    $sql3="UPDATE weather SET id = 1";
    mysqli_query($mysql,$sql2);
    mysqli_query($mysql,$sql3);
    mysqli_query($mysql,$sql);
    for ($i=1; $i<=7; $i++) {
        $date = (new DateTime())->sub(new DateInterval('P'.$i.'D'))->format('Y-m-d');
        $url = "https://api.openweathermap.org/data/2.5/weather?q=$city&appid=1bb0ad32be0d73c2ed42f310d07ee508&dt=$date";
    
        $data = file_get_contents($url);
        $data = json_decode($data, true);
    
        $temp_kelvin = $data['main']['temp'];
        $temp_celsius = round($temp_kelvin - 273.15, 2);
        $cityname = $data['name'];
        $datetime = date('Y-m-d H:i:s', $data['dt']);
    
        $sql = "INSERT INTO weather (id, city, temp) VALUES ($i+1, '$cityname', $temp_celsius)";
        mysqli_query($mysql, $sql);
    }
    
    retrive($mysql,$data);
}

function retrive($mysql,$data){
    global $city_name1, $temp1,  $temp2;
    $sql="SELECT city FROM weather WHERE id=1";
    $row=mysqli_fetch_assoc(mysqli_query($mysql, $sql));
    $city_name1=$row['city'];
    $sql="SELECT temp FROM weather WHERE id=1";
    $row=mysqli_fetch_assoc(mysqli_query($mysql, $sql));
    $temp1=$row['temp'];
    
    for ($i=2;$i<=8;$i++){
        $sql="SELECT temp FROM weather WHERE id=$i";
        $row=mysqli_fetch_assoc(mysqli_query($mysql, $sql));
        $temp2[$i-2]=$row['temp'];
    }
}
if ( isset($_GET['search']) ) 
{
    $Searched_City_Name = $_GET['search'];
    header("Location: history.php?passed_city_name=" . urlencode($Searched_City_Name));
    exit();
}

if (!isset($_GET['passed_city_name'])) {
    $cityName = "Aylesbury Vale";
} 
else  {
    $cityName = $_GET['passed_city_name'];
    
}
city($cityName);
?>