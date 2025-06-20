import Projects from "../components/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Aman Anil | Digital Specialist",
  description: "Advanced cybersecurity research, AI-driven threat detection, and secure software development.",
};

export default function Page() {
  return (
    <div>
      <Projects />
    </div>
  );
}
