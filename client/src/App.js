import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from './pages/auth';
import Home from './pages/home';
import CreateRecipe from './pages/createRecipe';
import SavedRecipes from './pages/savedRecipes';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-recipe" element={<CreateRecipe />} />
      <Route path="/saved-recipes" element={<SavedRecipes />} />
      <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
