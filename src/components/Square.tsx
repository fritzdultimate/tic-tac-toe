interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
    hightlightClass: string
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, hightlightClass }) => {
    return (
      <button className={`square ${hightlightClass}`} onClick={onSquareClick}>
        {value}
      </button>
    );
};

export default Square;