import { FaBars } from "react-icons/fa";
import { SheetBase } from "./sheetBase";
import useMenu from "../hooks/useMenu";
import { Button } from "@/components/ui/button";
import useGameStore from "@/store/useMyStore";
import { useState } from "react";

export default function Menu() {
  const setIndex = useGameStore(state => state.setIndex)
  const [open, setOpen] = useState(false)
  const { menu } = useMenu()

  return (
    <SheetBase open={open} setOpen={setOpen} title={'menu'} side='left' icon={<FaBars />}>
      <div className="flex flex-col gap-1">
        {
          menu.map(menu => (
            <div key={menu.id}>
              <Button className="w-full bg-primary hover:bg-dark" onClick={() => {
                setIndex(menu.id)
                setOpen(false)
              }}>{menu.title}</Button>
            </div>
          ))
        }
      </div>
    </SheetBase>
  )
}