import {  useState } from "react"
import { connect } from "react-redux"

const Summary = ({quiz:{answeredQuestions}}) => {
    const mapObj = {
        '&ldquo;':"``",
        '&#039;':"`",
        '&quot;':"'"
     
     };
     const re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    const [show, setShow] = useState(false)
    return (
        <div className="bg-white block p-4 md:p-8">
            <div className="summary-toggle text-center">
                <button className="w-48 btn font-semibold border-0 outline-none 
                            text-center py-2 bg-green-300 hover:bg-green-600"
                        onClick={() => setShow(!show)}>Preview</button>
            </div>
            <div className={`summary-cont h-0 transition duration-500 ease-in-out ${show ? 'h-full transition-all' : 'h-0 overflow-hidden'}`}>
                {
                    answeredQuestions?.length > 0 ?
                    (
                        answeredQuestions.map(ans =>{
                            return <div className="text-center my-3 hover:bg-gray-900 hover:text-white text-sm summary-content" key={ans.id}>
                                <div className="q-text">
                                    {
                                        ans?.question.replace(re, function(matched){return mapObj[matched.toLowerCase()]})
                                    }
                                </div>
                                <div className="flex flex-wrap justify-center items-center mt-1">
                                &nbsp;<div className={`flex-0 q-res font-semibold ${ans.correct === 1 ? 'text-green-600': 'text-red-600'}`}>{ans.correct === 1 ? "Correct" : "wrong"}</div>   
                                &nbsp; <span className="text-gray-600">correct answer:</span><div className="q-text font-semibold underline">{ans.correct_answer}</div>
                                </div>
                            
                            </div>
                        })
                    ) 
                    :
                    ("Something went wrong ")
                }
                
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    quiz: state.quiz
})

export default connect(mapStateToProps, {})(Summary)
