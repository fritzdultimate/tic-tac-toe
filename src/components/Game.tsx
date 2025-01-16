import { useState } from "react";
import Board from "./Board";

function Game() {
    const [history, setHistory] = useState<(string | null)[][]>(
    [Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsPlaying = currentMove % 2 !== 0;

    function handlePlay(nextSquares: (string | null)[]): void{
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
                { 
                    currentMove && currentMove == move ? 
                    <span className="on-move">You are at move # {move}</span>
                    :
                    <button className="btn" onClick={() => jumpTo(move)}>
                        { description }
                    </button>
                }
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsPlaying={xIsPlaying} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info bg-red-200">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;