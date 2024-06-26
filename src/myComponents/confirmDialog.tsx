import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface props{
    buttonTitle: string
    title?: string,
    description?: string,
    children: React.ReactNode,
    textSize?: string,
    textColor?: string,
    bgColor?: string
}

export default function ConfirmDialog({buttonTitle, title, description, children, textSize, textColor, bgColor}: props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`${textSize} ${textColor} ${bgColor}`}>{buttonTitle}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-700">
                <DialogHeader className="text-txt">
                    <DialogTitle className="text-txt">{title}</DialogTitle>
                    <DialogDescription className="text-txt">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {children}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}