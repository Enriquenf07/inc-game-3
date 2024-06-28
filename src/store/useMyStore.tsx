import Decimal from "break_infinity.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { activities, Stat, stats } from "./setupStates";
import { toast } from "react-toastify";


interface Activity {
    id: number,
    ap: Decimal,
}

interface Equipament {
    weapon: any,
    armor: any,
    ring: any,
}

interface StatesThatResetAtPrestige {
    saveFile: string
    lastUpdateTime: number,
    index: string,
    activityPoints: Decimal,
    freeActivityPoints: Decimal,
    souls: Decimal,
    gold: Decimal,
    body: Decimal
    inventory: Array<any>
    equipament: Equipament,
    activities: Array<Activity>,
    maxSouls: Decimal,
    maxBody: Decimal
}

interface StatesThatNotResetAtPrestige{

}

const initialState: StatesThatResetAtPrestige = {
    index: 'cultivation',
    saveFile: '',
    lastUpdateTime: Date.now(),
    souls: new Decimal(0),
    gold: new Decimal(0),
    body: new Decimal(0),
    activityPoints: new Decimal(1),
    freeActivityPoints: new Decimal(1),
    activities: activities,
    inventory: [],
    equipament: {
        weapon: null,
        armor: null,
        ring: null
    },
    maxSouls: new Decimal(0),
    maxBody: new Decimal(0),
}

interface Actions {

    save: () => void,
    load: () => void,
    importSave: (encodedSave: string | undefined) => void,
    resetGame: () => void,
    setIndex: (state: string) => void,
    setSouls: (state: Decimal) => void,
    addApToActivity: (id: number) => void,
    subtractApToActivity: (id: number) => void,
    updateCurrency: (delta: number) => void,
    updateSouls: (delta: number) => void,
    updateBody: (delta: number) => void,
    updateGold: (delta: number) => void,
    setTimeAsNow: (now: any) => void
    updateWeapon: (newState: any) => void,
    updateArmor: (newState: any) => void,
    updateRing: (newState: any) => void,
    buyItem: (id: any) => void,
    loop: () => void,
    prestige: () => void
}



const useGameStore = create<StatesThatResetAtPrestige & StatesThatNotResetAtPrestige & Actions>()(
    persist(
        (set, get) => ({
            ...initialState,
            setIndex: (state) => (set({ index: state })),
            setSouls: (newState) => (set({ souls: newState })),
            loop: () => {
                const currentTime = Date.now();
                if (currentTime >= get().lastUpdateTime) {
                    const delta = (currentTime - get().lastUpdateTime) / 1000;
                    get().setTimeAsNow(currentTime)
                    get().updateCurrency(delta)
                    get().save()
                }
            },
            save: () => {
                const obj = {
                    souls: get().souls,
                    activities: get().activities,
                    gold: get().gold,
                    body: get().body,
                    lastUpdateTime: get().lastUpdateTime,
                    freeActivityPoints: get().freeActivityPoints,
                    activityPoints: get().activityPoints
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
                    souls: new Decimal(saveFile.souls),
                    gold: new Decimal(saveFile.gold),
                    body: new Decimal(saveFile.body),
                    lastUpdateTime: saveFile.lastUpdateTime,
                    activities: saveFile.activities.map((i: Activity) => ({ ...i, ap: new Decimal(i.ap) })),
                    freeActivityPoints: new Decimal(saveFile.freeActivityPoints),
                    activityPoints: new Decimal(saveFile.activityPoints)
                })

            },
            importSave: (encodedSave) => {
                try {
                    if (!encodedSave) {
                        throw new Error()
                    }
                    const saveFile = JSON.parse(atob(encodedSave))
                    set({
                        souls: new Decimal(saveFile.souls),
                        gold: new Decimal(saveFile.gold),
                        body: new Decimal(saveFile.body),
                        lastUpdateTime: saveFile.lastUpdateTime,
                        activities: saveFile.activities.map((i: Activity) => ({ ...i, ap: new Decimal(i.ap) })),
                        freeActivityPoints: new Decimal(saveFile.freeActivityPoints),
                        activityPoints: new Decimal(saveFile.activityPoints)
                    })
                    toast.success('Load Complete')
                } catch (error) {
                    toast.error('Invalid Save File')
                }
            },
            resetGame: () => {
                set({
                    ...initialState //colocar States que nao resetam no prestigio depois!!!!
                });
                toast.info('The game restarted')
            },
            prestige: () => {

            },
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
            updateCurrency: (delta) => {
                get().updateGold(delta)
                get().updateBody(delta)
                get().updateSouls(delta)
            },
            updateGold: (delta) => {
                set({gold:  get().gold.plus(new Decimal(delta).times(new Decimal(1).times(get().activities[2].ap)))})
            },
            updateSouls: (delta) => {
                const product = new Decimal(delta).times(new Decimal(0.1).times(get().activities[0].ap))
                if(get().souls.divideBy(1000).greaterThan(get().body)){
                    set({souls: get().souls.plus(product.divideBy(2))})
                }
                set({souls: get().souls.plus(product)})
            },
            updateBody: (delta) => {
                const product = new Decimal(delta).times(new Decimal(0.1).times(get().activities[1].ap))
                if(get().body.divideBy(1000).greaterThan(get().souls)){
                    set({body: get().body.plus(product.divideBy(2))})
                    console.log('oiii')
                }
                set({body: get().body.plus(product)})
            },
            setTimeAsNow: (now) => {
                set({ lastUpdateTime: now })
            },
            updateWeapon: newState => { set({ equipament: { ...get().equipament, weapon: newState } }) },
            updateArmor: newState => { set({ equipament: { ...get().equipament, weapon: newState } }) },
            updateRing: newState => { set({ equipament: { ...get().equipament, weapon: newState } }) },
            buyItem: (item) => {
                const itemInv = get().inventory.map(i => item.id).find(id => item.id == id)
                if (item.price.greaterThan(get().gold)) {
                    toast.error('Insuficient Gold')
                    return
                }
                if (!itemInv) {
                    const newInvetory = [...get().inventory, { ...item, quantity: new Decimal(0) }]
                    set({ inventory: newInvetory })
                }
                const newInvetory = get().inventory.map(i => item.id == i.id ? { ...i, quantity: i.quantity.plus(1) } : i)
                set({ inventory: newInvetory })
            }
        }),
        {
            name: 'save',
            partialize: (state) => ({ saveFile: state.saveFile }),
        }
    ))

export default useGameStore