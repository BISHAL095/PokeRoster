const input = document.getElementById("trainer_name");
const hiddenInput = document.getElementById("trainer_id");
const options = document.querySelectorAll("#trainers-list option");

input.addEventListener("input", function () {
    hiddenInput.value = ""; 

    options.forEach(option => {
    if (option.value === input.value) {
        hiddenInput.value = option.dataset.id;
    }
    });
});