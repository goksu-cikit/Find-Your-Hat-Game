
# Find Your Hat Game (Codecademy Challenge)

A terminal-based adventure game where you navigate a field to find your hat (`^`) while avoiding holes (`O`). You can only move to unvisited tiles (`░`). Re-visiting tiles results in an invalid move.

## How to Play

- Use `u`, `d`, `l`, `r` to move up, down, left, and right respectively.
- The goal is to reach your hat (`^`) without falling into holes (`O`) or moving out of bounds.
- You cannot revisit previously visited positions (`*`). Doing so results in an invalid move.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/goksu-cikit/find-your-hat-game.git
   cd find-your-hat-game
   ```

2. Install dependencies:
   ```bash
   npm install prompt-sync
   ```

## Running the Game

To start the game, run:
```bash
node app.js
```

## Game Controls

- `u`: Move Up
- `d`: Move Down
- `l`: Move Left
- `r`: Move Right

## Features

- Randomly generated field with holes and a hat.
- Real-time field updates.
- Handles out of bounds and invalid moves.
- Option to play again after the game ends.

## Example

```
*░░░░░░░░░
░░░░░░O░░░
░░░░░░░O░░
░O░░░░░░░░
░░O░░░░░░░
░░░░░O░░░░
░░░░░░░░░░
░░░░O░░░░░
░░░░░░░░^░
░░░░░░░░░░
Which way? (u, d, l, r) d
```

Enjoy finding your hat!
