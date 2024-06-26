import Decimal from "break_infinity.js";
import {numberformat} from 'swarm-numberformat'

export default function fnumber(number: Decimal | number | undefined | null): string{
    const number2 = number ? number : 0
    return numberformat.format(number2, {format: 'scientific', sigfigs: 3})
}