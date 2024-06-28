import Decimal from "break_infinity.js";

export default function useGetItens(){
    return [
        {
            id: 'Short Sword',
            type: 'Weapon',
            price: new Decimal(1000)
        },
        {
            id: 'Pill',
            type: 'Pill',
            price: new Decimal(1000)
        },
        {
            id: 'Long Sword',
            type: 'Weapon',
            price: new Decimal(3000)
        },
    ]
}