import { useState } from "react";
import { SheetBase } from "./sheetBase";
import { IoMdNotifications } from "react-icons/io";

export default function Notifications() {
    const [open, setOpen] = useState(false)

    return (
        <SheetBase open={open} setOpen={setOpen} title={'notifications'} icon={<IoMdNotifications />}>
            oii
        </SheetBase>
    )
}