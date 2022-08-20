import React, { createContext, useState } from "react";
const RepostsContext = createContext();

export function RepostsContextProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [repostId, setRepostId] = useState(null);
  const [isReposted, setIsReposted] = useState(null);
  const values = {
    modal,
    setModal,
    repostId,
    setRepostId,
    isReposted,
    setIsReposted,
  };
  return (
    <RepostsContext.Provider value={values}>{children}</RepostsContext.Provider>
  );
}

export default RepostsContext;
