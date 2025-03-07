import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"


interface FeedbackTypeStepProps {
    onFeedbackTypeChanged: (FeedbackType:FeedbackType) => void
    
}

 
export function FeedbackTypeStep({onFeedbackTypeChanged}: FeedbackTypeStepProps){
    return(
    <>
        <header>
                <span className="text-xs leading-6 ">Leave your feedback</span>
                <CloseButton/>
            </header>
        <div className="flex py-8 gap-2 w-full">

                { Object.entries(feedbackTypes).map(([key, value]) => {
                    return (
                        <button 
                        key={key}
                        className="border-2 bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline"
                        onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                        >
                            <img  src={value.img.source} alt={value.img.alt} />
                            <span>{value.title}</span>
                        </button>
                    )
                })}

        </div>
    </>
    )
}