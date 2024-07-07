const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter; // Starting point
  }

  print() {
    // Use ANSI escape code to clear the screen
    process.stdout.write('\x1B[2J\x1B[0f');
    for (let row of this.field) {
      console.log(row.join(''));
    }
  }

  updateCursor(x, y) {
    // Move the cursor to the specified position
    process.stdout.write(`\x1b[${y + 1};${x + 1}H`);
    process.stdout.write(this.field[y][x]);
  }

  askQuestion() {
    // Move the cursor to the position after the field before asking for input
    process.stdout.write(`\x1b[${this.field.length + 2};0H`);
    const direction = prompt('Which way? (u, d, l, r) ').toLowerCase();
    switch (direction) {
      case 'u':
        this.locationY -= 1;
        break;
      case 'd':
        this.locationY += 1;
        break;
      case 'l':
        this.locationX -= 1;
        break;
      case 'r':
        this.locationX += 1;
        break;
      default:
        console.log('Invalid input. Please enter u, d, l, or r.');
        return this.askQuestion();
    }
  }

  isInBounds() {
    return (
      this.locationX >= 0 &&
      this.locationY >= 0 &&
      this.locationX < this.field[0].length &&
      this.locationY < this.field.length
    );
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isVisited() {
    return this.field[this.locationY][this.locationX] === pathCharacter;
  }

  updateField() {
    this.field[this.locationY][this.locationX] = pathCharacter;
    this.updateCursor(this.locationX, this.locationY);
  }

  runGame() {
    // Clear the screen and print the initial field
    process.stdout.write('\x1B[2J\x1B[0f');
    this.print();
    let playing = true;
    while (playing) {
      this.askQuestion();

      if (!this.isInBounds()) {
        console.log('Out of bounds instruction! Game Over.');
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('You fell in a hole! Game Over.');
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('You found your hat! You win!');
        playing = false;
        break;
      } else if (this.isVisited()) {
        console.log('Invalid move. You have already visited this location.');
      } else {
        this.updateField();
      }
    }

    const playAgain = prompt('Would you like to play again? (y/n) ').toLowerCase();
    if (playAgain === 'y') {
      this.resetGame();
      this.runGame();
    } else {
      console.log('Thanks for playing!');
    }
  }

  resetGame() {
    this.locationX = 0;
    this.locationY = 0;
    this.field = Field.generateField(this.field.length, this.field[0].length, 0.2);
    this.field[0][0] = pathCharacter;
    process.stdout.write('\x1B[2J\x1B[0f');
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(() => new Array(width));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };

    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }

    field[hatLocation.y][hatLocation.x] = hat;

    return field;
  }
}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();