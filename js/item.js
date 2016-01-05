var pageinfo;
var name = sessionStorage.getItem('Name');

window.onload = function () {
    setInfo();

};

function test() {
    document.getElementById("press").onclick = function () { myFunction() };

    function myFunction() {
        display();
    }
}

function getInfo(filter) {
    var QUERY = 'SELECT ' + filter + ' ';
    var tableID = '1_zGuNutqyYKacVRrambMp-XAsJrcGh1of6gMym8P';
    var apiKEY = 'AIzaSyB1UwvxqckbaMFLe4DuQAObWFkbS0cLVms';
    return 'https://www.googleapis.com/fusiontables/v1/query?sql=' + QUERY + ' FROM ' + tableID + '&key=' + apiKEY
}

function setRelated() {
    
}

function setInfo() {
    var table = document.getElementsByClassName('img-responsive img-hover');

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
        var arr = arry.rows
        while (arr[x][1] != name) {
                x++;
        }
        pageinfo['name'] = arr[x][1]
        pageinfo['image'] = arr[x][2]
        pageinfo['description'] = arr[x][3]
        pageinfo['section'] = arr[x][4]

        alert(pageinfo);
    }
}
