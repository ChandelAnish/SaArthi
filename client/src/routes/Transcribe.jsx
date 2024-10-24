import React, { useState } from "react";
import CameraFeed from "../components/CameraFeed";
import CopyText from "../components/CopyText";

export default function Transcribe() {
  const [text, setText] = useState("");

  return (
    <div>
      <CameraFeed setText={setText} text={text} />
      <CopyText text={text} />
    </div>
  );
}
