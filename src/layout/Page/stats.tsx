import fnumber from "@/lib/fnumber";
import Typography from "@/myComponents/typography";
import useGameStore from "@/store/useMyStore";

export default function Stats(){
    const [souls,gold, body]= useGameStore(state => [state.souls, state.gold, state.body])
    return(
        <div>
            <Typography className="text-blue-200" customColor> <span className="text-lg text-txt mr-1">{fnumber(souls)}</span> Soul Strenght</Typography>
            <Typography className="text-green-200" customColor> <span className="text-lg text-txt mr-1">{fnumber(body)}</span> Body Knowledge</Typography>
            <Typography className="text-amber-200" customColor> <span className="text-lg text-txt mr-1">{fnumber(gold)}</span> Gold</Typography>
        </div>
    )
}