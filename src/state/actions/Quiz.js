import axios from "axios";
import {NEXT_QUESTION, START_QUIZ, FINISH_QUIZ, RESTART_QUIZ, GET_QUESTIONS, GET_QUESTIONS_CATEGORIES, SET_LOADING, TIMER_ELAPSE} from "../actions/types"


//get the questions
export const getQuestions =() => async dispatch=>{
    await axios.get(`${process.env.REACT_APP_QUIZ_URL}api.php?amount=50&type=boolean`)
    .then(async res =>{
        const re = await res.data.results
        console.log(re)
        const questions = await re.map((i, index) => {
            return Object.assign(i, {answers: i.incorrect_answers.map(el =>{
               return {answerText:el, isCorrect:false}
            }).concat({answerText:i.correct_answer, isCorrect:true})},{id:index+1})
        })
        dispatch({
            type: GET_QUESTIONS,
            payload: questions
        })
    }).catch(err =>{
        console.log(err.response)
    })
    }




//get questions CATEGORIES
export const getQuestionsCategories =() => async dispatch=>{
    await axios.get(`${process.env.REACT_APP_QUIZ_URL}/api_category.php`)
    .then(res =>{
        dispatch({
            type: GET_QUESTIONS_CATEGORIES,
            payload: res.data
        })
    }).catch(err =>{
        console.log(err.response)
    })
    }


    


//NEXT QUESTIONS
export const nextQuestion = (isCorrect, id) => dispatch =>{
    setLoading()
    const ans = {
        isCorrect:isCorrect, id:id
    }
    dispatch({
        type: NEXT_QUESTION,
        payload:ans
    })
}


export const start = (data) => async dispatch=>{
    setLoading()
    await axios.get(`${process.env.REACT_APP_QUIZ_URL}api.php?amount=${data.totalQuestions}&category=${data.category}&difficulty=${data.difficulty}&type=${data.questionType}`)
    .then(async res =>{
        const re = await res.data.results
        const shuffle = (array) => {
            var currentIndex = array?.length,  randomIndex;
          
            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
          }
        const questions = await re.map((i, index) => {
            return Object.assign(i, {answers: shuffle(i.incorrect_answers.map(el =>{
               return {answerText:el, isCorrect:false}
            }).concat({answerText:i.correct_answer, isCorrect:true}))},{id:index+1})
        })
        dispatch({
            type: GET_QUESTIONS,
            payload: questions
        })
    }).catch(err =>{
        console.log(err.response)
    })
    dispatch({
        type: START_QUIZ,
        payload:data
    })
    
}

export const finish = (isCorrect, id) => dispatch =>{
    
    const ans = {
        isCorrect:isCorrect, id:id
    }
    dispatch({
        type: FINISH_QUIZ,
        payload:ans
    })
}


export const restartQuiz = () =>{
    return{
        type: RESTART_QUIZ,
    }
}

export const setLoading = () =>{
    return{
        type: SET_LOADING,
    }
}

export const timerElapse = () =>{
    return {
        type:TIMER_ELAPSE,
    }
}
