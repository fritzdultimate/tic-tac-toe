import { useEffect } from "react";
import Square from "./Square";

interface BoardProps {
    squares: (string | null)[];
    onPlay: (data: (string | null)[]) => void;
    xIsPlaying: boolean;
}
function Board({ squares, onPlay, xIsPlaying }: BoardProps) {

    useEffect(() => {
        if(!xIsPlaying) {
            const nextSquares = [...squares];
            let position = findMediumMove(nextSquares);
            handleClick(position);
        }
    }, [xIsPlaying]);

    function handleClick(i: number): void {
        const winner = calculateWinner(squares);
        if (squares[i] || winner) {
            return;
        }
        const nextSquares = [...squares];
        nextSquares[i] = xIsPlaying ? "X" : 'O';
        onPlay(nextSquares);
    }
    
    function findMediumMove(board: (string | null)[]): number {
        // try to win
        let winningMove = findWinningMove(board, 'O');
        if(winningMove !== null) {
            return winningMove;
        }

        // block opponent move
        let blockingMove = findWinningMove(board, 'X');
        if(blockingMove !== null) {
            return blockingMove;
        }

        let strategies = ['center', 'corner', 'edge'];

        if (shuffleArray(strategies)[randomNumber(strategies.length, false)] === 'center' && board[4] === null) {
            // take center
            if(board[4] === null) {
                return 4;
            }
        }

        if(emptyCells(board).length < 9 && board[4] === null) {
            return 4;
        }
        
        if(shuffleArray(strategies)[randomNumber(strategies.length, false)] === 'corner') {
            // Take a corner
            let corners = [0, 2, 6, 8];
            
            for(let corner of shuffleArray(corners)) {
                if(board[corner] === null) {
                    return corner;
                }
            }
        }

        // Take edge
        let edges = [1, 3, 5, 7];
        for(let edge of shuffleArray(edges)) {
            if(board[edge] === null) {
                return edge;
            }
        }

        // fallback to random move
        return findRandomMove(board);
    }

    function emptyCells(board: (string | null)[]) {
        return board.filter(cell => cell === null);
    }

    function shuffleArray(array: any[]) {
        for(let i = array.length - 1; i > 0; i--) {
            // pick a random index
            const randomIndex = Math.floor(Math.random() * (i + 1));
            // swap elements
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }

        return array;
    }

    function randomNumber(length: number, include: boolean) {
        return Math.abs(Math.round(Math.random() * length) - (include ? 0 : 1));
    }

    function findRandomMove(board: (string | null)[]): number {
        const emptyCells = board.map((cell, i) => cell === null ? i : null);
        const emptyCellsPositionsArray = emptyCells.filter(cell => cell !== null);
        const randomPosition = randomNumber(emptyCellsPositionsArray.length, false);
        return emptyCellsPositionsArray[randomPosition];
    }

    function findWinningMove(board: (string | null)[], player: string) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];


        for(let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if(board[a] === player && board[b] === player && board[c] === null) {
                return c;
            }
            if(board[a] === player && board[c] === player && board[b] === null) {
                return b;
            }
            if(board[b] === player && board[c] === player && board[a] === null) {
                return a;
            }
        }
        return null;
    }

    let status: string;
    let winningPositions: number[];
    const winnerObj = calculateWinner(squares);
    if (winnerObj) {
        status = "Winner: " + winnerObj.winner;
        winningPositions = winnerObj.positions;
    } else {
        status = `Next Player: ${xIsPlaying ? "X" : "O"}`;
    }

    function calculateWinner(squares: (string | null)[]): {winner: string, positions: number[]} | null {
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
            if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
                return {winner: squares[a], positions: [a, b, c]};
            }
        }
        return null;
    }

    const cols = Array(3).fill(null);
    const rows = Array(3).fill(null);

    const playground = cols.map((_, ci) => {
        return (
            <div className="board-row" key={ci}>
                {
                    rows.map((_, ri) => {
                        const position = (rows.length * ci) + ri;
                        return <Square hightlightClass={winningPositions && winningPositions.includes(position) ? 'highlight-winning-box' : ''} key={ri} onSquareClick={() => handleClick(position)} value={squares[position]} />
                    })
                }
            </div>
        )
    })

    return (
        <>
            <p className="status">{status}</p>
            {playground}
        </>
    );
}

export default Board;