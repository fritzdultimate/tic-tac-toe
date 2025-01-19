import { useEffect, useState } from "react";
import Board from "./Board";
import Statistics from "./Statistics";
import { SlRefresh } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

function Game() {
    const GAMELOCALSTORAGE = localStorage.getItem('tic-tac-toe');
    type STORAGETYPE = {
        X: [];
        O: [];
        next: string;
        tie: [];
        settings: {}
    }
    if(!GAMELOCALSTORAGE) {
        let state: STORAGETYPE = {
            X: [],
            O: [],
            next: '',
            tie: [],
            settings: {}
        };
        localStorage.setItem('tic-tac-toe', JSON.stringify(state));
    }
    const [history, setHistory] = useState<(string | null)[][]>(
    [Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [scores, setScores] = useState<{X: number, O: number, tie: number}>({X: 0, O: 0, tie: 0});
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [xIsPlaying, setXIsPlaying] = useState<boolean>(false);
    const currentSquares = history[currentMove];
    let storage = getStorage('tic-tac-toe', null);
    if(!storage.next) updateStorage('tic-tac-toe', 'next', 'X');
    const nextPlayer = storage.next === 'O' ? storage.next : 'X';
    // const xIsPlaying = nextPlayer === 'X';

    useEffect(() => {
        setXIsPlaying(nextPlayer === 'X');
        let storage = getStorage('tic-tac-toe', null);
        if(storage) {
            setScores({
                ...scores,
                X: storage.X.length,
                O: storage.O.length,
                tie: storage.tie.length
            })
        }
        const winnerObj = calculateWinner(currentSquares);
        if (winnerObj) {
            let player = getStorageItem('tic-tac-toe', winnerObj.winner);
            player.push(currentSquares);
            updateStorage('tic-tac-toe', winnerObj.winner, player);

            setScores({
                ...scores,
                [winnerObj.winner]: player.length
            })


        } else if(isDraw(currentSquares)) {
            updateStorage('tic-tac-toe', 'next', xIsPlaying ? 'O' : 'X');
            // setIsPlaying(false);
            let tie = getStorageItem('tic-tac-toe', 'tie');
            tie.push(currentSquares);
            updateStorage('tic-tac-toe', 'tie', tie);
            setScores({
                ...scores,
                tie: tie.length
            })
        }
    }, [history])

    function updateStorage(storage: string, key: string, data: (string | {})): void {
        const storageDataString = localStorage.getItem(storage);
        if(storageDataString) {
            let parseData = JSON.parse(storageDataString);
            parseData = {...parseData, [key]: data}

            localStorage.setItem(storage, JSON.stringify(parseData));
        }
    }

    function getStorage(storage: string, key: (string | null)): {X: [], O: [], next: string, tie: [], settings: {}} {
        const storageDataString = localStorage.getItem(storage);
        if(storageDataString) {
            let parseData = JSON.parse(storageDataString);
            return key ? parseData[key] : parseData;
        }
        return {
            X: [],
            O: [],
            next: '',
            tie: [],
            settings: {}
        };
    }

    function getStorageItem(storage: string, key: string): (string | null)[][] {
        const storageDataString = localStorage.getItem(storage);
        if(storageDataString) {
            let parseData = JSON.parse(storageDataString);
            return parseData[key];
        }

        return []
    }

    function handlePlay(nextSquares: (string | null)[]): void{
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        updateStorage('tic-tac-toe', 'next', xIsPlaying ? 'O' : 'X');
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function isDraw(board: (string | null)[]) {
        return board.every(cell => cell !== null);
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
                updateStorage('tic-tac-toe', 'next', xIsPlaying ? 'O' : 'X');
                // setIsPlaying(false);
                return {winner: squares[a], positions: [a, b, c]};
            }
        }
        return null;
    }

    function refreshGameState() {
        if(!isRefreshing) {
            setIsRefreshing(true);
            setTimeout(() => {
                setCurrentMove(0);
                setHistory([Array(9).fill(null)]);
                setIsRefreshing(false);
            }, 1000);
        }
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
        <div className="flex flex-col justify-center items-center h-full px-10 border border-teal-300 border-opacity-55">
            <div className="mb-10 text-sm font-semibold text-slate-800 opacity-55 shadow px-4 py-1">
                { xIsPlaying ? 'Your turn' : 'AI turn'}
            </div>
            <Statistics scores={scores} />
            <div className="w-full mt-10 px-2">
                <Board xIsPlaying={xIsPlaying} squares={currentSquares} onPlay={handlePlay} isDraw={isDraw} calculateWinner={calculateWinner} />
            </div>

            <div className="mt-10 flex rounded-full gap-1 items-center justify-center">
                <span className={`${xIsPlaying ? 'bg-teal-600 text-white' : 'text-teal-600'} font-sans text-xl font-semibold text-[22px] leading-[0.2] rounded-full w-7 h-7 flex justify-center items-center`}>X</span>

                <span className={`${xIsPlaying ? 'text-sky-600' : 'bg-sky-600 text-white'} font-sans text-2xl font-semibold leading-[0.2] rounded-full w-8 h-8 flex justify-center items-center`}>O</span>
            </div>

            <div className="mt-10 flex justify-around gap-0 w-full items-center">
                <div className={`rounded-full text-white w-8 h-8 flex justify-center items-center font-bold shadow ${isRefreshing ? 'text-2xl bg-slate-600 cursor-not-allowed' : 'text-xl bg-slate-800 cursor-pointer'}` } onClick={refreshGameState}>
                    <SlRefresh className={`${isRefreshing ? 'animate-spin' : ''}`} />
                </div>
                <div className="border border-slate-300 px-5 uppercase text-sm font-semibold text-slate-500 rounded-full">1 player</div>

                <div className="rounded-full bg-slate-700 text-white w-8 h-8 text-xl flex justify-center items-center font-bold shadow">
                <IoSettingsOutline />
                </div>
            </div>


            {/* <div className="grid grid-cols-3 border-collapse mt-8 w-full px-12 hidden">
                <div className="border-r border-b border-r-red-500">cell 1</div>
                <div className="border-r border-b">cell 2</div>

                <div className="border-b">cell 3</div>
                <div className="border-r border-b">cell 4</div>
                <div className="border-r border-b">cell 5</div>

                <div className="border-b">cell 6</div>
                <div className="border-r">cell 7</div>
                <div className="border-r">cell 8</div>

                <div>cell 9</div>
            </div> */}
            <div className="game-info hidden">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;