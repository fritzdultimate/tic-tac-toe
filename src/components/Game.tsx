import { useState } from "react";
import Board from "./Board";
import Statistics from "./Statistics";
import { SlRefresh } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";

function Game() {
    const [history, setHistory] = useState<(string | null)[][]>(
    [Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsPlaying = currentMove % 2 !== 0;

    console.log(xIsPlaying)

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
        <div className="flex flex-col justify-center items-center h-full px-10 border border-teal-400">
            <div className="mb-10 text-sm font-semibold text-slate-800 opacity-55 shadow px-4 py-1">
                { xIsPlaying ? 'Your turn' : 'AI turn'}
            </div>
            <Statistics />
            <div className="w-full mt-10 px-2">
                <Board xIsPlaying={xIsPlaying} squares={currentSquares} onPlay={handlePlay} />
            </div>

            <div className="mt-10 flex rounded-full gap-1 items-center justify-center">
                <span className={`${xIsPlaying ? 'bg-teal-600 text-white' : 'text-teal-600'} font-sans text-xl font-semibold text-[22px] leading-[0.2] rounded-full w-7 h-7 flex justify-center items-center`}>X</span>

                <span className={`${xIsPlaying ? 'text-sky-600' : 'bg-sky-600 text-white'} font-sans text-2xl font-semibold leading-[0.2] rounded-full w-8 h-8 flex justify-center items-center`}>O</span>
            </div>

            <div className="mt-10 flex justify-around gap-0 w-full items-center">
                <div className="rounded-full bg-slate-600 text-white w-7 h-7 text-xl flex justify-center items-center font-bold">
                    <SlRefresh />
                </div>
                <div className="border border-slate-300 px-5 uppercase text-sm font-semibold text-slate-500 rounded-full">1 player</div>

                <div className="rounded-full bg-slate-700 text-white w-7 h-7 text-xl flex justify-center items-center font-bold">
                <IoSettingsOutline />
                </div>
            </div>


            <div className="grid grid-cols-3 border-collapse mt-8 w-full px-12 hidden">
                <div className="border-r border-b border-r-red-500">cell 1</div>
                <div className="border-r border-b">cell 2</div>

                <div className="border-b">cell 3</div>
                <div className="border-r border-b">cell 4</div>
                <div className="border-r border-b">cell 5</div>

                <div className="border-b">cell 6</div>
                <div className="border-r">cell 7</div>
                <div className="border-r">cell 8</div>

                <div>cell 9</div>
            </div>
            <div className="game-info hidden">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;