import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";

const App = () => {
  const iframeRef = useRef();
  const playerSrc = "http://localhost:8888";
  const playerOrigin = playerSrc;

  const postMessageToIframe = useCallback(
    (message) => {
      iframeRef.current.contentWindow?.postMessage(message, playerOrigin);
    },
    [iframeRef]
  );

  const [engravingText, setEngravingText] = useState("");

  const engrave = useCallback(
    (text) => {
      postMessageToIframe({
        method: 'engrave',
        args: [text]
      });
    },
    [postMessageToIframe]
  );

  useEffect(() => {
    engrave(engravingText);
  }, [engravingText, engrave]);

  const changeCamera = useCallback(
    (cameraId) => {
      postMessageToIframe({
        method: "setViewPoint",
        args: [cameraId],
      });
    },
    [postMessageToIframe]
  );

  const changeWatchFunction = useCallback(
    (functionName) => {
      postMessageToIframe({
        method: "setWatchFunction",
        args: [functionName],
      });
    },
    [postMessageToIframe]
  );

  return (
    <div>
      <iframe ref={iframeRef} src={playerSrc} />
      <div>
        <div>engraving</div>
        <textarea
          rows={3}
          cols={11}
          value={engravingText}
          onChange={(event) => setEngravingText(event.target.value)}
        ></textarea>
      </div>
      <div>
        <div>change camera</div>
        <button onClick={() => changeCamera("front")}>front</button>
        <button onClick={() => changeCamera("side")}>side</button>
        <button onClick={() => changeCamera("3/4")}>3/4</button>
        <button onClick={() => changeCamera("engraving")}>engraving</button>
      </div>
      <div>
        <div>watch functions</div>
        <button onClick={() => changeWatchFunction("setRealtime")}>
          real time
        </button>
        <button onClick={() => changeWatchFunction("setFixedTime")}>
          10:10
        </button>
        <button onClick={() => changeWatchFunction("setFastForward")}>
          fast forward
        </button>
      </div>
    </div>
  );
};

export default App;
