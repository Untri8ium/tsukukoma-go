"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Navigation,
  Clock,
  MessageCircleWarning,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Umbrella,
  Lightbulb,
  TriangleAlert,
} from "lucide-react";
import type { Location } from "@/app/page";
import Footer from "@/components/footer";

interface RouteStep {
  id: string;
  title: string;
  // description: string
  image: string;
  // connector?: string
  notice?: {
    text: string;
    color: "red" | "yellow" | "blue" | "green" | "gray";
  };
}

interface NavigationViewProps {
  from: Location;
  to: Location;
  onBack: () => void;
  rainyMode?: boolean;
}

export function NavigationView({
  from,
  to,
  onBack,
  rainyMode = false,
}: NavigationViewProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0);
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          departure: from.locid,
          destination: to.locid,
          rainy: rainyMode.toString(),
        });

        const response = await fetch(`/api/route?${params}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error ||
              "Failed to fetch route and errorData.error is falsy"
          );
        }
        // throw new Error("Failed to fetch route and errorData.error is falsy");

        const data = await response.json();
        setRouteSteps(data.route);
      } catch (err) {
        console.error("Route fetch error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch route and errorData.error is falsy"
        );
        const callLogError = async () => {
          await fetch(
            `/api/logerror?error=${encodeURIComponent(
              err instanceof Error
                ? err.message
                : "Attempted to log error but err is not instance of Error"
            )}&from=${from.locid}&to=${to.locid}%rainy=${rainyMode}`
          );
        };
        callLogError();

        // Fallback to dummy data if API fails
        setRouteSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [from.locid, to.locid, rainyMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      zoomModalOpen &&
      currentZoomIndex != null &&
      stepRefs.current[currentZoomIndex]
    ) {
      stepRefs.current[currentZoomIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentZoomIndex, zoomModalOpen]);

  const openZoomModal = (index: number) => {
    setCurrentZoomIndex(index);
    setZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setZoomModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentZoomIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentZoomIndex((prev) => Math.min(routeSteps.length - 1, prev + 1));
  };

  const getNoticeColor = (color: string) => {
    const colors = {
      red: "bg-red-100 text-red-800 border-red-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const currentStep = routeSteps[currentZoomIndex];

  let colorTipMessageFrom = "";
  let colorTipMessageTo = "";
  let colorTipMessage = "";

  if (from.position.includes("オレンジ")) {
    colorTipMessageFrom = "オレンジ館は床がオレンジ色";
  } else if (from.position.includes("レッド")) {
    colorTipMessageFrom = "レッド館は床が赤色";
  } else if (from.position.includes("ブルー")) {
    colorTipMessageFrom = "ブルー館は床が青色";
  }

  if (to.position.includes("オレンジ")) {
    colorTipMessageTo = "オレンジ館は床がオレンジ色";
  } else if (to.position.includes("レッド")) {
    colorTipMessageTo = "レッド館は床が赤色";
  } else if (to.position.includes("ブルー")) {
    colorTipMessageTo = "ブルー館は床が青色";
  }

  if (colorTipMessageFrom === "" && colorTipMessageTo === "") {
    colorTipMessage = "";
  } else if (colorTipMessageFrom === colorTipMessageTo) {
    colorTipMessage = `${colorTipMessageFrom}です`;
  } else if (colorTipMessageFrom === "") {
    colorTipMessage = `${colorTipMessageTo}です`;
  } else if (colorTipMessageTo === "") {
    colorTipMessage = `${colorTipMessageFrom}です`;
  } else {
    colorTipMessage = `${colorTipMessageFrom}, ${colorTipMessageTo}です`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">探索中…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 dark:text-red-400 mb-6 text-xl font-bold">
            エラーが発生しました
          </p>
          <p className="mb-6 text-sm">
            経路探索に失敗しました。
            <br />
            これはユーザー様の操作に起因するものではなく、本システムの問題です。ご迷惑をおかけし申し訳ございません。
          </p>
          <p className="mb-6 text-sm">この不具合はサーバーに報告されました。</p>
          <p className="mb-6 text-sm font-mono text-muted-foreground">
            {error}
            <br />
            {`[${from.locid}-${to.locid}, ${rainyMode}]`}
          </p>
          <button
            onClick={onBack}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
          isScrolled ? "py-3" : "py-6"
        } ${rainyMode ? "bg-blue-100 dark:bg-blue-950" : "bg-background"}`}
      >
        <div className="px-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-3 py-5 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div
            className={`flex-1 transition-all duration-300 ${
              isScrolled ? "text-lg" : "text-2xl"
            }`}
          >
            <div className="font-bold text-balance">
              {from.name}
              <span
                className={`font-medium text-muted-foreground ${
                  isScrolled ? "text-xs" : "text-sm"
                }`}
              >
                {" "}
                から
              </span>
            </div>
            <div className="font-bold text-balance">{to.name}</div>
            {rainyMode && (
              <div className="flex items-center mt-1 gap-2 text-blue-700 dark:text-blue-300">
                <span
                  className={`font-semibold ${
                    isScrolled ? "text-xs" : "text-sm"
                  }`}
                >
                  {" "}
                  {to.locid === "169" ? (
                    <div className="flex items-center gap-2">
                      グラウンドへのルートに雨天モードは無効です
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Umbrella className="h-4 w-4" />
                      雨天モード
                    </div>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Route Summary */}
        <div
          className={`px-4 transition-all duration-300 ${
            isScrolled ? "py-4" : "pt-8 pb-8"
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {from.position} → {to.position}
              </span>
            </div>
            {colorTipMessage && (
              <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-300">
                <Lightbulb className="h-4 w-4" />
                <span className="text-sm font-semibold text-balance">
                  {colorTipMessage}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircleWarning className="h-4 w-4" />
              <span className="text-sm">
                外観・入口は実際と異なる場合があります
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-300">
              <Info className="h-4 w-4" />
              <span className="text-sm font-semibold">
                画像をタップすると拡大表示します
              </span>
            </div>
            {to.locid === "169" && (
              <div className="flex items-center gap-2 p-2 border border-2 rounded-md border-red-600 dark:border-red-400 text-red-600 dark:text-red-400">
                <TriangleAlert className="h-4 w-4" />
                <span className="font-semibold text-balance">
                  災害発生時は文実の指示に従ってください
                </span>
              </div>
            )}
            {/* <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">5 min</span>
            </div> */}
          </div>
        </div>

        {/* Route Steps */}
        <div className="space-y-0">
          {routeSteps.map(
            (step, index) =>
              index < routeSteps.length - 1 && (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                >
                  {/* Step Card */}
                  <button
                    onClick={() => openZoomModal(index)}
                    className="flex gap-4 mb-2 px-4 h-24 items-center w-full text-left bg-card border-2 border-border/60 rounded-lg hover:border-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {/* Step Image */}
                    {index !== 0 && (
                      <div className="flex-shrink-0 w-20 h-20 bg-card border-2 border-primary rounded-lg flex items-center justify-center overflow-hidden hover:border-primary/80 transition-colors">
                        <img
                          src={
                            "https://thcsjaq7dqs507lr.public.blob.vercel-storage.com/" +
                              step.image || "/placeholder.svg"
                          }
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Step Content */}
                    <div className="flex-1">
                      {index !== 0 ? (
                        <h3 className="font-semibold text-lg mb-1">
                          {step.title}
                        </h3>
                      ) : (
                        <h3 className="font-semibold text-lg -mb-1">
                          {step.title}
                        </h3>
                      )}
                      {/* <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p> */}
                    </div>
                  </button>

                  <div className="flex items-center gap-4 my-2 pl-4">
                    {/* Vertical line positioned to align with center of 80px thumbnail */}
                    <div className="flex-shrink-0 w-20 flex justify-center">
                      <div className="w-0.5 h-8 bg-neutral-300 dark:bg-neutral-700" />
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
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getNoticeColor(
                            step.notice.color
                          )}`}
                        >
                          {step.notice.text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        {/* Arrival Message */}
        <div className="p-4 bg-accent text-accent-foreground rounded-lg text-center">
          <div className="text-lg font-semibold">到着</div>
          <div className="text-sm opacity-90 mt-1">{to.name}</div>
        </div>
      </div>

      {zoomModalOpen && currentStep && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-[95vw] max-w-[95vw] h-[92vh] max-h-[92vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <h2 className="text-2xl font-bold">
                {currentStep.title || to.name}
              </h2>
              <button
                onClick={closeZoomModal}
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto flex flex-col items-center justify-center p-2">
              {currentZoomIndex !== 0 ? (
                <>
                  {/* Large Image */}
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={
                        "https://thcsjaq7dqs507lr.public.blob.vercel-storage.com/" +
                          currentStep.image || "/placeholder.svg"
                      }
                      alt={currentStep.title}
                      className="max-w-full max-h-full object-contain rounded-md"
                    />
                  </div>

                  {/* Description and Notice */}
                  <div className="w-full mt-4 space-y-4">
                    {currentZoomIndex < routeSteps.length - 1 && (
                      <div className="flex items-center gap-3">
                        {currentStep.notice && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getNoticeColor(
                              currentStep.notice.color
                            )}`}
                          >
                            {currentStep.notice.text}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  このステップに画像はありません
                </div>
              )}
            </div>

            {/* Modal Footer with Navigation */}
            <div className="flex items-center justify-between p-4 border-t border-border flex-shrink-0">
              {currentZoomIndex > 0 ? (
                <button
                  onClick={goToPrevious}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </button>
              ) : (
                <div className="w-[88px]" /> // keeps layout consistent
              )}

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
              ) : (
                <div className="w-[88px]" />
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
