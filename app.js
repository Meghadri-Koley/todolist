is_Blank = function (input1, input2) {
    if (input1.length === 0 && input2.length === 0){
        alert("Inputs cannot be empty");
        return false;
    }
    else{
        return true;
    }
}
function getandupdate() {
    title = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (is_Blank(title, desc)) {
        if (localStorage.getItem('itemsJson') == null) {
            itemsJsonArray = [];
            itemsJsonArray.push([title, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
        }
        else {
            itemsJsonArrayStr = localStorage.getItem('itemsJson');
            itemsJsonArray = JSON.parse(itemsJsonArrayStr);
            itemsJsonArray.push([title, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
        }
        update();
    }
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    }
    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str +=
            `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button type="button" onclick="deleted(${index})" class="btn btn-sm btn-danger">Delete</button></td>
        </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getandupdate);
update();
function deleted(itemIndex) {
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    itemsJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    update();
}
function clearstor() {
    if (confirm("Are you sure, you want to empty the list?")) {
        localStorage.clear();
        update();
    }
}