import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";


interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void
}


export function ScreenshotButton( { screenshot , onScreenshotTook }:ScreenshotButtonProps){

    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true)

        const canvas = await html2canvas(document.querySelector('html')!) //como pode ser nulo, o '!' obriga que nao ira ser nulo
        const base64image = canvas.toDataURL('image/png')    //Converte a imagem tirada para texto URL
  
        onScreenshotTook(base64image)
        setIsTakingScreenshot(false)
    }
    if (screenshot){
        return(
            <button
                type="button"
                className="p-1 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => onScreenshotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                    /*Focar so no feedbackform*/ 
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
            >
                <Trash weight="fill"/>
            </button>
        )
    }
    return (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            
            {isTakingScreenshot? <Loading/>: <Camera className="w-6 h-6"/>}
        </button>
    )
}