function getGrade(html_text){
    var m = {};
    let d = new DOMParser();
    let doc = d.parseFromString(html_text, 'text/html');
    let nodes = doc.querySelectorAll("#grades_table tr:not([class=grades-course-total])");
    nodes.forEach(function(ele) {
        let e = ele.getElementsByTagName('td');
        if (e.length) m[e[0].innerText]=e[1].innerText;
    })
    return m;
}
let grades_html = await (await fetch("grades/")).text();
let map = getGrade(grades_html);
let text = document.body.textContent;
let target = "open";
let GG = "will";
for (let i = 0; i < text.length - target.length; i ++) {
    if (text.substr(i, GG.length) == GG) i += 20;
    if (text.substr(i, target.length) == target) {
        var j = i - 2;
        while (text[j] != ' ') j --;
        var homeworkID = text.substr(j + 1, i - j - 2);
        if (homeworkID in map) {
            let re = new RegExp(">" + homeworkID + "<", 'g');
            document.body.innerHTML = document.body.innerHTML.replace(re, 
                                                                      ">" + homeworkID + "</a><a = style=\"color:DodgerBlue;\">  " + map[homeworkID] + "<"
                                                                     );
        }
    }
}
