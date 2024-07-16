import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assents/Bug.svg'
import ideaImageUrl from '../../assents/Idea.svg'
import thoughtImageUrl from '../../assents/Thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackTContetStep } from "./Steps/FeedbackContetStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Bug",
        img: {
            source: bugImageUrl,
            alt: "Image of a bug"
        },
    },
    IDEA: {
        title: "Idea",
        img: {
            source: ideaImageUrl,
            alt: "Image of a light bulb "
        },
    },
    OTHER: {
        title: "Other",
        img: {
            source: thoughtImageUrl,
            alt: "Image of a thought bubble"
        },
    },
}

export type FeedbackType = keyof typeof feedbackTypes


export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)


    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

return (

        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            
            {feedbackSent? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ): (
                <>
                {!feedbackType? (
                    <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
                ): (
                    <FeedbackTContetStep 
                        feedbackType={feedbackType}
                        onFeedbackRestartRequested= {handleRestartFeedback}
                        onFeedbackSent = {() => setFeedbackSent(true)}
                    />
                )} 
                </>
            )}
            
            
            <footer className="text-xs text-neutral-400">
            Made by Yacov Zimberknopf
            </footer>
        </div>



    )
}