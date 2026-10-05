"use client";

import { useEffect, useRef } from "react";
import { initImageToBase64 } from "./../../utils/Image/ImgToBase64/ImgToBase64";
import "./../../utils/Image/ImgToBase64/ImgToBase64.css";

export default function ImageToBase64Page() {
  const ref = useRef(null);

  // initImageToBase64 returns its own cleanup, which detaches the paste listener.
  useEffect(() => initImageToBase64(ref.current), []);

  return <div ref={ref} className="tool-page" />;
}