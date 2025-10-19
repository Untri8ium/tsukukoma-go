import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LocationSelector } from "@/components/location-selector";
import { NavigationView } from "@/components/navigation-view";
import { Switch } from "@/components/ui/switch";
import { maleBathrooms, femaleBathrooms } from "@/components/location-selector";
import { get } from "http";
import { set } from "date-fns";
import Logo from "@/components/logo";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { LOCATIONS } from "@/app/locations-server";
import HomePageClient from "@/app/home-page-client";

export type Location = {
  id: string;
  locid: string;
  name: string;
  category: string;
  organizer: string;
  position: string;
  keywords: string[];
};

export async function generateMetadata({
  searchParams,
}: any): Promise<Metadata> {
  // const searchParams = useSearchParams();
  const depId = searchParams.dep;
  const destId = searchParams.dest;
  const depName = LOCATIONS.find((loc) => loc.locid === depId)?.name;
  const destName = LOCATIONS.find((loc) => loc.locid === destId)?.name;
  let title = "Tsukukoma GO - 筑駒文化祭経路ナビ";
  let description = "急ごう、はしゃごう、Tsukukoma GO!";
  if (depName && destName) {
    // title = `${depName} から ${destName} へ - Tsukukoma GO`;
    description = `「${depName}」から「${destName}」へ、急ごう、はしゃごう、Tsukukoma GO!`;
  } else if (depName) {
    // title = `${depName} から - Tsukukoma GO`;
    description = `「${depName}」からどこへでも、急ごう、はしゃごう、Tsukukoma GO!`;
  } else if (destName) {
    // title = `${destName} へ - Tsukukoma GO`;
    description = `どこからでも「${destName}」へ、急ごう、はしゃごう、Tsukukoma GO!`;
  }
  return {
    title,
    description,
  };
}

export default function Page() {
  return <HomePageClient />;
}
