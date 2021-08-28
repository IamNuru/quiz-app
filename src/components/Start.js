import { useState } from "react";
import { connect } from "react-redux";
import { setLoading, start } from "../state/actions/Quiz";
import Loading from "./inc/Loading";

const Start = ({ quiz: { categories, loading }, start,setLoading }) => {
  const [data , setData ] = useState({
    category:"",
    totalQuestions:"5",
    questionType:"multiple",
    difficulty:""
  })
  // eslint-disable-next-line
  const { category, totalQuestions, questionType, difficulty } = data;


  const onChange = e =>{
    setData({...data, [e.target.name]:e.target.value})
  }
  

  const startNow = async () => {
    await setLoading()
    start(data);
  };

  return (
    !loading ? (
    <div className="wrap-start bg-white p-4 md:p-8 font-light m-auto " style={{fontSize:"1rem"}}>
      <p className="text-center underline font-semibold">Settings</p>
      
      <div className="justify-center">
        <div className="block start-content"> {
          categories?.length > 0 ? (
          <div className="block text-left my-3">
            <div className="start-label">Category</div>
            <div className="flex flex-wrap">
              <label className={`hover:bg-blue-400 px-2 w-full my-1 py-1 cursor-pointer ${category === "" ? 'hover:bg-blue-700 bg-blue-700 font-semibold text-white':''}`}>
                <input
                  type="radio"
                  name="category"
                  value=""
                  defaultChecked={true}
                  onChange={onChange}
                />
                All
              </label>
              {categories.map((cat) => {
                return (
                  <label key={cat.id} className={`hover:bg-blue-400 px-2 w-full my-1 py-1 cursor-pointer ${parseInt(category) === cat.id ? 'hover:bg-blue-700 bg-blue-700 font-semibold text-white':''}`}>
                    <input
                      type="radio"
                      name="category"
                      value={parseInt(cat.id)}
                      onChange={onChange}
                    />
                   {cat.name}
                  </label>
                );
              })}
            </div>
          </div>
        ) : (
          "No categories"
        )}
          <div className="block my-3">
            <div className="start-label">Total Questions</div>
            <div className="">
            <select name="totalQuestions" value={totalQuestions} 
              onChange={onChange} className="w-full bg-white border outline-none py-1">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            </div>
          </div>
          <div className="block my-3">
            <div className="start-label">Type</div>
            <div className="">
              <label className="mx-2 cursor-pointer">
                  <input
                    type="radio"
                    name="questionType"
                    value="multiple"
                    defaultChecked={true}
                    onChange={onChange}
                  />
                  Multiple
                </label>
              <label className="mx-2 cursor-pointer">
                  <input
                    type="radio"
                    name="questionType"
                    value="boolean"
                    onChange={onChange}
                  />
                  True/False
                </label>
            </div>
          </div>
          <div className="block my-3">
            <div className="start-label">Difficulty</div>
            <div className="">
              <label className="mx-1 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value="easy"
                    onChange={onChange}
                  />
                  Easy
                </label>
              <label className="mx-1 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value="medium"
                    onChange={onChange}
                  />
                  Medium
                </label>
              <label className="mx-1 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value="hard"
                    onChange={onChange}
                  />
                  Hard
                </label>
              <label className="mx-1 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value=""
                    onChange={onChange}
                  />
                  None
                </label>
            </div>
          </div>
          <div className="text-center btn mx-2 py-2 my-2 bg-blue-500 text-white bg-blue-600 hover:bg-blue-800 
          rounded-lg font-semibold text-xl">
            <button onClick={startNow} className="w-full">Start</button>
          </div>
        </div>
      </div>
    </div>
): (
    
  <div className="h-screen grid justify-center items-center"><Loading /></div>
      
    )
);
};

const mapStartToProps = (state) => ({
  quiz: state.quiz,
});
export default connect(mapStartToProps, { start,setLoading })(Start);
