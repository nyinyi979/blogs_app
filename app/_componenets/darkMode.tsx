'use client'
import { useEffect, useState } from "react";
import { MdNightlightRound } from "react-icons/md";
import { PiSunBold } from 'react-icons/pi'
//referenced from 'stackoverflow' :)
export default function DarkMode(prop: {type: string}){
    const [darkMode, setDarkMode] = useState(false);

  // check and reset theme when `darkMode` changes
    useEffect(() => {
      themeCheck();
    }, [darkMode]);

    // check theme on component mount
    useEffect(() => {
      themeCheck();
    }, []);

    // check and reset theme
    const themeCheck = () => {
      if (localStorage.darkMode === "dark") {
        document.getElementById('body')?.setAttribute('data-theme','dark')
        setDarkMode(true);
      } else {
        document.getElementById('body')?.setAttribute('data-theme' , 'light');
        setDarkMode(false);
      }
    } 
    if(prop.type === 'i') return ( <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode}/> )
    else return ( <ThemeButon darkMode={darkMode} setDarkMode={setDarkMode}/>)
}
export function ThemeToggle({ darkMode, setDarkMode }) {
    // called when theme button is pressed
  const toggleTheme = () => {
    const theme = localStorage.getItem("darkMode");
    if (theme) {
      localStorage.setItem("darkMode", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("darkMode", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <>
      <input type="checkbox" className='toggle toggle-accent' id='theme' checked={darkMode} onChange={()=>{toggleTheme()}}/>
    </>
  );
}
export function ThemeButon({ darkMode, setDarkMode }) {
    // called when theme button is pressed
  const toggleTheme = () => {
    const theme = localStorage.getItem("darkMode");
    if (theme) {
      localStorage.setItem("darkMode", theme === "dark" ? "light" : "dark");
    } else {
      localStorage.setItem("darkMode", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button className={`btn w-full btn-accent btn-sm my-2`} onClick={toggleTheme}>{darkMode? <>Dark Mode<MdNightlightRound /></> : <>Light Mode<PiSunBold /></> }</button>
  );
}