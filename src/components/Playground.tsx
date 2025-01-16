import Square from "./Square";

interface PlaygroundProps {
    columns: null[];
    rows: null[];
    squares: (string | null)[];
    calculateWinner: (data: (string | null)[]) => null | {winner: string; positions: number[]};
    handleClick: (data: number) => void
}

function Playground({ columns, rows, squares, calculateWinner, handleClick }: PlaygroundProps) {
    let winningPositions: number[];
    const winnerObj = calculateWinner(squares);
    if(winnerObj) {
        winningPositions = winnerObj.positions;
    }

    const playground = columns.map((_, ci) => {
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
    return <>{playground}</>
}

export default Playground;