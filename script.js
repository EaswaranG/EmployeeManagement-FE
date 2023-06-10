$(document).ready(function() {
    // Insert/Update Employee Form submission
    $('#employeeForm').submit(function(event) {
        event.preventDefault();
        var employeeId = $('#employeeId').val();
        var employeeName = $('#employeeName').val();
        var employeeEmail = $('#employeeEmail').val();
        var dateOfBirth = $('#dateOfBirth').val();
        var gender = $('#gender').val();
        var role = $('#role').val();
        var salary = $('#salary').val();
        var dateOfJoining = $('#dateOfJoining').val();

        // Check if the Employee ID field is empty
        if (employeeId === '') {
            alert('Employee ID is required!');
            return;
        }

        // Create data object
        var employeeData = {
            employeeId: employeeId,
            employeeName: employeeName,
            employeeEmail: employeeEmail,
            dateOfBirth: dateOfBirth,
            gender: gender,
            role: role,
            salary: salary,
            dateOfJoining: dateOfJoining
        };

        // Check if update or insert operation
        var url = 'http://your-java-microservice-url/save'; // Replace with your Java microservice URL
        var requestType = 'POST';
        if ($('#updateBtn').is(':visible')) {
            // If Update button is visible, it means we are updating an existing record
            url = 'http://your-java-microservice-url/update'; // Replace with your Java microservice URL
            requestType = 'PUT';
        }

        // Send data to the server for insert/update
        $.ajax({
            url: url,
            type: requestType,
            dataType: 'json',
            data: JSON.stringify(employeeData),
            contentType: 'application/json',
            success: function(response) {
                if (response.status === 'success') {
                    alert(response.message);
                    // Clear form fields
                    clearFormFields();
                } else {
                    alert(response.error);
                }
            },
            error: function(error) {
                alert('Error saving/updating employee data!');
                console.log(error);
            }
        });
    });

    // Update button click event
    $('#updateBtn').click(function() {
        var employeeId = $('#employeeId').val();

        // Check if the Employee ID field is empty
        if (employeeId === '') {
            alert('Employee ID is required!');
            return;
        }

        // Send request to the server to fetch the employee details for update
        $.ajax({
            url: 'http://your-java-microservice-url/get', // Replace with your Java microservice URL
            type: 'GET',
            dataType: 'json',
            data: {
                employeeId: employeeId
            },
            success: function(response) {
                // Populate the form fields with the employee details
                $('#employeeName').val(response.employeeName);
                $('#employeeEmail').val(response.employeeEmail);
                $('#dateOfBirth').val(response.dateOfBirth);
                $('#gender').val(response.gender);
                $('#role').val(response.role);
                $('#salary').val(response.salary);
                $('#dateOfJoining').val(response.dateOfJoining);

                // Hide the Save button and show the Update button
                $('#updateBtn').show();
                $('#cancelBtn').show();
                $('#submitBtn').hide();
            },
            error: function(error) {
                alert('Error retrieving employee data for update!');
                console.log(error);
            }
        });
    });

    // Cancel button click event
    $('#cancelBtn').click(function() {
        clearFormFields();
    });

    // Function to clear form fields and reset the form state
    function clearFormFields() {
        $('#employeeId').val('');
        $('#employeeName').val('');
        $('#employeeEmail').val('');
        $('#dateOfBirth').val('');
        $('#gender').val('');
        $('#role').val('');
        $('#salary').val('');
        $('#dateOfJoining').val('');

        // Hide the Update button and show the Save button
        $('#updateBtn').hide();
        $('#cancelBtn').hide();
        $('#submitBtn').show();
    }
});
