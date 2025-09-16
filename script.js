let formObj = {
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
    validForm: true
};

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("emailAdress");
const message = document.getElementById("message");

const radioChecked = document.querySelectorAll(".radioChecked");
const radioBtns = document.querySelectorAll(".radioBtn");
const radioCont = document.querySelectorAll(".radioCont");
const checkBoxCont = document.querySelector(".checkBoxCont");
const radioFlex = document.querySelector(".radioFlex");
const submitBtn = document.getElementById("submitBtn");

const reset = () => {
    radioCont.forEach(cont => {
        cont.classList.remove("clickedRadio");
    })

    radioBtns.forEach(btn => {
        btn.style.display = "";
    })

    radioChecked.forEach(btn => {
        btn.style.display = "none";
    })
}
radioCont.forEach(cont => {
    cont.addEventListener("click", (e) => {
        formObj["queryType"] = e.currentTarget.children[2].innerHTML;
        reset();
        e.currentTarget.children[0].style.display = "block";
        e.currentTarget.children[1].style.display = "none";
        e.currentTarget.classList.add("clickedRadio");
    })
});

radioCont.forEach(cont => {
    cont.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            formObj["queryType"] = e.currentTarget.children[2].innerHTML;
            reset();
            e.currentTarget.children[0].style.display = "block";
            e.currentTarget.children[1].style.display = "none";
        }
    });
});

const inputFunc = (field, key) => {
    field.addEventListener("input", () => {
        formObj[key] = field.value;
    });
}

inputFunc(firstName, "firstName");
inputFunc(lastName, "lastName");
inputFunc(email, "email");
inputFunc(message, "message");

checkBoxCont.addEventListener("click", () => {
    if (checkBoxCont.children[0].style.display == "none") {
        checkBoxCont.children[0].style.display = "block";
        checkBoxCont.children[1].style.display = "none";
        formObj["consent"] = false;
    } else {
        formObj["consent"] = true;
        checkBoxCont.children[0].style.display = "none";
        checkBoxCont.children[1].style.display = "block";
    }
});

checkBoxCont.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (checkBoxCont.children[0].style.display == "none") {
            checkBoxCont.children[0].style.display = "block";
            checkBoxCont.children[1].style.display = "none";
            formObj["consent"] = false;
        } else {
            formObj["consent"] = true;
            checkBoxCont.children[0].style.display = "none";
            checkBoxCont.children[1].style.display = "block";
        }
    }
});

const validateInput = (field, key) => {
    if (formObj[key] == "") {
        field.nextElementSibling.style.display = "block";
        field.classList.add("errorBorder");
        formObj["validForm"] = false;
    } else {
        field.nextElementSibling.style.display = "none";
        field.classList.remove("errorBorder");
    }
}
const validateEmail = () => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const emailValid = email.value.match(emailPattern);
    if (emailValid) {
        email.nextElementSibling.style.display = "none";
        email.classList.remove("errorBorder");
    } else {
        email.nextElementSibling.style.display = "block";
        email.classList.add("errorBorder");
        formObj["validForm"] = false;
    }
}

const validateRadio = () => {
    if (formObj["queryType"] == "") {
        radioFlex.nextElementSibling.style.display = "block";
        formObj["validForm"] = false;
    } else {
        radioFlex.nextElementSibling.style.display = "none";
    }
}

const validateCheckbox = () => {
    if (formObj["consent"] == false) {
        checkBoxCont.nextElementSibling.style.display = "block";
        formObj["validForm"] = false;
    }
    else {
        checkBoxCont.nextElementSibling.style.display = "none";
    }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formObj["validForm"] = true;
    validateInput(firstName, "firstName");
    validateInput(lastName, "lastName");
    validateEmail();
    validateRadio();
    validateInput(message, "message");
    validateCheckbox();
    if (formObj["validForm"] == true) {
        Toastify({
            text: ` 
            <div">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <img src="assets/images/icon-success-check.svg"/>
                    <strong>Message Sent!</strong>
                </div>
                <p>
                Thanks for completing the form. We'll be in touch soon!
            </p>
        </div>`,
            className: "info",
            position: "center",
            escapeMarkup: false,
            style: {
                background: "var(--clr-grey-900)",
                borderRadius: "8px"
            }
        }).showToast();

        console.log(formObj);
        document.querySelector("form").reset();
        checkBoxCont.children[0].style.display = "block";
        checkBoxCont.children[1].style.display = "none";
        reset();
        formObj = { ...formObj, firstName: "", lastName: "", email: "", queryType: "", message: "", consent: false, validForm: true };
    }
});
