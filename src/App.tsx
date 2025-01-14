import { useState } from "react";

interface SquareProps {
    value: string | null,
    onSquareClick: () => void
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board() {
    const [xIsPlaying, setXIsPlaying] = useState<boolean>(true);
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

    function handleClick (i: number): void {
        const winner = calculateWinner(squares);
        if(squares[i] || winner) {
            return;
        }
        const nextSquares = [...squares];
        nextSquares[i] = xIsPlaying ? 'X' : 'O';
        setSquares(nextSquares);
        setXIsPlaying(!xIsPlaying);            
    }

    let status;
    const winner = calculateWinner(squares);
    if(winner) {
        status = 'Winner: ' + winner;
    } else {
        status = `Next Player: ${xIsPlaying ? 'X' : 'O'}`;
    }

    function calculateWinner(squares: (string | null)[]): string | null {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

  
        for(let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

  return (
    <>
        <p className="status">{status}</p>
        <div className="board-row">
            <Square onSquareClick={() => {handleClick(0)}} value={squares[0]} />
            <Square onSquareClick={() => {handleClick(1)}} value={squares[1]} />
            <Square onSquareClick={() => {handleClick(2)}} value={squares[2]} />
        </div>

        <div className="board-row">
            <Square onSquareClick={() => {handleClick(3)}} value={squares[3]} />
            <Square onSquareClick={() => {handleClick(4)}} value={squares[4]} />
            <Square onSquareClick={() => {handleClick(5)}} value={squares[5]} />
        </div>

        <div className="board-row">
            <Square onSquareClick={() => {handleClick(6)}} value={squares[6]} />
            <Square onSquareClick={() => {handleClick(7)}} value={squares[7]} />
            <Square onSquareClick={() => {handleClick(8)}} value={squares[8]} />
        </div>
    </>
  );
}

export default Board;
