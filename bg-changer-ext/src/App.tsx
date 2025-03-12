import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("black");
  const [isOnL, setIsOnL] = useState(false);
  const [isOnD, setIsOnD] = useState(false);
  const [isOnP, setIsOnP] = useState(false);
  const [activeMode, setActiveMode] = useState<"light" | "dark" | "pastel">("light");

  const toggleSwitchL = () => {
    setIsOnL(!isOnL);
    if(isOnD)
      setIsOnD(!isOnD);
    if(isOnP)
      setIsOnP(!isOnP);
  }
  const toggleSwitchD = () => {
    setIsOnD(!isOnD);
    if(isOnL)
      setIsOnL(!isOnL);
    if(isOnP)
      setIsOnP(!isOnP);
  }
  const toggleSwitchP = () => {
    setIsOnP(!isOnP);
    if(isOnL)
      setIsOnL(!isOnL);
    if(isOnD)
      setIsOnD(!isOnD);
  }
  // const onclick = async () => {
  //   const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
  //   chrome.scripting.executeScript<string[], void>({
  //     target: { tabId: tab.id! },
  //     args: [color],
  //     func: (color) => {
  //       document.body.style.backgroundColor = color
  //     }
  //   })
  // }

  const changeMode = async (activeMode: "dark" | "light" | "pastel") => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) return;
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [activeMode],
      func: (mode) => {
        if (mode === "dark") {
          document.body.style.backgroundColor = "#000000";
          document.body.style.color = "#ffffff";
        } else if (mode === "light") {
          document.body.style.backgroundColor = "#ffffff";
          document.body.style.color = "#000000";
        } else if (mode === "pastel") {
          document.body.style.backgroundColor = "#f8c8dc"; // Example pastel color (light pink)
          document.body.style.color = "#000000";
        }
      },
    });
  };

  const handleMode= (mode: "dark" | "light" | "pastel") => {
    changeMode(mode);
  }
  

  return (
    <>
      <div className='main-container'>
        <div className='top-div'>
          <div className='logo-div'>
            <span className='name'>Theemodor</span>
          </div>
          <button className='close-btn'>
          <img src="icondelete.png" className='close-icon'></img>
          </button>
        </div>
        <hr />
        <div className='mid-div'>
          <div className='light-mode'>
             <button>
              <div className={`louter-div ${ isOnL ? "active" : ""}`} onClick={() => {toggleSwitchL(); setActiveMode("light"); handleMode(activeMode); }}>
                <div className='linner-div'>
                </div>
              </div>
             </button>
             <span>Light Mode</span>
          </div>

          <div className='dark-mode'>
             <button>
             <div className={`douter-div ${ isOnD ? "active" : ""}`} onClick={() => {toggleSwitchD(); setActiveMode("dark"); handleMode(activeMode); }}>
                <div className='dinner-div'>
                </div>
              </div>
             </button>
             <span>Dark Mode</span>
          </div>

          <div className='pastel-mode'>
             <button>
             <div className={`pouter-div ${ isOnP ? "active" : ""}`} onClick={() => {toggleSwitchP(); setActiveMode("pastel"); handleMode(activeMode); }}>
                <div className='pinner-div'>
                </div>
              </div>
             </button>
             <span>Pastel Mode</span>
          </div>
        </div>
        <div className='bottom-div'>
         <input type='color' value={color} onChange={(e)=> setColor(e.target.value)} />
        </div>
      </div>
    </>
  )
}

export default App

