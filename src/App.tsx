import { useState } from "react";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

interface BoardProps {
    squares: (string | null)[];
    onPlay: (data: (string | null)[]) => void,
    xIsPlaying: boolean
}
function Board({ squares, onPlay, xIsPlaying }: BoardProps) {

  function handleClick(i: number): void {
    const winner = calculateWinner(squares);
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsPlaying ? "X" : "O";
    onPlay(nextSquares);
  }

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = `Next Player: ${xIsPlaying ? "X" : "O"}`;
  }

  function calculateWinner(squares: (string | null)[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <p className="status">{status}</p>
      <div className="board-row">
        <Square
          onSquareClick={() => {
            handleClick(0);
          }}
          value={squares[0]}
        />
        <Square
          onSquareClick={() => {
            handleClick(1);
          }}
          value={squares[1]}
        />
        <Square
          onSquareClick={() => {
            handleClick(2);
          }}
          value={squares[2]}
        />
      </div>

      <div className="board-row">
        <Square
          onSquareClick={() => {
            handleClick(3);
          }}
          value={squares[3]}
        />
        <Square
          onSquareClick={() => {
            handleClick(4);
          }}
          value={squares[4]}
        />
        <Square
          onSquareClick={() => {
            handleClick(5);
          }}
          value={squares[5]}
        />
      </div>

      <div className="board-row">
        <Square
          onSquareClick={() => {
            handleClick(6);
          }}
          value={squares[6]}
        />
        <Square
          onSquareClick={() => {
            handleClick(7);
          }}
          value={squares[7]}
        />
        <Square
          onSquareClick={() => {
            handleClick(8);
          }}
          value={squares[8]}
        />
      </div>
    </>
  );
}

function Game() {
    const [history, setHistory] = useState<(string | null)[][]>(
    [Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsPlaying = currentMove % 2 === 0;

    function handlePlay(nextSquares: (string | null)[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((_, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
      });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsPlaying={xIsPlaying} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
