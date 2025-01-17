import Result from "./Result";

interface StatisticsProps {
    scores: {X: number, O: number, tie: number}
}
function Statistics({ scores }: StatisticsProps) {
    return <div className="flex gap-8 mb-5 w-full justify-around">
        <Result name="O" stat={scores.O} className="text-teal-500" />
        <Result name="X" stat={scores.X} className="text-sky-700"/>
        <Result name="*" stat={scores.tie} className="text-slate-500"/>
    </div>
}

export default Statistics;