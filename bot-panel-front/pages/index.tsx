import type { NextPage } from 'next'
import { useEffect, useState, useCallback } from "react";
import { useImmer } from "use-immer";
const Home: NextPage = () => {
  //hotkey shift  ctrl
  // top bar with commands
  // list of elements with css that changes based on click
  // update list remove/add elements to it
  // toolbar checks array of elements and gets if selected = true or false pass hook from parrent to child
  // get cpu and ram usage
  // creat hook that changes value
  const [state, setState] = useState("false");
  const [bots, setBots] = useImmer<listElem[]>([]);

  const handleToggle = useCallback((id: String) => {
    setBots((draft) => {
      const x = draft.find((x) => x.id === id);
      if (x) {
        x.selected = !x.selected
      }
    });
  }, []);


  useEffect(() => {
    setBots([{ id: "1", lastAction: "asdads", selected: false, setBots: setBots, bots }, { id: "2", lastAction: "asdads", selected: false, setBots: setBots, bots }, { id: "3", lastAction: "asdads", selected: false, setBots: setBots, bots }])

    const handleEscUp = (event: any) => {
      if (event.keyCode === 17) {
        setState("ass")

      }
      else {
        setState("s")
      }
    };
    const handleEsDown = (event: any) => {
      if (event.keyCode === 17) {
        setState("ddd")
      }
      else {
        setState("s")
      }
    };
    window.addEventListener('keydown', handleEsDown);
    window.addEventListener('keyup', handleEscUp);
    return () => {
      window.removeEventListener('keydown', handleEsDown);
      window.removeEventListener('keyup', handleEscUp);
    };
  }, []);

  return (
    <div>
      <p>
        {state}
      </p>
      {
        bots.map((x, index) => {
          return (<div key={index}>
            <button onClick={(y) => {
              handleToggle(x.id)
            }}>
              Click me
            </button>
            <style jsx>{`
              button {
                color: ${x.selected ? "green" : "red"};
              }
          `}</style>
          </div>)
        })
      }
    </div>
  )
}
type listElem = {
  id: string
  lastAction: string
  selected: boolean
  setBots: Function
  bots: listElem[]
}

export default Home
