var totalData = [];


//post the data using ajax
function add() {
    let nameEl = $("#name").val();
    console.log("name", nameEl);
    let ageEl = $("#age").val();
    let branchEl = $("#branch").val();
    const postData = {
        name: nameEl,
        age: ageEl,
        branch: branchEl
    };
    console.log("post data object", postData);
    if (nameEl === "" && ageEl === "" && branchEl === "") {
        alert("please fill the full details")
    } else {
        $.ajax({
            url: "http://localhost:3000/student",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (data) {
                totalData = data;
                // alert("holding");
                getData();
            },
            error: function () {
                alert(error);
            }
        });
    }

}
getData();
//get the data using ajax

function getData() {
    $.ajax({
        url: "http://localhost:3000/student",
        type: 'GET',
        dataType: "json",
        success: function (data) {
            totalData = data;
            console.log("this is data", totalData);
            let collectData = "";
            totalData.map(item => {
                collectData += `
                <tr>
                <th>${item.id}</th>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.branch}</td>
                <td><button type="button" class="btn btn-primary" onclick="updateData(${item.id})">Update</button></td>
                <td><button type="button" class="btn btn-danger" onclick = "remove(${item.id})">Remove</button></td>
                </tr>`;
            });
            $("#tableData").html(collectData);
        },
        error: function () {
            alert("You got an error");
        }
    });
}

//update the record using ajax

function updateData(id) {
    let z = totalData.find(item => item.id === id);
    console.log("id based data", z);
    $("#name").val(z.name);
    $("#age").val(z.age);
    $("#branch").val(z.branch);
    $("#ahead").css('display', 'none');
    $("#ehead").css('display', 'block');
    $("#adbtn").css('display', 'none');
    $("#edbtn").css('display', 'block');
    $('#edbtn').click(function () {
        let nameEl = $('#name').val();
        let ageEl = $('#age').val();
        let branchEl = $('#branch').val();
        console.log(nameEl, "name");
        let UpdateData = {
            name: nameEl,
            age: ageEl,
            branch: branchEl
        }
        const url = "http://localhost:3000/student";
        $.ajax({
            url: `${url}/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(UpdateData),
            success: function (data) {
                console.log("Updated", data);
            },
            error: function (error) {
                alert("Invalid URL or an error occurred");
            }
        });
    });

}

//Delete the data by using ajax 

function remove(id) {
    const url = `http://localhost:3000/student/${id}`;

    $.ajax({
        url: url,
        type: 'DELETE',
        success: function() {
            console.log("Record Deleted Successfully...!");
        },
        error: function(error) {
            alert("Failed to delete student. Please try again later.");
        }
    });
}


