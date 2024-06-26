import useMenu from "../../hooks/useMenu"
import PageInfo from "./pageInfo"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function Page() {
    const { actualPage } = useMenu()

    return (
        <div className="p-0 md:p-10 flex w-full min-h-[93vh] bg-zinc-800 gap-0 md:gap-4 flex-wrap md:flex-nowrap">
            <ScrollArea className="bg-zinc-700 w-full md:rounded-lg h-[70vh] md:h-[calc(93vh-5rem)]" >
                <div className="p-2 md:p-4 md:px-5">
                    {actualPage}
                </div>
            </ScrollArea>
            <PageInfo />
        </div>
    )
}