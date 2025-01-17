import { useEffect } from "react";
import Playground from "./Playground";

interface BoardProps {
    squares: (string | null)[];
    onPlay: (data: (string | null)[]) => void;
    xIsPlaying: boolean;
    isDraw: (board: (string | null)[]) => boolean;
    calculateWinner: (squares: (string | null)[]) => {winner: string, positions: number[]} | null
}
function Board({ squares, onPlay, xIsPlaying, isDraw, calculateWinner }: BoardProps) {
    useEffect(() => {
        if(!xIsPlaying) {
            const nextSquares = [...squares];
            let position = findRandomMove(nextSquares);
            let i = findBestMoveWithMinimax(nextSquares);
            console.log(i);
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

    function findBestMoveWithMinimax(board: (string | null)[]): number {
        let bestScore = -Infinity;
        let bestMove = null;

        for(let i = 0; i < board.length; i++) {
            if(board[i] === null) {
                // simulate move
                board[i] = 'O';
                let score = minimax(board, 0, false, -Infinity, Infinity);
                board[i] = null;

                if(score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        if(bestMove !== null) {
            return bestMove
        }
        return findMediumMove(board);
    }


    function minimax(board: (string | null)[], depth: number, isMaximizing: boolean, alpha: number, beta: number): number {
        let winnerObj = calculateWinner(board);
        if(winnerObj?.winner === 'O') return 10 - depth;
        if(winnerObj?.winner === 'X') return depth - 10;
        if(isDraw(board)) return 0;

        if(isMaximizing) {
            let bestScore = -Infinity;
            for(let i = 0; i < board.length; i++) {
                if(board[i] === null) {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false, alpha, beta);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);

                    if(beta <= alpha) {
                        break;
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for(let i = 0; i < board.length; i++) {
                if(board[i] === null) {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true, alpha, beta);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);

                    if(beta <= alpha) {
                        break;
                    }
                }
            }
            return bestScore;
        }
    }

    const cells = Array(9).fill(null);
    return (
        <>
            <div className="w-full">
                <Playground cells={cells} squares={squares} calculateWinner={calculateWinner} handleClick={handleClick} />
            </div>
        </>
    );
}

export default Board;