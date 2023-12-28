import './App.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/HomePage';

const App = () => {
  const token = localStorage.getItem("token")


  if(token == null) return <LoginPage />
  return <HomePage />
}

export default App