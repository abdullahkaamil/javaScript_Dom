
var $ = document;
var items = []; //to store items
var editStatus = false; //to indicate the editStatus
var editIndex; //to indicate the current item is being edited
var startTableCode = "<table border=2 margin='auto'><tr><th>Name</th><th>Country</th><th>Age</th><th></th></tr>";
var displayCode = "";
var addNewRowCode = '<tr><td><input type="text" id="name"></input></td><td><input type="text" id="country"></input></td><td><input type="text" id="age"></input></td><td><input type="button" value="Add Row" id="addButton"></input></input></td></tr>';
var endTableCode = "</table>";

document.addEventListener("DOMContentLoaded", () => {
    $.getElementById("PlaceHolder").innerHTML = startTableCode + displayCode + addNewRowCode + endTableCode;
    RegisterAddEvent();
});

function RegisterAddEvent() {
    $.getElementById("addButton").addEventListener("click", () => {
        var item = [$.getElementById("name").value, $.getElementById("country").value, $.getElementById("age").value];
        items.push(item);
        DisplayItemsAndRegisterEvents();
    });
}

function DisplayItemsAndRegisterEvents() {
    DisplayItems();
    RegisterAddEvent();
    RegisterDeleteEvents();
    RegisterEditEvents();
    RegisterSaveEvents();
    editStatus = false;
    editIndex = -1; //reset editStatus after other opration
}

function DisplayItems() {
    var i = 0; //indicate the index of the items which corresponding with the index of the Array
    displayCode = ""; //clear html code created before
    items.forEach((x) => {
        displayCode += '<tr><td>' + x[0] + '</td><td>' + x[1] + '</td><td>' + x[2] + '</td><td><input type="button" value="Edit" class="Edit"  name="' + i + '"></input><input type="button" value="Save" class="Save" name="' + i + '"></input><input type="button" value="Delete" class="Delete" name="' + i + '"></td></tr>';
        i++;
    });
    $.getElementById("PlaceHolder").innerHTML = startTableCode + displayCode + addNewRowCode + endTableCode;
}
//delete function 
function RegisterDeleteEvents() {
    var btnDeletes = $.getElementsByClassName("Delete");
    Array.from(btnDeletes).forEach((x) => {
        x.addEventListener("click", (e) => {
            var position = e.target.name;
            items.splice(position, 1);
            DisplayItemsAndRegisterEvents();
        });
    });
}

function RegisterEditEvents() {
    var btnEdits = $.getElementsByClassName("Edit");
    Array.from(btnEdits).forEach((x) => {
        x.addEventListener("click", (e) => {
            if (editStatus) { return; }
            editStatus = true;
            editIndex = e.target.name; //keep the index for the verification in the Save opreation
            var name = e.target.parentNode.parentNode.firstChild; //name
            var nameValue = name.innerHTML;
            var editName = $.createElement("input");
            name.innerHTML = "";
            editName.value = nameValue;
            editName.setAttribute("className", "intput");
            name.appendChild(editName);
            var country = e.target.parentNode.parentNode.firstChild.nextSibling; //country
            var countryValue = country.innerHTML;
            var editCountry = $.createElement("input");
            country.innerHTML = "";
            editCountry.value = countryValue;
            country.appendChild(editCountry);
            var age = e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling; //age
            var ageValue = age.innerHTML;
            var editAge = $.createElement("input");
            age.innerHTML = "";
            editAge.value = ageValue;
            age.appendChild(editAge);
        });
    });
}

function RegisterSaveEvents() {
    var btnSaves = $.getElementsByClassName("Save");
    Array.from(btnSaves).forEach((x) => {
        x.addEventListener("click", (e) => {
            if (!editStatus) { return; } //verify the editStatus
            var index = e.target.name;
            if (index != editIndex) { return; } //verify the current item
            var nameValue = e.target.parentNode.parentNode.firstChild.firstChild.value;
            var countryValue = e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.value;
            var ageValue = e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.value;
            items[index] = [nameValue, countryValue, ageValue];
            DisplayItemsAndRegisterEvents();
        });
    });
}