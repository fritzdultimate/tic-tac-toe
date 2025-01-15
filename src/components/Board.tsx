import Square from "./Square";

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