import { connect } from "react-redux";
import { restartQuiz } from "../state/actions/Quiz"
import Summary from "./inc/Summary";
import { ChampionMedal, GoldMedal, DiamondMedal } from "./Medals"
import "./stars.css"

const Result = ({quiz:{score, totalQuestions}, restartQuiz}) => {
    return (
    <>
        <div className="result text-white px-4 py-12 md:p-8 block justify-center text-center">
            <h2 className="text-center font-semibold">FINISHED</h2>
            <p className="text-center">
                You've scored <span className={`font-semibold ${score > totalQuestions/score ? 'text-green-600': 'text-red-600'}`}>{score}</span> out of {totalQuestions}
            </p>
            {
                ((score/totalQuestions) * 100) > 50 ? 
                <>
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                    <p className="text-center mt-4">Your reward is :</p>
                    <div className="flex justify-center">
                {
                    ((score/totalQuestions) * 100) > 85 ? <ChampionMedal /> 
                    : ((score/totalQuestions) * 100) > 70 ? <GoldMedal /> 
                    : <DiamondMedal /> 
                }
                    </div>
                    <p className="font-semibold bg-purple-600 text-white m-2 py-4 from-blue-700 to-red-600 bg-gradient-to-r">SHOW OFF</p>
                    <span>on:</span>
                    <div className="flex justify-center">
                        <a className="social mx-2 px-4 py-2 bg-green-400" href="whatsapp://send?text=Hurray!!! I just won quiz on nuru-quiz" data-action="share/whatsapp/share">Whatsapp</a>
                        
                        <a className="social mx-2 px-4 py-2 bg-purple-600" href="http://twitter.com/share?text=Hurray!!! I just won quiz on nuru-quiz&url=http://nuru-quiz.netlify.app goes here&hashtags=nuruQuiz, QuizApp">Twitter</a>
                        
                        <a className="social mx-2 px-4 py-2 bg-blue-600" href="https://www.facebook.com/sharer/sharer.php?u=nuru-quiz.netlify.app" target="_blank" rel="noreferrer">Facebook</a>
                    </div>
                </>
            :
                (<div className="font-semibold text-center text-md backdrop-blur">Sorry, You've failed😫😫😫. Try harder next time</div>)
            }

            
            
            <button className="text-center btn mx-2 py-1 mt-3 bg-blue-500 text-white bg-blue-600 hover:bg-blue-800 
                rounded-lg font-semibold text-xl w-full" onClick={() => restartQuiz()}>Start Over</button>
            
        </div>
        <div className="mt-4 mb-2">
            <Summary />
        </div>
    </>
    )
}

const mapStartToProps = (state) => ({
    quiz: state.quiz,
  });
  export default connect(mapStartToProps, { restartQuiz })(Result);
