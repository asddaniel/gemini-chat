
import Markdown from 'react-markdown'
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css'
import { FormEvent, useMemo, useState } from 'react';
import TypeIt from "typeit-react";
//import Typed from 'typed.js';
//import api key from env file
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

// Fetch your API_KEY
const API_KEY = apiKey; // "AIzaSyDY78QerX5e30_waM56LSVsVSMIKiOze9U";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

function App() {
  
 // const typeelement = useRef(null)
 let count = 0
  const [prompt, setprompt] = useState("")
  const [geminiresult, setgeminiresult] = useState("")
  const [loading, setloading] = useState(false)
  const [random, setrandom] = useState(2)
  // useEffect(() => {
  //   const typed = new Typed(typeelement.current, {
  //     strings: [geminiresult],
  //     typeSpeed: 9,

  //   });

  //   return () => {
  //     // Destroy Typed instance during cleanup to stop animation
  //     typed.destroy();
  //   };
  // }, [geminiresult])
  const handleSubmit = async() => {
    if(prompt.length > 0){
      setloading(true)
      if(random==1){
        setrandom(2)
      }else{
        setrandom(1)
      }
      const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  setgeminiresult(text);
  setloading(false)
      setprompt("")
  }
}

const getResult = useMemo(()=>{
  count++;
  const identifiant = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
 const randomnumber = random==2 ? 1 :2 //Math.random()*50
 console.log("random", randomnumber, count)
 if(random==1){
  setrandom(2)
 }else{
  setrandom(1)
 }
 if(randomnumber%2==0){
  return <div>
      <TypeIt element={"p"} id={identifiant} options={{speed: 9}}>
  <Markdown>{geminiresult}</Markdown>
</TypeIt>
  </div> 
 }
  return <TypeIt element={"p"} id={identifiant} options={{speed: 9}}>
  <Markdown>{geminiresult}</Markdown>
</TypeIt>
  
}, [geminiresult, loading])

  return (
    <>
    <div className="text-2xl p-2 shadow-lg font-bold px-3"> Chat Gemini </div>
    <div className="pt-5 p-3">
      <div className="p-2">
        {loading ? "loading..." : ""}
      </div>
      <div className="p-3 border rounded">
      {!loading && getResult}
     
      {/* <div ref={typeelement}>
         
      </div> */}
        
        
      </div>
      <div className="z-60 mt-8 p-3 bottom-0 sticky shadow rounded w-full px-5">
        <textarea name="" id="" onInput={(e:FormEvent<HTMLTextAreaElement>) => setprompt((e.target as HTMLTextAreaElement).value)} placeholder='Type your message' className="rounded text-gray-900 w-full outline-0 border border-gray-600 p-3"></textarea>
        <div className="pt-3">
        <button className="rounded bg-sky-800 text-white font-bold p-2 px-3" onClick={handleSubmit}>Send</button>
      </div>
      </div>
      
   
    </div>
 
    </>
  )
}

export default App
