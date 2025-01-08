const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resetBtn = document.getElementById("reset-btn");
const results = document.getElementById("results-div");
const currentTime = document.getElementById("current-time");
const keypad = document.querySelector(".keypad");

// current time
const updateTime = () => {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const timeString = `${hours}:${formattedMinutes} ${ampm}`;

  currentTime.textContent = timeString;
}

updateTime();

setInterval(updateTime, 1000);

// Keypad buttons
const handleKeypadClick = (value) => {
    userInput.value += value;
    toggleBackspaceButton();
}

// Backspace button
const backspaceBtn = document.createElement('button');
backspaceBtn.id = 'backspace-btn';
backspaceBtn.textContent = '⌫';
const inputWrapper = document.getElementById('input-wrapper');
inputWrapper.appendChild(backspaceBtn);
backspaceBtn.style.display = 'none';

const toggleBackspaceButton = () => {
    backspaceBtn.style.display = userInput.value.trim().length > 0 ? 'inline-block' : 'none';
}

toggleBackspaceButton();

const handleBackspace = () => {
    userInput.value = userInput.value.slice(0, -1);
    toggleBackspaceButton();
}


// User input
const clearInputAndResults = () => {
  userInput.value = "";
  
  results.classList.remove('valid' , 'invalid');
  
    results.textContent = "";
}


const validate = (phoneNumber) => {
    const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

    const isValid = phoneRegex.test(phoneNumber);

    if (isValid) {
        results.textContent = "Valid phone number!";
        results.classList.add('valid');
        results.classList.remove('invalid');
    } else {
        results.textContent = "Invalid phone number. Please try again.";
        results.classList.add('invalid');
        results.classList.remove('valid');
    }
}

// Event listeners
clearBtn.addEventListener("click", clearInputAndResults);

resetBtn.addEventListener("click", clearInputAndResults);

checkBtn.addEventListener('click', () => {
    const userInputValue = userInput.value.trim(); 
    validate(userInputValue);
});

keypad.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const value = e.target.textContent.trim();
        handleKeypadClick(value);
    }
});

backspaceBtn.addEventListener('click', handleBackspace);

userInput.addEventListener('input', toggleBackspaceButton);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const userInputValue = userInput.value.trim();
    validate(userInputValue);
  }
});

