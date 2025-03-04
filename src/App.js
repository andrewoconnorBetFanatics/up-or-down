import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import "./App.css"
import music from "./sound.wav"
import { Howl } from "howler";

const rand = Math.floor(Math.random() * 100);
const result = Math.random() < 0.5 ? "Good" : "Bad";
const str = Math.random() < 0.5 ? "Awarding Fancash" : "Calling Revert Endpoint";
const weather = ["It's miserable out", "Great stretch in the evening", "Could be worse"][Math.floor(Math.random() * 3)];
const BoolV2 = ["True","False","Perhaps"][Math.floor(Math.random() * 3)]
const cosmic =["Nik was Stopped", "Andrew is the Murderer", "The Big Appsecsy Determined"][Math.floor(Math.random() * 3)]
const symbols = ["⬆️", "⬇️", "NO STAND UP"];
const steps = [
    "Consulting Oracle.....",
    `Determining Celestial Invocation...${result}`,
    "Proceeding with Zodiac Verification...",
    str,
    `Asking Local Stranger on their current Meteorological opinion...${weather}`,
    `Birds Spotted: ${rand}`,
    `Does the Current day end in Day...${BoolV2}`,
    `Performing Cosmic Confirmation....${cosmic}`,
    `Oracle Consultation Complete`
]

export default function SlotMachine() {
  const [slots, setSlots] = useState(["⬆️", "⬇️", "NO STAND UP"]);
  const [text, setText] = useState("")
  const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        if (spinning) {
            const interval = setInterval(() => {
                setSlots(Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]));
            }, 100);

            let stepCounter = 0;
            const textInterval = setInterval(() => {
                if (stepCounter < steps.length) {
                    setText(steps[stepCounter]);
                    stepCounter++;
                } else {
                    clearInterval(textInterval);
                }
            }, 1450); // Show each step for 500ms

            setTimeout(() => {
                setSlots(Array.from({ length: 3 }, () => symbols[generateDay()]));
                setSpinning(false);
                clearInterval(interval);
                clearInterval(textInterval);
            }, 13400);

            return () => {
                clearInterval(interval);
                clearInterval(textInterval);
            };
        }
    }, [spinning]);

  return (
      <div className="mainDiv">
          <h1 className= "header">The Wheelie Oracle</h1>
          <h2 className="header">Spin To Stand-Up</h2>
        <div className="secondDiv">
          {slots.map((symbol, index) => (
              <motion.div
                  key={index}
                  className="motion"
                  animate={{ opacity: [0.5, 1], scale: [0.8, 1] }}
                  transition={{ duration: 0.1, repeat: spinning ? Infinity : 0 }}
              >
                {symbol}
              </motion.div>

          ))}

        </div>
          <div>
              {}
          </div>
        <button
            onClick={() => {
                setSpinning(true)
                Audio()
            }}
            disabled={spinning}
            className="other"
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
          <p>{text}</p>
      </div>
  );
}

    function generateDay(){
        const date = new Date()
        const dayOfWeek = date.getDay()

        if(noStandUp(dayOfWeek)){
            return 2
        }
        if(UpDay(dayOfWeek)){
            return 0
        }
        else {
            return 1
        }
    }

    function noStandUp(day){
        return (day === 0) || (day === 1) || (day === 6)
    }

    function UpDay(day) {
        return (day === 2) || (day === 4)
    }



var sound = new Howl({
    src: [music]
});
async function Audio() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            sound.play();
        }, i * 2700);
    }
}