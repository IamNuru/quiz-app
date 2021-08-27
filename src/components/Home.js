import { connect } from "react-redux"
import QA from "./QA"
import Result from "./Result"
import Start from "./Start"
import { getQuestions,getQuestionsCategories } from "../state/actions/Quiz"

const Home = ({quiz: {started, finished}}) => {


    return (
        <div className="mt-4 md:p-8 w-full md:w-8/12 m-auto">
            {
                !started ?
                <Start />
                :
                (
                    <>
                    {
                        !finished ? <QA /> : <Result />
                    }
                    </>
                )
            }
        </div>
    )
}

const mapStartToProps = state =>({
    quiz: state.quiz
})
export default connect(mapStartToProps, {getQuestions,getQuestionsCategories})(Home)
