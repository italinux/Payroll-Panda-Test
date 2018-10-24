/*!
 * Simple Accordition
 * Matteo Montanari - 19/07/2018
 * for PayRollPanda
 */

var i;

/* - - - - - - - - - - - - - - - - - - - - - - -
 * Accordition
 */
var toggle = document.getElementsByClassName("toggle");

for (i = 0; i < toggle.length; i++) {
    toggle[i].addEventListener("click", function() {

        // toggle "active" class
        this.classList.toggle("active");

        // toggle the active panel
        var panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

/* - - - - - - - - - - - - - - - - - - - - - - -
 * Tooltips
 */
var tooltip = document.getElementsByTagName("input");

for (i = 0; i < tooltip.length; i++) {
    // ONLY input types text
    if (tooltip[i].type == 'text') {
        tooltip[i].addEventListener("focus", function() {

            // trim value
            this.value = this.value.trim();

            // clean up classes
            this.classList.remove("required");

            // tooltip show
            this.nextElementSibling.style.visibility = "visible";
        });
        tooltip[i].addEventListener("blur", function() {

            // tooltip hide
            this.nextElementSibling.style.visibility = "hidden";
        });
    }
}
