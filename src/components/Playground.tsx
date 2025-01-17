import Square from "./Square";

interface PlaygroundProps {
    cells: null[];
    squares: (string | null)[];
    calculateWinner: (data: (string | null)[]) => null | {winner: string; positions: number[]};
    handleClick: (data: number) => void,
}

function Playground({ cells, squares, calculateWinner, handleClick }: PlaygroundProps) {
    let winningPositions: number[];
    const winnerObj = calculateWinner(squares);
    if(winnerObj) {
        winningPositions = winnerObj.positions;
    }

    const playground = 
            <div className="grid grid-cols-3 border-collapse">
                {
                    cells.map((_, i) => {
                        const borders = () => {
                            if([0, 1, 3, 4].includes(i)) {
                                return 'border-r border-b';
                            } else if([2, 5].includes(i)) {
                                return 'border-b';
                            } else if([6, 7].includes(i)) {
                                return 'border-r';
                            }
                            return '';
                        }

                        return (
                            <div className={`${borders()} border-slate-300 flex justify-center items-center`} key={i}>
                                <Square hightlightClass={winningPositions && winningPositions.includes(i) ? 'bg-sky-700 border border-sky-700 text-white' : ''} onSquareClick={() => handleClick(i)} value={squares[i]} />

                            </div>
                        )
                    })
                }
            </div>
    return <>{playground}</>
}

export default Playground;