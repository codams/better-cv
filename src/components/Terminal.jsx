import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Help,
  UnknownCommand,
  Hobbies,
  Experiences,
  Schools,
  Skills,
  Ls,
  Userhistoryline,
  Me,
  Github,
  Contact,
  Projects,
  Status,
  Resume,
} from "./UserReturns"
import { commands } from "../utils/autofill"

const startingEvent = [
  <>
    <motion.p
      animate={{
        display: "block",
      }}
      initial={{
        display: "none",
      }}
      transition={{ ease: "easeOut", duration: 0.2, delay: 1 }}
    >
      Initializing...
    </motion.p>

    <motion.p
      animate={{
        display: "block",
      }}
      initial={{
        display: "none",
      }}
      transition={{ ease: "easeOut", duration: 0.2, delay: 2 }}
    >
      DamOS booting
    </motion.p>

    <motion.p
      animate={{
        display: "block",
      }}
      initial={{
        display: "none",
      }}
      transition={{ ease: "easeOut", duration: 0.2, delay: 2.8 }}
    >
      Type <span className="text-yellow-200">help</span> to access the list of
      commands
    </motion.p>
  </>,
]

export default function Terminal() {
  // Handle history for key up
  let [histories, setHistory] = useState([])
  const addHistory = history => setHistory([...histories, history])

  // Handle all event state update like `clear`
  let [events, setEvents] = useState(startingEvent)
  const addEvent = event => setEvents([...events, event])
  const removeEvents = () => setEvents([])

  let [userInput, setUserInput] = useState("")

  const handleKeyUp = e => {
    e.preventDefault()
    if (userInput === undefined) {
      userInput = ""
    }

    const trimLowered = userInput.toLowerCase().trim()
    if (e.key === "Enter") {
      if (trimLowered === "") {
        return null
      }
      addHistory(trimLowered)

      switch (trimLowered) {
        case "help": {
          addEvent(<Help />)
          break
        }

        case "clear": {
          removeEvents()
          break
        }
        case "hobbies": {
          addEvent(<Hobbies />)
          break
        }
        case "experiences": {
          addEvent(<Experiences />)
          break
        }
        case "schools": {
          addEvent(<Schools />)
          break
        }
        case "skills": {
          addEvent(<Skills />)
          break
        }
        case "ls": {
          addEvent(<Ls />)
          break
        }
        case "me": {
          addEvent(<Me />)
          break
        }
        case "github": {
          addEvent(<Github />)
          break
        }
        case "contact": {
          addEvent(<Contact />)
          break
        }
        case "projects": {
          addEvent(<Projects />)
          break
        }
        case "status": {
          addEvent(<Status />)
          break
        }
        case "resume": {
          addEvent(<Resume />)
          break
        }

        default: {
          addEvent(<UnknownCommand command={trimLowered} />)
          break
        }
      }
      setUserInput("")
    } else if (e.key === "ArrowUp") {
      if (histories.length) {
        if (userInput === histories[histories.length - 1]) {
          setUserInput(histories[histories.length - 2])
        } else {
          setUserInput(histories[histories.length - 1])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // First we need to get the userInput -> trimLowered
      // Then we map all commands
      commands.map(command => {
        if (command.startsWith(trimLowered)) {
          // If userInput begin like on of these command, set this command as userInput
          setUserInput(command)
        }
      })
    }
  }

  return (
    <div className="md:block hidden">
      {events.map((event, key) => {
        return (
          <motion.div
            key={key}
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          >
            {event}
          </motion.div>
        )
      })}
      <motion.div
        className="flex flex-col"
        animate={{
          opacity: 1,
        }}
        initial={{
          opacity: 0,
        }}
        transition={{ ease: "easeOut", duration: 0.2, delay: 4 }}
      >
        <label htmlFor="line" className="text-yellow-200">
          Damien@web ~/resume
        </label>
        <div>
          <i>$ </i>
          <motion.input
            autoFocus
            name="line"
            id="line"
            type="text"
            className="w-72 bg-gray-800 focus:outline-none border-b-2 border-transparent focus:border-yellow-300"
            onKeyDown={e => {
              if (e.key === "Tab") e.preventDefault()
            }}
            onKeyUp={handleKeyUp}
            onChange={e => setUserInput(e.target.value)}
            value={userInput}
            autoComplete="off"
          />
        </div>
      </motion.div>
    </div>
  )
}
