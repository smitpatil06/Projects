let count = 0;
const btn = document.querySelectorAll(".btn");
const value = document.getElementById("value");

console.log(btn);
btn.forEach(function (btn) {

    btn.addEventListener("click", function (e) {
        console.log("button clicked");

        const styles = e.currentTarget.classList;

        console.log(styles);

        
    if (styles.contains('decrease')) {
            count--;
        } else if (styles.contains('increase')) {
            count++;
        } else {
            count = 0;
        }
        value.textContent = count;
    });


});



