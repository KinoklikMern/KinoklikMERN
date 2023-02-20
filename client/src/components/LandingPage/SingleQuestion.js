import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SingleQuestion({ question, answer }) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <>
            <div>
                <div className="flex items-center justify-between border-2 p-3 my-2 rounded-md" style={{ color: 'white' }}>
                    <h2
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="text-lg font-semibold tracking-wider cursor-pointer">
                        {question}
                        &nbsp;&nbsp;&nbsp;
                        {showAnswer ? (
                            <button>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        ) : (
                            <button onClick={() => setShowAnswer(!showAnswer)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        )}
                    </h2>

                </div>
                <div className="px-6" style={{ color: 'white' }}>{showAnswer && <p>{answer}</p>}</div>
            </div>
        </>
    );
}
