(async function(){
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
    document.querySelectorAll('a[class=set-id-tooltip]').forEach(function(ele) {
        // to hide score in closed problems, please uncomment the statement below
        // if (ele.parentNode.parentNode.innerText.includes('closed')) return;
        let key = ele.innerText;
        let span = document.createElement("span");
        span.innerText = ` ${map[key]}`;
        switch (map[key]) {
            case '100%':
                span.style.color = '#008000';
                break;
            case '0%':
                span.style.color = '#ff0000';
                break;
            default:
                span.style.color = '#1e90ff';
        }
        ele.parentNode.appendChild(span);
    });
})();
