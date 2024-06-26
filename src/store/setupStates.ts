import Decimal from "break_infinity.js";

export const activities = [
    {
        id: 1,
        ap: new Decimal(0)
    },
    {
        id: 2,
        ap: new Decimal(0)
    },
    {
        id: 3,
        ap: new Decimal(0)
    }
]

export const quests = [
    {
        id: 1,
        done: false,
        failed: false
    },
    {
        id: 2,
        done: false,
        failed: false
    },
    {
        id: 3,
        done: false,
        failed: false
    }
]

export interface Stat{
    id: number,
    number: Decimal
}

export const stats = [
    {
        id: 1,
        number: new Decimal(0)
    },
    {
        id: 2,
        number: new Decimal(0)
    },
    {
        id: 3,
        number: new Decimal(0)
    }
]