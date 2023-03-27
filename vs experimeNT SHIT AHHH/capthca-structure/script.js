console.log("Hello world!");

function verifyCaptcha(){
    var captchaInput = document.getElementById("captcha-input").value;
    console.log("Input text:", captchaInput);
    // Perform CAPTCHA verification logic here
    if (captchaInput === "heyo"){
        console.log("Input matches expected value");
        document.getElementById("captcha-status").innerHTML = " ";
        document.getElementById("captcha-container").style.display = "none";
        document.getElementById("continue-container").style.display = "block";
    } else{

        console.log("Input does not match expected value");
        document.getElementById("captcha-status").innerHTML = "Incorrect CAPTCHA code. Please try again. ";
    }
}

const button = document.querySelector('#myButton');

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#myButton');

    button.addEventListener('click', () => {
      console.log('Button clicked!');
    });
  });

