import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

interface props {
    icon: React.ReactNode,
    children?: React.ReactNode,
    title: String,
    side?: "right" | "top" | "bottom" | "left" | null | undefined,
    open: boolean,
    setOpen: (bool: boolean) => void
}

function SheetBase({ icon, children, title, side = 'right', open, setOpen }: props) {

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-3 text-white">{icon}</SheetTrigger>
            <SheetContent side={side}>
                <SheetHeader className="mt-4">
                    <SheetTitle className="hidden">{title}</SheetTitle>
                    <SheetDescription>
                        {children}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export { SheetBase }