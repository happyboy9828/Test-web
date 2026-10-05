// Tool pages are client components, so their metadata lives in this layout.
import { toolMetadata } from "../../lib/pages";

export const metadata = toolMetadata("/PngToJpg");

export default function ToolLayout({ children }) {
  return children;
}