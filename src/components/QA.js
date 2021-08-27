import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { nextQuestion, finish, getQuestions, restartQuiz } from "../state/actions/Quiz"
import Loading from "./inc/Loading";
import Timer from "./inc/Timer";

const QA = ({ quiz: { qa, count, finished, started,loading, currentQuestion, totalQuestions },
  restartQuiz, nextQuestion, finish, getQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState('');

  useEffect(() =>{
    setIsCorrectAnswer("")
  },[count])

  const mapObj = {
    '&ldquo;':"``",
    '&#039;':"`",
    '&quot;':"'"
 
 };
 const re = new RegExp(Object.keys(mapObj).join("|"),"gi");
 


  const onAnswerChange = (val, ca) => {
    setSelectedAnswer(val);
    setIsCorrectAnswer(ca)
  };
  const confirmAnswer = async () => {
    if (selectedAnswer === "") {
      //const conf = confirm("You haven't select any answer")
      if (window.confirm("You haven't select any answer")){
        await nextQuestion(isCorrectAnswer, currentQuestion[0]?.id+1);
        return false
      }else{
        setSelectedAnswer('')
        return false
      }
    }
    await nextQuestion(isCorrectAnswer, currentQuestion[0]?.id+1);
    await setSelectedAnswer('')
  };
  const setFinish = async () =>{
    if (selectedAnswer === "") {
      //const conf = confirm("You haven't select any answer")
      if (window.confirm("You haven't select any answer")){
        await finish(isCorrectAnswer, currentQuestion[0]?.id+1);
        return false
      }else{
        setSelectedAnswer('')
        return false
      }
    }
    await finish(isCorrectAnswer, currentQuestion[0]?.id+1);
    await setSelectedAnswer('')
  }


  return (
    <div>
      {!loading ? (
        currentQuestion !== null && currentQuestion?.length > 0 ?
              (
                <div className="w-xl bg-white p-4 md:p-8 justify-center text-center">
                  <div className="flex justify-between">
                    {
                      totalQuestions > 0 ? <Timer /> : 0
                    }
                    <button onClick={() => restartQuiz()} className="px-2 mx-2 text-red-600 hover:bg-red-200">Restart</button>
                  </div>
                  <div className="question w-full block md:flex md:items-center px-8 from-blue-400 to-green-500 bg-gradient-to-tr" style={{minHeight: "12rem"}}>
                    <div className="flex-auto font-semibold">
                      Q{count}
                      {": "}&nbsp;
                    </div>
                    <div className="question-text flex-auto text-left md:text-center text-white font-semibold text-2xl">
                      {currentQuestion[0]?.question?.replace(re, function(matched)
                        {return mapObj[matched.toLowerCase()]})
                      }
                    </div>
                  </div>
                  <div className="answers">
                    {currentQuestion[0]?.answers?.length > 0
                      ? currentQuestion[0].answers?.map((a, i) => {
                          return (
                            <label className={`answer hover:from-pink-500 hover:to-green-400 py-3 md:px-8 z-50 text-sm cursor-pointer ${selectedAnswer === a.answerText ? 'selected-label-color font-semibold':'from-green-300 to-gray-300 bg-gradient-to-r'}`} key={i}>
                              <span className="uppercase text-md font-semibold">{(i + 10).toString(36) + ":"}&nbsp;</span>
                              <input
                                type="radio"
                                className="top-0 left-0 right-0 bottom-0 absolute block"
                                name="answer"
                                value={a.answerText}
                                checked={selectedAnswer === a.answerText}
                                onChange={() => onAnswerChange(a.answerText, a.isCorrect)}
                              />
                              {a.answerText.replace(re, function(matched)
                                {
                                  return mapObj[matched.toLowerCase()]})
                              }
                            </label>
                          );
                        })
                      : "This question has no answers"}
                  </div>
                  <div className="flex justify-center">
                    {count < totalQuestions ? (
                      <button
                        className="w-full font-semibold py-2 md:w-1/2 bg-blue-500 hover:bg-blue-700"
                        onClick={confirmAnswer}
                      >
                        Confirm
                      </button>
                    ) : (
                      <button className="w-full font-semibold md:w-1/2 bg-blue-500" onClick={setFinish}>
                        Finish
                      </button>
                    )}
                  </div>
                </div>
        ) : (
          <div className="text-center font-semibold w-screen py-32 bg-white block">
            <div className="text-2xl">No Questions</div> 
            <div className="text-xl">
              <button onClick={() => restartQuiz()} className="px-2 mt-2 text-red-600 hover:bg-red-200">Restart</button>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

const mapStartToProps = (state) => ({
  quiz: state.quiz,
});
export default connect(mapStartToProps, {nextQuestion, restartQuiz, finish, getQuestions})(QA);
