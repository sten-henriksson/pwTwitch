import type { NextPage } from 'next'
import { useEffect, useState, useCallback, SetStateAction } from "react";
import { useImmer } from "use-immer";
import useWebSocket, { ReadyState } from 'react-use-websocket';
const Home: NextPage = () => {
  //hotkey shift  ctrl
  //backend will store last action

  const { sendMessage, lastMessage, readyState } = useWebSocket("ws:///217.72.52.82:8093");
  const [bots, setBots] = useImmer<listElem[]>([]);
  const [inputValue, setInputValue] = useState("");
  function sendTask() {
    const result = bots.filter(x => x.selected);
    console.log(inputValue);
    console.log(result);
    if (result && inputValue) {
      result.forEach(element => {
        sendMessage(JSON.stringify({ action: 0, data: inputValue, id: element.id }))
      });
      setBots((draft) => {
        draft.forEach(element => {
          element.selected = false
        });
      });
    }
  }
  const handleToggle = useCallback((id: String) => {
    setBots((draft) => {
      const x = draft.find((x) => x.id === id);
      if (x) {
        x.selected = !x.selected
      }
    });
  }, []);
  useEffect(() => {
    if (lastMessage !== null) {
      // match new or removed then keep if their selected
      try {
        console.log(lastMessage.data.toString());

        let payload = JSON.parse(lastMessage.data.toString())
        payload.forEach((element: socketData) => {
          // add to gui if its not there
          const found = bots.find(x => x.id == element.id);
          if (!found) {
            if (!element.lastAction) {
              element.lastAction = "directory"
            }
            setBots((draft) => {
              draft.push({ id: element.id, lastAction: element.lastAction, selected: false, handleToggle })
            });
          }
          else {
            setBots((draft) => {
              draft.forEach(x => {
                if (x.id == element.id) {
                  x.lastAction = element.lastAction
                }
              });
            });
          }
        });
        bots.forEach(bot => {
          // if bot is not in payload means its disconnected from server 
          const found = payload.find((x: string) => bot.id == x).toString();
          if (!found) {
            console.log("found", found);
            console.log("removed");
            for (let index = 0; index < bots.length; index++) {
              setBots((draft) => {
                draft.splice(index, 1)
              });
            }
          }
          else {
          }
        });
      } catch (error) {

      }
      //setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setBots]);
  const onChangeHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };
  return (
    <main>
      <div>
        <style jsx>{`
          input{
            width: 50%;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            margin: 10px;
          }
          button, input[type="submit"], input[type="reset"] {
            padding: 0;
            font: inherit;
            cursor: pointer;
            outline: inherit;
          }
        `}
        </style>

        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={inputValue}
        />

        <button onClick={(y) => {
          sendTask()
        }}>
          <h1>{"send"}</h1>

        </button>

        {
          bots.map((x, index) => {
            return (
              <div className='container' key={index}>
                {botComp(x)}
              </div>)
          })
        }

      </div>
    </main>
  )
}


const botComp = ({ id, lastAction, selected, handleToggle }: listElem) => (
  <p>
    <button onClick={(y) => {
      handleToggle(id)
    }}>
      <h1>{id + " current-task: " + lastAction}</h1>

    </button>
    <style jsx>{`
        button {
          background: ${selected ? "grey" : "black"};
          border-color: ${selected ? "grey" : "black"};
        } 
        h1{
          color: antiquewhite;
        }
      `}
    </style>
    <style jsx global>{`
             
    `}</style>
  </p>
);
type socketData = {
  id: string
  lastAction: string
}
type listElem = {
  id: string
  lastAction: string
  selected: boolean,
  handleToggle: Function
}

export default Home
