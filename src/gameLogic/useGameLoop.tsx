import useGameStore from "@/store/useMyStore";
import { useEffect } from "react";

export function useGameLoop() {
    const gameStore = useGameStore()

    const loop = () => {
        const currentTime = Date.now();
        if (currentTime >= gameStore.lastUpdateTime) {
            const tick = (currentTime - gameStore.lastUpdateTime) / 1000;
            gameStore.set({
                lastUpdateTime: currentTime
            });
            gameStore.updateCurrency()
            gameStore.save()
        }
    }


    useEffect(() => {
        gameStore.load()
        const timer = setInterval(() => {
            loop()
        }, 200)

        return () => clearInterval(timer);
    }, [])
}