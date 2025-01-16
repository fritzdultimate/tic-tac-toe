interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
    hightlightClass: string
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, hightlightClass }) => {
    return (
      <button className={`square ${hightlightClass} p-10 w-full flex justify-center items-center text-5xl font-sans font-bold h-8 ${value == 'X' ? 'text-sky-700' : 'text-teal-500'}`} onClick={onSquareClick}>
        {value}
      </button>
    );
};

export default Square;