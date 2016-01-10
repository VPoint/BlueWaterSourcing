window.onload = function () {
    name = window.location.hash.substring(1);
    alert(name);
    displayInfo();
};

function displayInfo() {
    setInfo();
    setRelated();
}

function getInfo(filter) {
    var QUERY = 'SELECT ' + filter + ' ';
    var tableID = '1_zGuNutqyYKacVRrambMp-XAsJrcGh1of6gMym8P';
    var apiKEY = 'AIzaSyB1UwvxqckbaMFLe4DuQAObWFkbS0cLVms';
    return 'https://www.googleapis.com/fusiontables/v1/query?sql=' + QUERY + ' FROM ' + tableID + '&key=' + apiKEY
}

function setRelated() {
    var table = document.getElementsByClassName('img-related');
    var tableLink = document.getElementsByClassName('img_link');

    var xmlhttp = new XMLHttpRequest();
    var url = getInfo('*');

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arry) {
        var selection = [];
        var i, x;
        x = 0;
        var arr = arry.rows
        for (i = 0; i < table.length; i++) {
            while (arr[x][4] != window.section) {
                x++;
            }
            selection.push({ pic: arr[x][2], obj_id: arr[x][1], obj_url: 'catalogue-item.html' + '#' + arr[x][1] });
            table[i].src = arr[x][2];
            table[i].id = arr[x][1];
            tableLink[i].href = 'catalogue-item.html' + '#' + arr[x][1];
            tableLink[i].onclick = function () { location.reload() }
            x++;
        }
    }
}

function setInfo() {

    var xmlhttp = new XMLHttpRequest();
    var url = getInfo('*');

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arry) {
        var i, x;
        x = 0;
        var arr = arry.rows;
        while (arr[x][1] != window.name) {
            x++;
        }
        alert(arr[x][1], arr[x][2], arr[x][3], arr[x][4]);
        document.getElementById('page-header').innerHTML = arr[x][1];
        document.getElementById('prod-title').innerHTML = arr[x][1];
        document.getElementById('prod-description').innerHTML = arr[x][3];
        document.getElementById('lead-image').src = arr[x][2];
        section = arr[x][4];
    }
}