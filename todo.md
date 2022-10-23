-> mainbot
x 2 change viewer 
x 2 write in chat
x 2 test if it still works
-> backend/frontend


ui with active bots
x post to backend to send chat stop watching/change destination


watchhandler starts bots on pc. viewbot connect and start a ws connection. ws connection is displayed for webgui and get sent what to do from webpanel

messagining withq


frontend:

display all viewbots
change bot view.
checkbox or drag and drop ui to select multiple bots alternative to multi select

menu with order and text input


https://stackoverflow.com/questions/62504375/how-to-disable-ctrla-from-selecting-text-of-input-fields-when-focus-is-not-on-a


import React, { useEffect } from 'react';

const App = () => {
    
  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        console.log('Close')
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return(<p>Press ESC to console log "Close"</p>);
}