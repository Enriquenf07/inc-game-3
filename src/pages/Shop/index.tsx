import useGetItens from "@/hooks/useGetItens"
import ShopCard from "./components/shopCard"

export default function Shop(){
    const itens = useGetItens()
    return(
        <div className="flex flex-col w-full gap-2">
            {itens.map(i => (
                <ShopCard item={i}/>
            ))}
        </div>
    )
}