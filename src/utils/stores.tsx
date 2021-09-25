import React, { createContext, ReactNode, useContext } from 'react'
import { enableStaticRendering } from 'mobx-react'
import RootStore, { RootStoreHydration } from 'stores'

enableStaticRendering(typeof window === "undefined")

let store: RootStore

const StoreContext = createContext<RootStore | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

export function useStores() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStores must be used within StoresProvider')
  }
  return context
}

export function StoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode
  hydrationData?: RootStoreHydration
}) {
  const store = _initializeStore(hydrationData)

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

function _initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore()

  if (initialData) {
    _store.hydrate(initialData)
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}
