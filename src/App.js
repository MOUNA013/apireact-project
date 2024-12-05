import './App.css';
import Login from './components/login/Login';
import Notes from './components/notes/Notes';

import { useState, } from "react";


function App() {
  const [isConnected,setIsconnected]=useState(false);
  
  return (
    <div className="App">
    
      {
        isConnected?
        <Notes />
        
        :
        <Login setIsconnected={setIsconnected} />

      }

      
      
      

      
    </div>
  );
}

export default App;
// token={token}