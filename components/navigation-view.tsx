"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Navigation, Clock, MessageCircleWarning, MapPin, X, ChevronLeft, ChevronRight, Info, Umbrella } from "lucide-react"
import type { Location } from "@/app/page"

interface RouteStep {
  id: string
  title: string
  // description: string
  image: string
  // connector?: string
  notice?: {
    text: string
    color: "red" | "yellow" | "blue" | "green" | "gray"
  }
}

interface NavigationViewProps {
  from: Location
  to: Location
  onBack: () => void
  rainyMode?: boolean
}

export function NavigationView({ from, to, onBack, rainyMode = false }: NavigationViewProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0)
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams({
          departure: from.locid,
          destination: to.locid,
          rainy: rainyMode.toString(),
        })

        const response = await fetch(`/api/route?${params}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch route")
        }

        const data = await response.json()
        setRouteSteps(data.route)
      } catch (err) {
        console.error("Route fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to load route")
        // Fallback to dummy data if API fails
        setRouteSteps([
          
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRoute()
  }, [from.locid, to.locid, rainyMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openZoomModal = (index: number) => {
    setCurrentZoomIndex(index)
    setZoomModalOpen(true)
  }

  const closeZoomModal = () => {
    setZoomModalOpen(false)
  }

  const goToPrevious = () => {
    setCurrentZoomIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentZoomIndex((prev) => Math.min(routeSteps.length - 1, prev + 1))
  }

  const getNoticeColor = (color: string) => {
    const colors = {
      red: "bg-red-100 text-red-800 border-red-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const currentStep = routeSteps[currentZoomIndex]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">探索中…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-destructive mb-4">Error: {error}</p>
          <button
            onClick={onBack}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-50 bg-background border-b border-border transition-all duration-300 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="px-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className={`flex-1 transition-all duration-300 ${isScrolled ? "text-lg" : "text-2xl"}`}>
            <div className="font-bold text-balance">{from.name}</div>
            <div className="font-bold text-balance">— {to.name}</div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        {/* Route Summary */}
        <div className={`px-4 transition-all duration-300 ${isScrolled ? "py-4" : "py-8"}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {from.position} → {to.position}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircleWarning className="h-4 w-4" />
              <span className="text-sm">
                外観・入口は実際と異なる場合があります
              </span>
              </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="h-4 w-4" />
              <span className="text-sm">
                画像をタップすると拡大表示します
              </span>
              </div>
            {/* <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">5 min</span>
            </div> */}
            {rainyMode && (
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Umbrella className="h-4 w-4" />
                <span className="text-sm font-medium">雨天モード</span>
              </div>
            )}
          </div>
        </div>

        {/* Route Steps */}
        <div className="space-y-0">
          {routeSteps.map((step, index) => (
              index < routeSteps.length - 1 && (
            <div key={step.id}>
              {/* Step Card */}
              <div className="flex gap-4 mb-2 px-4 items-center">
                {/* Step Image */}
                {index !== 0 && (
                <div className="flex-shrink-0">
                  <button
                    onClick={() => openZoomModal(index)}
                    className="w-20 h-20 bg-card border-2 border-primary rounded-lg flex items-center justify-center overflow-hidden hover:border-primary/80 transition-colors"
                  >
                    <img
                      src={"https://thcsjaq7dqs507lr.public.blob.vercel-storage.com/" + step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
                )}

                {/* Step Content */}
                <div className="flex-1">
                  {index !== 0 ? <h3 className="font-semibold text-lg mb-1">{step.title}</h3> : <h3 className="font-semibold text-lg -mb-1">{step.title}</h3>}
                  {/* <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p> */}
                </div>
              </div>

              

                <div className="flex items-center gap-4 mb-2 pl-4">
                  {/* Vertical line positioned to align with center of 80px thumbnail */}
                  <div className="flex-shrink-0 w-20 flex justify-center">
                    <div className="w-0.5 h-12 bg-border" />
                  </div>

                  {/* Path description and notice badge aligned with step content */}
                  <div className="flex-1 flex items-center gap-3">
                    {/* <div className="flex items-center gap-2 text-sm dark:text-indigo-300 font-medium">
                      <Navigation className="h-4 w-4" />
                      {step.connector}
                    </div> */}

                    {/* Notice badge vertically aligned with path description */}
                    {step.notice && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getNoticeColor(step.notice.color)}`}
                      >
                        {step.notice.text}
                      </span>
                    )}
                  </div>
                </div>
            </div>
              )
          ))}
        </div>

        {/* Arrival Message */}
        <div className="mx-4 p-4 bg-accent text-accent-foreground rounded-lg text-center">
          <div className="text-lg font-semibold">到着</div>
          <div className="text-sm opacity-90 mt-1">{to.name}</div>
        </div>
      </div>

      {zoomModalOpen && currentStep && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-xl font-bold">{currentStep.title || to.name}</h2>
              <button
                onClick={closeZoomModal}
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            {currentZoomIndex !== 0 && (
            <div className="flex-1 overflow-y-auto">
              {/* Large Image */}
              <div className="aspect-video bg-muted">
                <img
                  src={"https://thcsjaq7dqs507lr.public.blob.vercel-storage.com/" + currentStep.image || "/placeholder.svg"}
                  alt={currentStep.title}
                  className="w-full h-[70vh] object-cover"
                />
              </div>

              {/* Description */}
              <div className="p-4 space-y-4">
                {/* <div>
                  <h3 className="font-semibold mb-2">About this location</h3>
                  <p className="text-muted-foreground leading-relaxed">{currentStep.description}</p>
                </div> */}

                {/* Path to next spot with notice */}
                {currentZoomIndex < routeSteps.length - 1 && (
                  <div>
                    {/* <h3 className="font-semibold mb-2">Next step</h3> */}
                    <div className="flex items-center gap-3">
                      {/* <div className="flex items-center gap-2 text-accent dark:text-indigo-300 font-medium">
                        <Navigation className="h-4 w-4" />
                        {currentStep.connector}
                      </div> */}
                      {currentStep.notice && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getNoticeColor(currentStep.notice.color)}`}
                        >
                          {currentStep.notice.text}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}

            {/* Modal Footer with Navigation */}
            <div className="flex items-center justify-between p-4 border-t border-border">
              {currentZoomIndex > 0 ? (
                <button
                  onClick={goToPrevious}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </button>
              ) : (
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 px-4 py-2 invisible transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </button>)}

              <span className="text-sm text-muted-foreground">
                {currentZoomIndex + 1} / {routeSteps.length - 1}
              </span>

              {currentZoomIndex < routeSteps.length - 2 ? (
                <button
                  onClick={goToNext}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  次へ
                  <ChevronRight className="h-4 w-4" />
                </button>
              )
              :
              (
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 px-4 py-2 invisible transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                  次へ
                </button>
              )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
