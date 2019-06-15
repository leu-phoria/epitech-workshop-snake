
// --------------------------------
// ------- GLOBAL VARIABLES -------
// --------------------------------

// size of square tiles in pixels
const SQUARE_SIZE = 15;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 75
}

// Game boards characteristcs
const board_colour = "white";
const board_height = 26;
const board_width = 30;

// Snake characteristics
const snake = {
    color: "black",
    body_color: "blue",
    y: board_height/2, 
    x: board_width/2, 
    direction: UP,
    length: 3,
    body: [
        {x: board_width/2, y: board_height/2},
        {x: board_width/2, y: board_height/2},
        {x: board_width/2, y: board_height/2},
    ]
}

// fruit object
const fruit = {
     color: "red",
     x: get_random_number (0, board_width-1),
     y: get_random_number (0, board_height-1),

}

// -------------------------
// ------- FUNCTIONS -------
// -------------------------

// Main Drawing function, you should put all of the things that you want to draw in this function
function draw() {
    draw_board (board_width, board_height, board_colour)
    draw_snake();
    draw_fruit();
    //console.log ("drawing")
    
}

// Main loop function, this function is called every "game.speed" milliseconds.
function loop() {
    if (game.status ==="playing") {
    move_snake ();
    const fruit_eaten = isSnakeonFruit() ;
    if (fruit_eaten === true) {
        game.score = game.score +100
        update_score (game.score)
        fruit.x = get_random_number (0, board_width - 1);
        fruit.y = get_random_number (0, board_height -1);
        snake.length= snake.length +1;
        game.speed = game.speed-2;
    }
    snake_body_movement (snake.body, snake.length, {x: snake.x, y: snake.y}, fruit_eaten)
}
}

// This function is called when a key is pressed
function onKeyDown(key_pressed) {

    if (key_pressed === ARROW_DOWN && snake.direction!== UP) {snake.direction = DOWN }
    if (key_pressed === ARROW_UP &&snake.direction !== DOWN) {snake.direction = UP}
    if (key_pressed === ARROW_LEFT && snake.direction !== RIGHT) {snake.direction = LEFT}
    if (key_pressed === ARROW_RIGHT && snake.direction !== LEFT)  {snake.direction = RIGHT}    
}

// --- Functions that they will have to do ---

// Handle the snake
function draw_snake () {
    draw_square (snake.x, snake.y, snake.color)
    draw_snake_body (snake.body, snake.length, snake.body_color)
}

// Handle the fruit
function draw_fruit () {
    draw_square (fruit.x, fruit.y, fruit.color)
}

function move_snake () {
if (snake.direction ===RIGHT) {
        if (snake.x ===board_width-1) {
            snake.x = 0
        } else {
            snake.x = snake.x +1 
        }
}
if (snake.direction === DOWN) {
    if (snake.y === board_height-1) {
        snake.y = 0
    } else {
        snake.y = snake.y + 1
    } 
}
if (snake.direction === UP) {
    if (snake.y === 0) { 
        snake.y = board_height - 1
    } else {
        snake.y = snake.y -1
    }
}
if (snake.direction === LEFT) {
    if (snake.x === 0) {
        snake.x = board_width - 1
    } else {
        snake.x = snake.x -1
        }
    }
   
}

function isSnakeonFruit () {
    if (snake.x == fruit.x && snake.y == fruit.y) {
        console.log ("fruit")
        return true; 
    }
    else 
        return false

}
