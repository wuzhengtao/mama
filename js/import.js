function readFile(obj) {
    var file = obj.files[0];
    var reader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = function (e) {
        var data = e.target.result;
        var wb = XLSX.read(data, {type: "binary"});

        //此处对excel数据进行处理
        //返回选中的sheet，当sheet只有1个时，直接返回
        // console.log(wb);
        // console.log(wb.SheetNames.length)
        if (wb.SheetNames.length == 1) {
            return wb.Sheets[wb.SheetNames[0]]
        } else if (wb.SheetNames.length == 0) {
            alert("该excel里没有表格！")
        } else {
            wsName = openSelectWindow(wb.SheetNames)
            return wb.Sheets[wsName]
        }
    };
}

function openSelectWindow(names) {
    var tg = document.getElementById("toggle")
    tg.style.display = "block"
    parentId = "toggle-select"
    for (var i = 0; i < names.length; i++) {
        createRadio(names[i], parentId)
    }
}

function createRadio(name, parentId) {
    // console.log(name)
    var radiodiv = document.createElement("div")
    var parent = document.getElementById(parentId)
    parent.appendChild(radiodiv)
    var _radio = document.createElement("input")
    _radio.type = "radio"
    _radio.name = name
    _radio.id = name
    radiodiv.appendChild(_radio)
    var _span = document.createElement("span")
    _span.innerText = name
    radiodiv.appendChild(_span)
}

function importKucun(obj) {
    ws = readFile(obj)
    console.log(ws)
}
