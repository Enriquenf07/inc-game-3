import Decimal from "break_infinity.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { activities, Stat, stats } from "./setupStates";
import { toast } from "react-toastify";


interface Activity {
    id: number,
    ap: Decimal,
}

interface GameState {
    saveFile: string
    lastUpdateTime: number,
    save: () => void,
    load: () => void,
    importSave: (encodedSave: string | undefined) => void,
    resetGame: () => void,
    index: number,
    setIndex: (state: number) => void,
    setSouls: (state: Decimal) => void,
    activityPoints: Decimal,
    activities: Array<Activity>,
    addApToActivity: (id: number) => void,
    subtractApToActivity: (id: number) => void,
    freeActivityPoints: Decimal,
    souls: Decimal,
    gold: Decimal,
    body: Decimal
    set: (state: GameState | Partial<GameState> | ((state: GameState) => GameState | Partial<GameState>), replace?: boolean | undefined) => void
    updateCurrency: () => void
}



const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            index: 0,
            setIndex: (state) => (set({ index: state })),
            saveFile: '',
            lastUpdateTime: Date.now(),
            set: (newState) => {set(newState)},
            save: () => {
                const obj = {
                    souls: get().souls
                }
                const encodedSave = btoa(JSON.stringify(obj))
                set({ saveFile: encodedSave })
            },
            load: () => {
                if (get().saveFile == '') {
                    return
                }
                const saveFile = JSON.parse(atob(get().saveFile))
                set({
                    souls: new Decimal(saveFile.souls)
                })

            },
            importSave: (encodedSave) => {
                try {
                    if(!encodedSave){
                        throw new Error()
                    }
                    const saveFile = JSON.parse(atob(encodedSave))
                    set({
                        souls: new Decimal(saveFile.souls)
                    })
                    toast.success('Load Complete')
                } catch (error) {
                    toast.error('Invalid Save File')
                }
            },
            resetGame: () => {
                set({
                    souls: new Decimal(0)
                });
                toast.info('The game restarted')
            },

            souls: new Decimal(0),
            setSouls: (newState) => (set({ souls: newState })),
            gold: new Decimal(0),
            body: new Decimal(0),
            activityPoints: new Decimal(1),
            freeActivityPoints: new Decimal(1),
            activities: activities,
            addApToActivity: (id) => {
                if (get().freeActivityPoints.greaterThan(0)) {
                    const newActivities = get().activities.map(a => a.id == id ? { ...a, ap: a.ap.plus(1) } : a)
                    set({ activities: newActivities, freeActivityPoints: get().freeActivityPoints.subtract(1) })
                }
            },
            subtractApToActivity: (id) => {
                if (get().activities.find(i => i.id == id)?.ap.greaterThan(0)) {
                    const newActivities = get().activities.map(a => a.id == id ? { ...a, ap: a.ap.subtract(1) } : a)
                    set({ activities: newActivities, freeActivityPoints: get().freeActivityPoints.add(1) })
                }
            },
            updateCurrency: () => {
                set({souls: get().souls.plus(0.1)})
            }
        }),
        {
            name: 'save',
            partialize: (state) => ({ saveFile: state.saveFile }),
        }
    ))

export default useGameStore