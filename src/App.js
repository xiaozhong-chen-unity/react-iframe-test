import React from "react";
import "./style.css";
import Frame from 'react-frame-component';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <iframe src="http://localhost:8080/"/>
    </div>
  );
}
