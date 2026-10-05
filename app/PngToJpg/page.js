"use client";

import { useEffect, useRef } from "react";
import { mountPngToJpgTool } from "./../../utils/Image/PngToJpg/PngToJpg";
import "./../../utils/Image/PngToJpg/PngToJpg.css";

export default function PngToJpgPage() {
  const ref = useRef(null);

  // mountPngToJpgTool returns its own unmount, which releases object URLs.
  useEffect(() => mountPngToJpgTool(ref.current), []);

  return <div ref={ref} className="tool-page" />;
}