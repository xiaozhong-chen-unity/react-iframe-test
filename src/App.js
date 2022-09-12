import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import { featureSetsByProduct } from './featureSetsByProduct';

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

  const [productIndex, setProductIndex] = useState(0);
  const [engravingText, setEngravingText] = useState("");

  const switchProduct = useCallback(
    (index) => {
      postMessageToIframe({
        method: "switchProduct",
        args: [index]
      });
      setProductIndex(index);
    },
    [postMessageToIframe, setProductIndex]
  );

  useEffect(() => {
    switchProduct(0);
  }, [switchProduct]);

  const setVariant = useCallback(
    (featureId) => {
      postMessageToIframe({
        method: "setVariant",
        args: [featureId]
      });
    },
    [postMessageToIframe]
  );

  const engrave = useCallback(
    (text) => {
      postMessageToIframe({
        method: "engrave",
        args: [text],
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
        <h3>switch product</h3>
        <button onClick={() => switchProduct(0)}>Tank_Must_S</button>
        <button onClick={() => switchProduct(1)}>Tank_Must_L</button>
        <button onClick={() => switchProduct(2)}>Tank_Must_XL</button>
      </div>
      <div>
        <h3>set variant</h3>
        {featureSetsByProduct[productIndex].map((featureSet) => (<>
          <h4>{featureSet.name}</h4>
          <div>{featureSet.variants.map((variant) => (<>
            <button onClick={() => setVariant(variant.id)}>{variant.name}</button>
          </>))}</div>
        </>))}
      </div>
      <div>
        <h3>engraving</h3>
        <textarea
          rows={3}
          cols={11}
          value={engravingText}
          onChange={(event) => setEngravingText(event.target.value)}
        ></textarea>
      </div>
      <div>
        <h3>change camera</h3>
        <button onClick={() => changeCamera("front")}>front</button>
        <button onClick={() => changeCamera("side")}>side</button>
        <button onClick={() => changeCamera("3/4")}>3/4</button>
        <button onClick={() => changeCamera("engraving")}>engraving</button>
      </div>
      <div>
        <h3>watch functions</h3>
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
