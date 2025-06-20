import ItsMe from "./components/ItsMe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aman Anil | Digital Specialist",
  description: "Advanced cybersecurity research, AI-driven threat detection, and secure software development.",
};

export default function Page() {
  return (
    <div>
      <ItsMe />
    </div>
  );
}