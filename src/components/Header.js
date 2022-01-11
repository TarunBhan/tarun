import React, { useState, useRef,useEffect } from "react";
import './Header.css'
const getCloud = () => 'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'.split(' ')


function Word(props){
  const { text, active, correct } = props

  if(correct === true){
      return <span className="correct">{text} </span>
   }
  if(correct === false)
  {
   return <span className="incorrect">{text} </span>
  }
   if(active)
   {
    return <span className="active">{text} </span>
  }
  return <span>{text} </span>
}
Word =React.memo(Word)

function Timer(props){
  const {correctWords,startCounting} =  props
  const [timeElapsed,setTimeElapsed]=useState(0)
  useEffect(()=>{
    let id
    if(startCounting){
    
       id= setInterval(()=>{
        setTimeElapsed(oldTime => oldTime + 1)
      }, 1000)
      }
      return ()=>{
        clearInterval(id)
      }
    }, [startCounting])
  const minutes = timeElapsed/60
  return <div>
      <p> Time: {timeElapsed}</p>
     <p>Speed:  {((correctWords/minutes) ||0 ).toFixed(2)} WPM</p>
    
     </div>
}
function Header(){
  const [inputValue, setInputValue] = useState('');
const cloud =useRef(getCloud())
const [startCounting,setStartCounting]=useState(false)
  
const [activeIndex,setactiveIndex]= useState(0)
 const [correctWordArray,setcorrectWordArray]= useState([])
  
function processInput(value)
{
  if(!startCounting)
  {
    setStartCounting(true)
  }
  if(value.endsWith(' '))
  { //the user finished the word
    if(activeIndex === cloud.current.length-1)
    {
      //overflow 
      setInputValue('Completed')
      return
    }
  
    setactiveIndex(index => index+1)
    setInputValue('')
    
    
      //correct word array we got
      setcorrectWordArray(data => {
        const word= value.trim()
        const newResult=[...data]
        newResult[activeIndex] = word === cloud.current[activeIndex]
        return newResult
      })
    }
  
  else{
    setInputValue(value)
  }
}
  return (
    <div className="box">
      <h1>Typing Test </h1>
    <Timer
    startCounting={startCounting} 
    correctWords={correctWordArray.filter(Boolean).length}
    />

      <p> {cloud.current.map((word,index) => {
         return  <Word text={word} 
         active={index===activeIndex}
         correct={correctWordArray[index]}
         
        />

      })} </p>
   <div className="i"> <input placeholder="Type here something" className="ip" value={inputValue} onChange={(e) => processInput(e.target.value)}/>
   </div>
    
    </div>
  );
};

export default Header;