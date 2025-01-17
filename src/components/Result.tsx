import { GiWeightLiftingUp } from "react-icons/gi";

interface ResultProps {
    name: string;
    stat: number;
    className: string;
}
function Result({ name, stat, className }: ResultProps) {
    return <div className={`${className} flex flex-col items-center justify-center gap-2`}>
    <span className={`text-3xl font-sans font-bold`}>{name === '*' ? <GiWeightLiftingUp /> : name}</span>
    <span className="text-sm font-semibold">{stat} <span>{name === '*' ? 'draws' : 'wins'}</span></span>
</div>
}

export default Result;