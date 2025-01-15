import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openTrailerDialog = (media) => {
    setSelectedMedia(media);
    setIsTrailerOpen(true);
  };

  const closeTrailerDialog = () => {
    setIsTrailerOpen(false);
    setSelectedMedia(null);
  };

  return (
    <DialogContext.Provider
      value={{
        isTrailerOpen,
        selectedMedia,
        openTrailerDialog,
        closeTrailerDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
