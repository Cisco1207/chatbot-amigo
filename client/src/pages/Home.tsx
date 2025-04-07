import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import ChatSection from "@/components/ChatSection";
import ResourcesSection from "@/components/ResourcesSection";
import ReportSection from "@/components/ReportSection";
import LearnSection from "@/components/LearnSection";
import HelpModal from "@/components/HelpModal";

export default function Home() {
  const { activeSection, showHelpModal } = useContext(AppContext);

  return (
    <div className="flex-grow p-4 overflow-y-auto pb-20 md:pb-4" id="content-container">
      {activeSection === "chat" && <ChatSection />}
      {activeSection === "resources" && <ResourcesSection />}
      {activeSection === "report" && <ReportSection />}
      {activeSection === "learn" && <LearnSection />}
      
      {showHelpModal && <HelpModal />}
    </div>
  );
}
