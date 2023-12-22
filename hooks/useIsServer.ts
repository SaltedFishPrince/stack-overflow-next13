import React from "react";

const useIsServer = () => {
  const [isServer, setIsServer] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsServer(true)
    }
  }, [])
  return isServer
}


export default useIsServer
