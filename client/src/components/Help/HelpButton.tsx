import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HelpButton() {
  const { toggleHelpModal } = useContext(AppContext);

  return (
    <motion.div
      className="fixed bottom-20 right-6 z-50 sm:bottom-8 sm:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={toggleHelpModal}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Ayuda"
      >
        <span className="material-icons text-2xl">help</span>
      </Button>
    </motion.div>
  );
}