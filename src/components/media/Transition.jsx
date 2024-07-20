const Transition = ({ children }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2 mt-4 slide-top">
      {children}
    </div>
  );
};

export default Transition;
