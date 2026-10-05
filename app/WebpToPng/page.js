"use client";

import { useEffect, useRef } from "react";
import { mountWebpToPng } from "./../../utils/Image/WebpToPng/WebpToPng";
import "./../../utils/Image/WebpToPng/WebpToPng.css";

export default function WebpToPngPage() {
  const ref = useRef(null);

  // mountWebpToPng returns its own unmount, which releases object URLs.
  useEffect(() => mountWebpToPng(ref.current), []);

  return <div ref={ref} className="tool-page" />;
}