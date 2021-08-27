import "./App.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./state/Store";
import Home from "./components/Home";

function App() {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <div className="header z-50 bg-white text-center py-4 font-semibold text-2xl">QUIZ APP</div>
        <div className="App">
          <Home />
        </div>  
      </div>
      
    </Provider>
  );
}

export default App;
