window.onload = function () {
    select = window.location.hash.substring(1);
    defClick();

    if (section != null) {
        changeCategory(defObj());
        changeSection(window.select);
    }
    else {
        display();
    }
    
};

function defObj(){
    var anchors = document.getElementsByClassName('list-group-item');
    for (j = 0; j < anchors.length; j++) {
        if (anchors[j].id == window.select) {
            return anchors[j];
        }
    }
}

function defClick() {
    var anchors = document.getElementsByClassName('list-group-item');
    anchors[0].onclick = function () { changeCategory(anchors[0]); changeSection('Art') }
    anchors[1].onclick = function () { changeCategory(anchors[1]); changeSection('Math') }
    anchors[2].onclick = function () { changeCategory(anchors[2]); changeSection('Language') }
    anchors[3].onclick = function () { changeCategory(anchors[3]); changeSection('Science') }
    anchors[4].onclick = function () { changeCategory(anchors[4]); changeSection('Play') }
    anchors[5].onclick = function () { changeCategory(anchors[5]); changeSection('Teacher') }
    anchors[6].onclick = function () { changeCategory(anchors[6]); changeSection('Class') }
}

function changeCategory(object) {
    if (document.getElementById(object.id).className.match('list-group-item active')) {
        document.getElementById(object.id).className = document.getElementById(object.id).className.replace(' active ', '');
        alert('Nothing Selected, please choose a section');
    }
    else {
        document.getElementById(object.id).className += " active ";
        document.getElementById('section').innerHTML = document.getElementById(object.id).innerHTML.valueOf();
    }
}

function getInfo(filter) {
    var QUERY = 'SELECT ' + filter + ' ';
    var tableID = '1_zGuNutqyYKacVRrambMp-XAsJrcGh1of6gMym8P';
    var apiKEY = 'AIzaSyB1UwvxqckbaMFLe4DuQAObWFkbS0cLVms';
    return 'https://www.googleapis.com/fusiontables/v1/query?sql=' + QUERY + ' FROM ' + tableID + '&key=' + apiKEY
}

function changeSection(sec) {
    var table = document.getElementsByClassName('img-responsive img-hover');
    var titles = document.getElementsByClassName('caption');
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
        var i, x;
        x = 0;
        var arr = arry.rows
        for (i = 0; i < table.length; i++) {
            while (arr[x][4] != sec) {
                x++;
            }
            table[i].src = arr[x][2];
            table[i].id = arr[x][1];
            titles[i].innerHTML = arr[x][1];
            tableLink[i].href = 'catalogue-item.html' + '#' + arr[x][1];
            x++;
        }
    }
}

function display() {
    var table = document.getElementsByClassName('img-responsive img-hover');
    var titles = document.getElementsByClassName('caption');
    var tableLink = document.getElementsByClassName('img_link');

    var xmlhttp = new XMLHttpRequest();
    var url = getInfo('Image, Name');

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arry) {
        var i;
        var arr = arry.rows
        for (i = 0; i < table.length; i++) {
            table[i].src = arr[i][0];
            titles[i].innerHTML = arr[i][1];
            tableLink[i].href = 'catalogue-item.html' + '#' + arr[i][1];
        }
    }
}
