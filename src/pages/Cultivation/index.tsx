import fnumber from "@/lib/fnumber";
import BuyItem from "@/myComponents/buyItem";
import Typography from "@/myComponents/typography";
import useGameStore from "@/store/useMyStore";
import { toast } from "react-toastify";


const Activities = () => {
    const [souls, setSouls] = useGameStore(state => [state.souls, state.setSouls])
    const [addApToActivity, subtractApToActivity] = useGameStore(state => [state.addApToActivity, state.subtractApToActivity])
    const activities = useGameStore(state => state.activities)
    return (
        <div className="flex flex-col border p-1 pb-3 px-4 border-zinc-600">
            <BuyItem
                value={activities?.find(i => i.id == 1)?.ap}
                getOut={() => subtractApToActivity(1)}
                onClick={() => {
                    addApToActivity(1)
                }}
                title="Meditate in silence">
                <Typography>Take a time to cultivated in your room</Typography>
            </BuyItem>
            <BuyItem
                odd
                value={activities?.find(i => i.id == 2)?.ap}
                getOut={() => subtractApToActivity(2)}
                onClick={() => {
                    addApToActivity(2)
                }}
                title="Pratice Martial Arts">
                <Typography>You started learning the basics</Typography>
            </BuyItem>
            <BuyItem
                value={activities?.find(i => i.id == 3)?.ap}
                getOut={() => subtractApToActivity(3)}
                onClick={() => {
                    addApToActivity(3)
                }}
                title="Go to work">
                <Typography>You started working in the kitchen of the sect</Typography>
            </BuyItem>
        </div>
    )
}

export default function Cultivation() {
    const [activityPoints, freeActivityPoints] = useGameStore(state => [state.activityPoints, state.freeActivityPoints])
    return (
        <div>
            <div className="flex gap-4 justify-end mb-5">
                <Typography >Total activities: <span className="text-secondary text-lg">{fnumber(activityPoints)}</span></Typography>
                <Typography >Free activities: <span className="text-secondary text-lg">{fnumber(freeActivityPoints)}</span></Typography>
            </div>
            <Activities />
        </div>
    )
}

