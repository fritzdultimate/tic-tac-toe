interface ResultProps {
    name: string;
    stat: string;
    className: string;
}
function Result({ name, stat, className }: ResultProps) {
    return <div className={`${className} flex flex-col items-center gap-2`}>
    <span className={`text-3xl font-sans leading-[0.25] font-bold`}>{name}</span>
    <span className="text-sm font-semibold">{stat} <span>{name === '*' ? 'draws' : 'wins'}</span></span>
</div>
}

export default Result;