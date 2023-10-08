window.onload = function () {
    getCurrentLocation();
};
function getCurrentLocation() {
    fetch("http://ip-api.com/json")
        .then(response => response.json())
        .then(data => {
            var city = data.city;
            var state = data.regionName;
            var country = data.country;

            document.getElementById("city").value = city;
            document.getElementById("state").value = state;
            document.getElementById("country").value = country
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

    
function submitForm(event) {
    var formData = new FormData(document.getElementById("myform"));
    console.log(formData);
    // Send the form data to the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://script.google.com/macros/s/AKfycby4yueR-z-wWW9YZbzRVf_wBamXc0t9YucPJ2vvxhJ5ulKey9s3oawX3QpKLvjk0ydAUw/exec", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Handle a successful response
            var response = JSON.parse(xhr.responseText);
            if (response.result === "success") {
                // Show a success message
                document.querySelector(".sent-message").style.display = "block";
            } else {
                // Show an error message
                document.querySelector(".error-message").textContent = response.error;
                document.querySelector(".error-message").style.display = "block";
            }
        } else {
            // Handle an error
            console.error("Error:", xhr.statusText);
        }
        document.querySelector(".loading").style.display = "none";
    };
    xhr.onerror = function () {
        // Handle a network error
        console.error("Network Error");
        document.querySelector(".loading").style.display = "none";
    };
    xhr.send(formData);
    document.querySelector(".loading").style.display = "block";
}
