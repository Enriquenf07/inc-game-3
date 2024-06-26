import Cultivation from "@/pages/Cultivation";
import Settings from "@/pages/Settings";
import useGameStore from "@/store/useMyStore";
import React from "react";

interface MenuComponent {
    id: number,
    title: string,
    page: React.ReactElement
}

export default function useMenu(){
    const [index] = useGameStore(state => [state.index])
    const menu: Array<MenuComponent> = [
        {id: 0, title: 'Cultivation', page: <Cultivation/>},
        {id: 1, title: 'Map', page: <>Map</>},
        {id: 2, title: 'Settings', page: <Settings/>}
    ]
    return {actualPage: menu[index].page, menu}
}