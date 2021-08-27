import {NEXT_QUESTION, START_QUIZ, FINISH_QUIZ, RESTART_QUIZ, ABORT_QUIZ, GET_QUESTIONS, SET_LOADING, TIMER_ELAPSE} from "../actions/types"

const initialState = {
    /* qa: [
        {
            id: 1,
            question: "what is matter 01",
            answers: [
                { answerText:"state in matter", isCorrect:true },
                { answerText:"state in matter", isCorrect:false },
                { answerText:"state in matter", isCorrect:false },
            ],
            category:1,
        },
        {
            id: 2,
            question: "what is matter",
            answers: [
                { answerText:"state in matter", isCorrect:false },
                { answerText:"state in matter", isCorrect:false },
                { answerText:"state in matter", isCorrect:true },
            ],
            category:2,
        },
    ], */
    qa: null,
    myQa:[],
    categories: [
        {
            id:9 , name:"General Knowledge"
        },
        {
            id:12 , name:"Music"
        },
        {
            id:18 , name:"Computers"
        },
        {
            id:17 , name:"Science"
        },
        {
            id:21 , name:"Sports"
        },
        {
            id:27 , name:"Animals"
        },
        {
            id:23 , name:"History"
        }
    ],
    score: 0,
    totalQuestions:0,
    finished:false,
    count:1,
    loading:false,
    started: false,
    currentQuestion: null,
    answeredQuestions:[],

}

// eslint-disable-next-line
export default (state = initialState, action) => {
switch (action.type) {
    case GET_QUESTIONS:
        return{
            ...state,
            qa: action.payload,
            myQa: action.payload
        }
    case NEXT_QUESTION:
        return{
            ...state,
            score: action.payload.isCorrect === true ? state.score +1 : state.score,
            count: state.count+1,
            currentQuestion: state.myQa.filter(q => q.id === action.payload.id ),
            answeredQuestions:[...state.answeredQuestions, Object.assign(state.currentQuestion[0],{correct:action.payload.isCorrect === true ? 1 : 0})],
            loading:false
        }
    case START_QUIZ:
        return{
            ...state,
            started: true,
            totalQuestions: parseInt(action.payload.totalQuestions),
            qa: state.qa?.filter(q =>q.catid === action.payload.category),
            currentQuestion: state.myQa.filter(q => q.id === 1 ),

            loading:false
            
        }
    case FINISH_QUIZ:
        return{
            ...state,
            score: action.payload.isCorrect === true ? state.score +1 : state.score,
            count: state.count+1,
            currentQuestion: state.myQa.filter(q => q.id === action.payload.id ),
            answeredQuestions:[...state.answeredQuestions, Object.assign(state.currentQuestion[0],{correct:action.payload.isCorrect === true ? 1 : 0})],
            finished:true,  
        }


    case ABORT_QUIZ:
    case RESTART_QUIZ:
        return{
            ...state,
            score:0,
            totalQuestions:0,
            count:1,
            started:false,
            finished:false,
            answeredQuestions:[],
            currentQuestion: null,
        }
    case TIMER_ELAPSE:
        return{
            ...state,
            finished:true
        }
    case SET_LOADING:
        return{
            ...state,
            loading:true
        }


    default:
        return state
}

}