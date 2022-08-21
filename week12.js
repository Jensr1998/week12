//Variables
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let guests = document.getElementById("guests");
let add = document.getElementById("add");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};


let data = [{}];


let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    
    //stores data in browser
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createGuests();
};


let createGuests = () => {
    guests.innerHTML = "";
    data.map((x, y) => {
        return (guests.innerHTML += `
    <div id=${y}>
          <span class="fw-bolder fs-5">${x.text}</span>
          <span class="small text-info" >${x.date}</span>
          <p class="fs-6">${x.description}</p>
  
          <span class="options">
            <i onClick= "editGuests(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteGuests(this);createGuests()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
    });

    resetForm();
};

// deletes guests
let deleteGuests = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

};

// Edits guests function
let editGuests = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteGuests(e);
};

// resets the form
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createGuests();
})();