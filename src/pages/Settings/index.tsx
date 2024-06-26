import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ConfirmDialog from "@/myComponents/confirmDialog";
import Typography from "@/myComponents/typography";
import useGameStore from "@/store/useMyStore";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {
    const importSave = useGameStore(state => state.importSave)
    const saveFile = useGameStore(state => state.saveFile)
    const resetGame = useGameStore(state => state.resetGame)
    const [importingSave, setImportingSave] = useState<string>()
    const [isString, setIsString] = useState(true)
    const [fileName, setFileName] = useState<string | null>()

    return (
        <div className="border border-zinc-600 p-3 px-4">
            <div>
                <Typography className="text-xl p-3 px-4">Settings</Typography>
            </div>
            <div className="p-3 px-4">
                <ConfirmDialog
                    title="Import Save"
                    buttonTitle="Import Save"
                    textSize={"text-xl"}
                >
                    <div className="w-full gap-2 flex flex-col">
                        <div className="flex w-full items-center gap-2 bg-white rounded-lg p-2" onClick={() => {
                            setImportingSave(undefined)
                            setFileName(null)
                            setIsString(p => !p)
                        }}>
                            <Switch id="airplane-mode" checked={!isString} />
                            <Typography className="text-black" customColor>File</Typography>
                        </div>
                        {
                            isString &&
                            <div className="flex w-full">
                                <Input type="text" className="bg-zinc-900 p-6 text-txt border-zinc-700" placeholder="Save" value={importingSave} onChange={(e) => setImportingSave(e.target.value)} />
                            </div>
                        }
                        {!isString &&
                            <div className="flex w-full">
                                <label className="text-sm bg-white  p-6 px-3 hover:bg-zinc-200 w-full rounded-lg border border-zinc-200" htmlFor="fileUpload">
                                    <input type="file" className="hidden" id="fileUpload" accept="text/plain" onChange={async (event) => {
                                        const file = event.target.files && event.target.files[0]
                                        const save = await file?.text()
                                        setFileName(file?.name)
                                        setImportingSave(save)
                                    }
                                    } />
                                    <div className="flex gap-16">
                                        <Typography className="text-black" customColor>Upload File</Typography>
                                        <Typography className="text-black" customColor>{fileName ? fileName :'No File Selected'}</Typography>
                                    </div>
                                </label>
                            </div>}

                        <div className="flex w-full justify-end gap-2">
                            <Button className="bg-white hover:bg-slate-100 text-black"
                                onClick={() => {
                                    importSave(importingSave)
                                }}>
                                OK
                            </Button>
                        </div>
                    </div>
                </ConfirmDialog>
            </div>
            <div className="p-3 px-4">
                <ConfirmDialog
                    title="Export Save"
                    buttonTitle="Export Save"
                    textSize={"text-xl"}
                >
                    <div className="flex gap-2">
                        <Button className="bg-white hover:bg-slate-100 text-black"
                            onClick={() => {
                                const url = URL.createObjectURL(new Blob([saveFile], { type: 'text/plain' }));
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', `GAME_v0.0.0_${dayjs(Date.now()).format()}.txt`);
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            Dowload File
                        </Button>
                        <Button className="bg-white hover:bg-slate-100 text-black"
                            onClick={() => {
                                navigator.clipboard.writeText(saveFile)
                                toast.info('Saved in clipboard!')
                            }}>
                            Copy to clipboard
                        </Button>
                    </div>
                </ConfirmDialog>
            </div>
            <div className="p-3 px-4">
                <ConfirmDialog
                    title="This action will reset your game. Are you sure you want to proceed?"
                    buttonTitle="Reset Game"
                    textSize={"text-xl"}
                >
                    <div className="flex gap-2">
                        <Button className="bg-red-700 hover:bg-red-500 text-white"
                            onClick={() => {
                                resetGame()
                            }}>
                            YES
                        </Button>
                    </div>
                </ConfirmDialog>
            </div>

        </div >
    )
}