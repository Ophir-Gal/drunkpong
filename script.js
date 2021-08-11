const d_select = document.querySelector.bind(document)

// Set up Constants & Variables
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const ESC_KEY = 27;

function keyPress(event) {
    switch (event.which) {
        case UP_KEY:
            $('#right-paddle').css('top', $('#right-paddle').position().top - 20)
            break;
        case DOWN_KEY:
            $('#right-paddle').css('top', $('#right-paddle').position().top + 20)
            break;
    }
}
