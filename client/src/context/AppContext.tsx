import React, { createContext, useState, ReactNode } from "react";

type SectionType = "chat" | "resources" | "report" | "learn";

interface AppContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  showHelpModal: boolean;
  toggleHelpModal: () => void;
}

export const AppContext = createContext<AppContextType>({
  activeSection: "chat",
  setActiveSection: () => {},
  showHelpModal: false,
  toggleHelpModal: () => {}
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionType>("chat");
  const [showHelpModal, setShowHelpModal] = useState(false);

  const toggleHelpModal = () => {
    setShowHelpModal(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      activeSection,
      setActiveSection,
      showHelpModal,
      toggleHelpModal
    }}>
      {children}
    </AppContext.Provider>
  );
};
