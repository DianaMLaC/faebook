import React, { useContext, createContext } from "react"
import { createConsumer, Consumer } from "@rails/actioncable"

interface CableProviderProps {
  children: React.ReactNode
}

export interface CableContextType {
  CableApp: {
    cable: Consumer
  }
}

const CableContext = createContext<CableContextType | null>(null)

function CableProvider({ children }: CableProviderProps): React.ReactElement {
  const actionCableUrl =
    process.env.NODE_ENV === "production"
      ? "wss://<your-deployed-app-domain>.com/cable"
      : "ws://localhost:3000/cable"

  const CableApp = {
    cable: createConsumer(actionCableUrl),
  }

  return <CableContext.Provider value={{ CableApp }}>{children}</CableContext.Provider>
}
function useCable(): CableContextType {
  const context = useContext(CableContext)
  if (!context) {
    throw new Error("useCable must be used within a CableProvider")
  }
  return context
}

export { CableProvider, useCable }
