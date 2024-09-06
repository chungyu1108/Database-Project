
// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputFirstName = document.getElementById("input-firstname-update"); // Change this line
    let inputLastName = document.getElementById("input-lastname-update");

    // Get the values from the form fields
    let usersID = inputFullName.value;
    let inputFirstNameValue = inputFirstName.value; // Change this line
    let inputLastNameValue = inputLastName.value;

    // ...

    // Put our data we want to send in a javascript object
    let data = {
        usersID: usersID,
        updatedFirstName: inputFirstNameValue, // Change this line
        updatedLastName: inputLastNameValue,
    }



    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-user-ajax", true);

    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, usersID);


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, usersID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("user-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == usersID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let firstNameTd = updateRowIndex.getElementsByTagName("td")[0];
            let lastNameTd = updateRowIndex.getElementsByTagName("td")[1];

            firstNameTd.innerHTML = parsedData[0].firstName;
            lastNameTd.innerHTML = parsedData[0].lastName;
        }
    }
}
