// Array containing all possible characters for a hex code.
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// Get references to our HTML elements.
const btn = document.getElementById('btn');
const colorSpan = document.querySelector('.color-value');

console.log(btn);

// Add a 'click' event listener to the button.
// This function will run every time the button is clicked.
btn.addEventListener('click', function() {
    console.log('Button Clicked');
    let hexColor = '#';

    // Loop 6 times to generate 6 characters for the hex code.
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
    }

    colorSpan.textContent = hexColor;
    
    // Update the background color of the entire page.
    document.body.style.backgroundColor = hexColor;
});

// A helper function to generate a random number between 0 and the length of the hex array.
function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}