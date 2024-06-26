import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Typography from "./typography";
import Decimal from "break_infinity.js";
import fnumber from "@/lib/fnumber";

interface props{
    onClick: () => void
    getOut?: () => void
    children: React.ReactNode,
    title: string,
    flag?: boolean,
    value?: Decimal,
    odd?: boolean
}

export default function BuyItem({onClick, children, title, getOut, flag = true, value, odd=false}: props){
    const [open, setOpen] = useState(false)
    if (!flag){
        return
    }
    return(
        <div className={`flex flex-col justify-center gap-2 ${odd ? 'bg-zinc-600' : 'bg-zinc-700'} p-2 py-4`}>
            <div className="flex items-center">
                <Typography className="w-full text-sm">{title}</Typography>
                <Typography className="mr-1">{fnumber(value)}</Typography>
                <Button onClick={getOut} className="bg-gray-400 mx-1 hover:bg-gray-200 text-black rounded-[9999px]">-</Button>
                <Button onClick={onClick} className="bg-dark mx-1 hover:bg-dark rounded-[9999px]">+</Button>
                <Button variant={'ghost'} className="hover:bg-transparent text-2xl p-2 text-txt hover:text-txt" onClick={() => setOpen(prev => !prev)}>{open ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowRight/>}</Button>
                
            </div>
            {open && <div>
                {children}
            </div>}
        </div>
    )
}