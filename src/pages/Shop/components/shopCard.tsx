import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import fnumber from "@/lib/fnumber"
import Typography from "@/myComponents/typography"
import useGameStore from "@/store/useMyStore"
import Decimal from "break_infinity.js"

interface Item {
    id: string,
    type: string
    price: Decimal,
}

interface props {
    item: Item
}




export default function ShopCard({ item }: props) {
    const buyItem = useGameStore(state => state.buyItem)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="border border-zinc-600 flex w-full flex-col p-5">
                    <Typography>Name: {item.id}</Typography>
                    <Typography>Type: {item.type}</Typography>
                    <Typography className="text-amber-200" customColor>Price: {fnumber(item.price)} Gold</Typography>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-700">
                <DialogHeader className="text-txt">
                    <DialogTitle className="text-txt">{item.id}</DialogTitle>
                    <DialogDescription className="text-txt">
                        You want to spend {fnumber(item.price)} Gold buying this item?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="bg-white text-zinc-900 hover:bg-warmGray-300" onClick={() => buyItem(item)}>YES</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}