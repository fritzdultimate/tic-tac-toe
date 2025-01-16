import Result from "./Result";

function Statistics() {
    return <div className="flex gap-8 mb-5 w-full justify-around">
        <Result name="O" stat="4" className="text-teal-500" />
        <Result name="X" stat="3" className="text-sky-700"/>
        <Result name="*" stat="2" className="text-slate-500"/>
    </div>
}

export default Statistics;