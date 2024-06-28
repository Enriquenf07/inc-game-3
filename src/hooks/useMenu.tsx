import Cultivation from "@/pages/Cultivation";
import Settings from "@/pages/Settings";
import Shop from "@/pages/Shop";
import useGameStore from "@/store/useMyStore";
import React from "react";

interface MenuComponent {
    id: string,
    title: string,
    page: React.ReactElement
}

export default function useMenu(){
    const [index] = useGameStore(state => [state.index])
    const menu: Array<MenuComponent> = [
        {id: 'cultivation', title: 'Cultivation', page: <Cultivation/>},
        {id: 'shop', title: 'Shop', page: <Shop/>},
        {id: 'map', title: 'Map', page: <>Map</>},
        {id: 'settings', title: 'Settings', page: <Settings/>}
    ]
    return {actualPage: menu.find(i => i.id == index)?.page, menu}
}