import { ArrowLeft} from "phosphor-react"
import { FormEvent, useState } from "react"
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScreenshotButton"

interface FeedbackContetStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
    onFeedbackSent: () => void
}



export function FeedbackTContetStep({feedbackType, onFeedbackRestartRequested: OnFeedbackRestartRequested, onFeedbackSent}: FeedbackContetStepProps){

    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')


    const [isSendingFeedback, setIssendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]


    async function handleSubmitFeedback(event:FormEvent){
        
        event.preventDefault()
        setIssendingFeedback(true) 

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })
        setIssendingFeedback(false)
        onFeedbackSent()
    }

    return(
        <>
            <header>
                    <button 
                    type="button" 
                    className="top-5 left-5 absolute text-zinc-400 hover:text-white"
                    onClick={OnFeedbackRestartRequested} 
                    title="Back">
                        <ArrowLeft weight="bold" />
                    </button>
                <span className="text-xs leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.img.source} alt={feedbackTypeInfo.img.alt} className="w-6 h-6"/>
                        {feedbackTypeInfo.title}
                    </span>
                <CloseButton/>
            </header>
            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea 
                className="min-w-[304px] w-full min-h-[112px] text-sm p-3 placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-x-brand-500 focus:ring-offset-brand-500 focus:right-1 focus:outline-none  resize-none  scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                placeholder="Tell us what happened..."
                onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook = {setScreenshot}   
                    />
                    <button 
                    type="submit"
                    disabled = {comment.length == 0 || isSendingFeedback}
                    className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >{isSendingFeedback ? <Loading/>: 'Send feedback'}
                    </button>
                </footer>
            </form>
        </>
        )
}