import useGameStore from "@/store/useMyStore";
import { useEffect } from "react";

export function useGameLoop() {
    const gameStore = useGameStore()




    useEffect(() => {
        gameStore.load()
        const timer = setInterval(() => {
            gameStore.loop()
        }, 200)

        return () => clearInterval(timer);
    }, [])
}