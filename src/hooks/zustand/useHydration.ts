import { useState, useEffect } from "react"
import type { Mutate, StoreApi, UseBoundStore } from "zustand"

type StoreWithPersist<S> = Mutate<StoreApi<S>, [["zustand/persist", unknown]]>
type BoundStoreWithPersist<S> = UseBoundStore<StoreWithPersist<S>>

export function useHydration(boundStore: BoundStoreWithPersist<any>) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubFinishHydration = boundStore.persist.onFinishHydration(() =>
      setHydrated(true)
    )

    setHydrated(boundStore.persist.hasHydrated())

    return () => {
      unsubFinishHydration()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return hydrated
}
