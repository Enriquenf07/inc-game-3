import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react"
import { FaUser } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import Stats from "./stats";

export default function PageInfo() {
    const [index, setIndex] = useState(0)

    return (
        <div className="flex flex-col w-full gap-4 h-[23vh] md:h-auto border-t-4 border-dark md:border-t-0">
            <ScrollArea className={`bg-zinc-700 w-full h-full md:h-[50%] md:rounded-lg ${index == 1 ? 'hidden' : 'flex'} md:flex`}>
                <div className="flex p-2">
                    <div className="w-[85%]">
                        <Stats />
                    </div>
                    <div className="flex">
                        <Button className={`flex md:hidden bg-secondary `} onClick={() => setIndex(1)}>
                            <GiClick />
                        </Button>
                    </div>
                </div>
            </ScrollArea>
            <ScrollArea className={`bg-zinc-700 w-full h-full md:h-[50%] md:rounded-lg ${index == 0 ? 'hidden' : 'flex'} md:flex`}>
                <div className="flex justify-end w-full p-1">
                    <Button className={`flex md:hidden bg-secondary `} onClick={() => setIndex(0)}>
                        <FaUser />
                    </Button>
                </div>
            </ScrollArea>
        </div>
    )
}