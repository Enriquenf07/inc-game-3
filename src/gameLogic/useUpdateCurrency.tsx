import useGameStore from "@/store/useMyStore";

export function useUpdateCurrency() {
    const gameStore = useGameStore()
    
    gameStore.set({souls: gameStore.souls.plus(1)})
}