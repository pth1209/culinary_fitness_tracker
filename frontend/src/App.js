import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Auth } from './components/auth';
import { CreateRecipe } from './components/create-recipe';
import { Home } from './components/home';
import { SavedRecipe } from './components/saved-recipe';
import { EnterCalorie } from './components/enter-calorie';
import { CalorieList } from './components/calorie-list';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />}></Route>
          <Route path = "/auth" element = {<Auth />}></Route>
          <Route path = "/create-recipe" element = {<CreateRecipe />}></Route>
          <Route path = "/saved-recipe" element = {<SavedRecipe />}></Route>
          <Route path = "/enter-calorie" element = {<EnterCalorie />}></Route>
          <Route path = "/calorie-list" element = {<CalorieList />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;