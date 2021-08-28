import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { timerElapse } from "../../state/actions/Quiz";

const Timer = ({quiz:{totalQuestions}, timerElapse}) => {
    const [ minutes, setMinutes ] = useState(totalQuestions > 0 ? totalQuestions * 1 : 1);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    timerElapse()
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div className={`font-semibold text-2xl ${seconds < 6 && minutes < 1 ? 'blink_me': ''}`}>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

const mapStateToProps = state =>({
    quiz: state.quiz
})

export default connect(mapStateToProps, {timerElapse})(Timer);
