import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  //const [color, setColor] = useState("black");
  const [isOnL, setIsOnL] = useState(false);
  const [isOnD, setIsOnD] = useState(false);
  const [isOnP, setIsOnP] = useState(false);
  const [originalColor, setOriginalColor] = useState<string | null>(null);
  //const [activeMode, setActiveMode] = useState<"light" | "dark" | "pastel">("light");

  const toggleSwitchL = () => {
    if (isOnL) {
      changeMode("original");
      setIsOnL(false);
    } else {
      changeMode("light");
      setIsOnL(true);
      setIsOnD(false);
      setIsOnP(false);
    }
  };
  
  const toggleSwitchD = () => {
    if (isOnD) {
      changeMode("original");
      setIsOnD(false);
    } else {
      changeMode("dark");
      setIsOnD(true);
      setIsOnL(false);
      setIsOnP(false);
    }
  };
  
  const toggleSwitchP = () => {
    if (isOnP) {
      changeMode("original");
      setIsOnP(false);
    } else {
      changeMode("pastel");
      setIsOnP(true);
      setIsOnL(false);
      setIsOnD(false);
    }
  };
  
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

  const changeMode = async (mode: "dark" | "light" | "pastel" | "original") => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) return;
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [mode, originalColor],
      func: (mode, originalColor) => {
        if (mode === "dark") {
          document.body.style.backgroundColor = "#000000";
        } else if (mode === "light") {
          document.body.style.backgroundColor = "#ffffff";
        } else if (mode === "pastel") {
          document.body.style.backgroundColor = "#ff8b94"; // Pastel color
        } else if (mode === "original") {
          document.body.style.backgroundColor = originalColor || "#ffffff"; // Default to white if null
        }
      },
    });
  };
  

  // const handleMode= (mode: "dark" | "light" | "pastel") => {
  //   changeMode(mode);
  // }
  
  useEffect(() => {
    const getOriginalColor = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) return;
  
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: () => {
              const computedColor = getComputedStyle(document.body).backgroundColor;
              return computedColor || "white"; // Default to white if no color is found
            },
          },
          (result) => {
            if (chrome.runtime.lastError) {
              console.error("Script execution error:", chrome.runtime.lastError.message);
            } else if (result && result[0]?.result) {
              console.log("Original color detected:", result[0].result);
              setOriginalColor(result[0].result);
            }
          }
        );
      } catch (error) {
        console.error("Error retrieving original color:", error);
      }
    };
  
    getOriginalColor();
  }, []);
  

  // useEffect(() => {
  //   getOriginalColor();
  // }, []);
  

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
              <div className={`louter-div ${ isOnL ? "active" : ""}`} onClick={() => {toggleSwitchL();}}>
                <div className='linner-div'>
                </div>
              </div>
             </button>
             <span>Light Mode</span>
          </div>

          <div className='dark-mode'>
             <button>
             <div className={`douter-div ${ isOnD ? "active" : ""}`} onClick={() => {toggleSwitchD();}}>
                <div className='dinner-div'>
                </div>
              </div>
             </button>
             <span>Dark Mode</span>
          </div>

          <div className='pastel-mode'>
             <button>
             <div className={`pouter-div ${ isOnP ? "active" : ""}`} onClick={() => {toggleSwitchP(); }}>
                <div className='pinner-div'>
                </div>
              </div>
             </button>
             <span>Pastel Mode</span>
          </div>
        </div>
        {/* <div className='bottom-div'>
         <input type='color' value={color} onChange={(e)=> setColor(e.target.value)} />
        </div> */}
      </div>
    </>
  )
}

export default App

