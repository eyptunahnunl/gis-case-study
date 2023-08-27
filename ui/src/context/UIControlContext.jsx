import { createContext, useState } from "react";

const UIControlContext = createContext({});

export const UIControlProvider = ({ children }) => {
  const [dataEntry, setDataEntry] = useState(true);
  const [locationAnalysis, setLocationAnalysis] =
    useState(false);
  const [attributeTable, setAttributeTable] =
    useState(false);

  const [toolBox, setToolBox] = useState(true);

  const data = {
    dataEntry,
    setDataEntry,
    attributeTable,
    setAttributeTable,
    locationAnalysis,
    setLocationAnalysis,
    toolBox,
    setToolBox,
  };

  return (
    <UIControlContext.Provider value={data}>
      {children}
    </UIControlContext.Provider>
  );
};

export default UIControlContext;
