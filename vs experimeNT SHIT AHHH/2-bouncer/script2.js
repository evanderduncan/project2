const checkbox = document.getElementById('myCheckbox');
const button = document.getElementById('myButton');

function handleCheckboxChange(){
    var checkbox = document.getElementById("myCheckbox");
    if (checkbox.checked){
        console.log("checkbox is checked");
    }else{
        console.log("Checkbox is not checked")
    }
}

checkbox.addEventListener('change'), (event) => {
    if(event.target.checked){
        button.style.display = 'block';
    } else{
        button.style.display = 'none';
    }
}