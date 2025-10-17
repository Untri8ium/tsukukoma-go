"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LocationSelector } from "@/components/location-selector"
import { NavigationView } from "@/components/navigation-view"
import { Switch } from "@/components/ui/switch"
import { maleBathrooms, femaleBathrooms } from "@/components/location-selector"
import { get } from "http"
import { set } from "date-fns"

export type Location = {
  id: string
  locid: string
  name: string
  category: string
  organizer: string
  position: string
  keywords: string[]
}

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [showNavigation, setShowNavigation] = useState(false)
  const [rainyMode, setRainyMode] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [trueDestination, setTrueDestination] = useState<Location | null>(null)

  const isUpdatingURL = useRef(false)

  useEffect(() => {
    if (isUpdatingURL.current) {
      isUpdatingURL.current = false
      return
    }

    const depId = searchParams.get("dep")
    const destId = searchParams.get("dest")
    const rainy = searchParams.get("rainy") === "true"
    const nav = searchParams.get("nav") === "true"

    // If nav=true but missing either dep or dest, redirect to home
    if (nav && (!depId || !destId)) {
      router.replace("/")
      return
    }

    if (searchParams.has("rainy")) {
      setRainyMode(rainy)
    }

    // Load locations from URL if available
    if (depId || destId) {
      import("@/components/location-selector").then(({ getLocationById }) => {
        let validDep = null
        let validDest = null

        if (depId) {
          const dep = getLocationById(depId)
          if (dep) {
            validDep = dep
            setCurrentLocation(dep)
          }
        }
        if (destId) {
          const dest = getLocationById(destId)
          if (dest) {
            validDest = dest
            setDestination(dest)
          }
        }

        if ((depId && !validDep) || (destId && !validDest) || (depId && destId && depId === destId)) {
          router.replace("/")
          return
        }

        // Show navigation if both locations are set and nav=true
        if (nav && validDep && validDest) {
          setShowNavigation(true)
        }
      })
    }
  }, [searchParams, router])

  const updateURL = (
    newCurrentLocation?: Location | null,
    newDestination?: Location | null,
    newRainyMode?: boolean,
    navigate?: boolean,
  ) => {
    isUpdatingURL.current = true

    const params = new URLSearchParams()

    const currentLoc = newCurrentLocation !== undefined ? newCurrentLocation : currentLocation
    const destLoc = newDestination !== undefined ? newDestination : destination
    const rainy = newRainyMode !== undefined ? newRainyMode : rainyMode

    if (currentLoc) params.set("dep", currentLoc.locid)
    if (destLoc) params.set("dest", destLoc.locid)
    if (rainy) params.set("rainy", "true")
    if (navigate) params.set("nav", "true")

    const url = params.toString() ? `/?${params.toString()}` : "/"
    router.replace(url)
  }

  const handleCurrentLocationChange = (location: Location | null) => {
    setCurrentLocation(location)
    updateURL(location, undefined, undefined, false)
  }

  const handleDestinationChange = (location: Location | null) => {
    setDestination(location)
    updateURL(undefined, location, undefined, false)
  }

  const handleRainyModeChange = (enabled: boolean) => {
    setRainyMode(enabled)
    updateURL(undefined, undefined, enabled, showNavigation)
  }

  const handleNavigate = () => {
    if (currentLocation && destination) {
      setShowNavigation(true)
      updateURL(undefined, undefined, undefined, true)
    }
  }

  const handleBack = () => {
    setShowNavigation(false)
    updateURL(undefined, undefined, undefined, false)
  }

  useEffect(() => {

    const fetchTrueDestination = async () => {
    if (!currentLocation || !destination) {
      setTrueDestination(null)
      return
    }

    let actualDestination = destination
    
    if (["m", "f"].includes(destination.locid)){
    const getCost = async (target: Location) => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams({
          departure: currentLocation.locid,
          destination: target.locid,
          rainy: rainyMode.toString(),
        })

        const response = await fetch(`/api/route?${params}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch route")
        }
        const data = await response.json()
        return data.cost
      } catch (err) {
        console.error("Route fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to load route")
      } finally {
        setLoading(false)
      }
    }

    const candidateBathrooms = destination.locid === "m" ? maleBathrooms : femaleBathrooms;
    let best = { closest: candidateBathrooms[0], minCost: Infinity };

    for (const bathroom of candidateBathrooms) {
      const cost = await getCost(bathroom);
      if (cost !== undefined && cost < best.minCost) {
        best = { closest: bathroom, minCost: cost };
      }
    }
    actualDestination = best.closest;
    
  }
    setTrueDestination(actualDestination);
}
    fetchTrueDestination();
}, [showNavigation, currentLocation, destination, rainyMode, trueDestination])

  
  if (showNavigation && currentLocation && trueDestination) {
    updateURL(currentLocation, trueDestination, rainyMode, true)
    return <NavigationView from={currentLocation} to={trueDestination} onBack={handleBack} rainyMode={rainyMode} />
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md space-y-8 pt-8">
        <h1 className="text-4xl font-bold text-center text-balance">Where Do You Want To Go?</h1>

        <div className="space-y-4">
          <LocationSelector
            label="どこから"
            placeholder="出発地点を選択"
            value={currentLocation}
            departure={true}
            onChange={handleCurrentLocationChange}
          />

          <LocationSelector
            label="どこまで"
            placeholder="目的地を選択"
            value={destination}
            departure={false}
            onChange={handleDestinationChange}
          />
        </div>

    <button
      onClick={handleNavigate}
      disabled={!currentLocation || !destination || currentLocation.locid === destination.locid}
      className="w-full bg-primary text-primary-foreground font-bold italic text-7xl px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors overflow-visible"
    >
      <span className="-my-3 -ml-2 text-white dark:text-black block">GO!</span>
    </button>

        <div className="flex items-center justify-center gap-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <Switch checked={rainyMode} onCheckedChange={handleRainyModeChange} className="data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-700"/>
            <span className="text-sm font-medium">雨天モード (屋内経路優先)</span>
          </label>
        </div>
      </div>
    </div>
  )
}
