let radioBtns = document.querySelectorAll(".radioBtn");
let radioChecked = document.querySelectorAll(".radioChecked");


radioBtns.forEach(btn => {
    btn.addEventListener("click", (e) =>{
        reset();
        e.currentTarget.style.display = "none";
        let index = [].indexOf.call(radioBtns, e.currentTarget);
        radioChecked[index].style.display = "block";
        console.log(e.currentTarget.nextElementSibling.innerHTML); 
    })
});

const reset = () => {
    radioBtns.forEach(btn => {
        btn.style.display = "";
    })
    
    radioChecked.forEach(btn => {
        btn.style.display = "none";
    }) 
} 
/*
radioBtns.map((btn) => {
    btn.addEventMistener("click", (e) =>{
        e.currentTarget.style.display = "none";

    })
})
*/