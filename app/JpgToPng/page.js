"use client";

import { useEffect, useRef } from "react";
import { mountJpgToPng } from "./../../utils/Image/JpgToPng/JpgToPng";
import "./../../utils/Image/JpgToPng/JpgToPng.css";

export default function JpgToPngPage() {
  const ref = useRef(null);

  // mountJpgToPng returns its own unmount, which releases object URLs.
  useEffect(() => mountJpgToPng(ref.current), []);

  return <div ref={ref} className="tool-page" />;
}