"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, MapPin } from "lucide-react"
import type { Location } from "@/app/page"

const LOCATIONS: Location[] = [
 {
  "id": "m",
   "locid": "m",
   "name": "最寄りの男子トイレ",
   "category": "自動選択",
   "organizer": "",
   "position": "RED館・BLUE館・ORANGE館に限る",
   "keywords": []
 }, 
 {
  "id": "f",
   "locid": "f",
   "name": "最寄りの女子トイレ",
   "category": "自動選択",
   "organizer": "",
   "position": "RED館・BLUE館・ORANGE館に限る",
   "keywords": []
 },
 {
   "id": "1",
   "locid": "149",
   "name": "総合案内所 (晴天時)",
   "category": "その他",
   "organizer": "",
   "position": "屋外 (中庭)",
   "keywords": []
 },
 {
   "id": "2",
   "locid": "138",
   "name": "総合案内所 (雨天時)",
   "category": "その他",
   "organizer": "",
   "position": "レッド館東付近1F",
   "keywords": []
 },
 {
   "id": "3",
   "locid": "114",
   "name": "保健室",
   "category": "その他",
   "organizer": "",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "4",
   "locid": "164",
   "name": "休憩所",
   "category": "その他",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "5",
   "locid": "154",
   "name": "トニカクエンニチ",
   "category": "高3",
   "organizer": "高3縁日",
   "position": "屋外 (ピロティ)",
   "keywords": []
 },
 {
   "id": "6",
   "locid": "155",
   "name": "チケット売場",
   "category": "高3",
   "organizer": "高3縁日・食品",
   "position": "屋外 (ピロティ)",
   "keywords": []
 },
 {
   "id": "7",
   "locid": "131",
   "name": "大喝祭",
   "category": "高3",
   "organizer": "高3ステージ",
   "position": "屋外 (中庭)",
   "keywords": []
 },
 {
   "id": "8",
   "locid": "106",
   "name": "Upside Down",
   "category": "高3",
   "organizer": "高3コント班",
   "position": "7号館3F",
   "keywords": []
 },
 {
   "id": "9",
   "locid": "162",
   "name": "つむぎ",
   "category": "高3",
   "organizer": "高3食品",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "10",
   "locid": "163",
   "name": "",
   "category": "高3",
   "organizer": "高3食品",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "11",
   "locid": "108",
   "name": "ひねもす",
   "category": "高3",
   "organizer": "高3喫茶",
   "position": "50周年記念会館",
   "keywords": []
 },
 {
   "id": "12",
   "locid": "130",
   "name": "お土産 (中庭売り場)",
   "category": "高3",
   "organizer": "高3お土産",
   "position": "屋外 (中庭)",
   "keywords": []
 },
 {
   "id": "13",
   "locid": "108",
   "name": "お土産 (50周年売り場)",
   "category": "高3",
   "organizer": "高3お土産",
   "position": "50周年記念会館",
   "keywords": []
 },
 {
   "id": "14",
   "locid": "119",
   "name": "筑駒大解剖",
   "category": "展示",
   "organizer": "1-A HR",
   "position": "オレンジ館3F",
   "keywords": []
 },
 {
   "id": "15",
   "locid": "120",
   "name": "立方体のキセキ",
   "category": "展示",
   "organizer": "1-B HR",
   "position": "オレンジ館3F",
   "keywords": []
 },
 {
   "id": "16",
   "locid": "121",
   "name": "ピタゴラ×science",
   "category": "展示",
   "organizer": "1-C HR",
   "position": "オレンジ館3F",
   "keywords": []
 },
 {
   "id": "17",
   "locid": "141",
   "name": "錯。",
   "category": "展示",
   "organizer": "2-A HR",
   "position": "オレンジ館2F",
   "keywords": []
 },
 {
   "id": "18",
   "locid": "142",
   "name": "Freedom on boards －盤上の自由－",
   "category": "体験",
   "organizer": "2-B HR",
   "position": "オレンジ館2F",
   "keywords": []
 },
 {
   "id": "19",
   "locid": "143",
   "name": "呪いの王墓 (ピラミッド)",
   "category": "体験",
   "organizer": "2-C HR",
   "position": "オレンジ館2F",
   "keywords": []
 },
 {
   "id": "20",
   "locid": "152",
   "name": "#LOCKED FESTIVAL",
   "category": "体験",
   "organizer": "3-A HR",
   "position": "オレンジ館1F",
   "keywords": []
 },
 {
   "id": "21",
   "locid": "153",
   "name": "SAMPLE No.X",
   "category": "体験",
   "organizer": "3-B HR",
   "position": "オレンジ館1F",
   "keywords": []
 },
 {
   "id": "22",
   "locid": "148",
   "name": "江戸べがす",
   "category": "体験",
   "organizer": "3-C HR",
   "position": "オレンジ館1F",
   "keywords": []
 },
 {
   "id": "23",
   "locid": "134",
   "name": "中高将棋部",
   "category": "体験",
   "organizer": "中高将棋部",
   "position": "ブルー館3F",
   "keywords": []
 },
 {
   "id": "24",
   "locid": "135",
   "name": "ポケットからサメが吹き出す",
   "category": "演劇",
   "organizer": "中高演劇部",
   "position": "ブルー館3F",
   "keywords": []
 },
 {
   "id": "25",
   "locid": "133",
   "name": "陽炎、夕立、温い夏風",
   "category": "展示",
   "organizer": "高2展示",
   "position": "ブルー館3F",
   "keywords": []
 },
 {
   "id": "26",
   "locid": "127",
   "name": "天つ刻",
   "category": "体験",
   "organizer": "高2謎解き",
   "position": "ブルー館2F",
   "keywords": []
 },
 {
   "id": "27",
   "locid": "128",
   "name": "天国だろうが金は要る",
   "category": "体験",
   "organizer": "高2カジノ",
   "position": "ブルー館2F",
   "keywords": []
 },
 {
   "id": "28",
   "locid": "132",
   "name": "おバカ屋敷 the movie",
   "category": "映画",
   "organizer": "高2映画",
   "position": "ブルー館3F",
   "keywords": []
 },
 {
   "id": "29",
   "locid": "145",
   "name": "置き碁は恥だが役に立つ",
   "category": "体験",
   "organizer": "駒場棋院",
   "position": "ブルー館2F",
   "keywords": []
 },
 {
   "id": "30",
   "locid": "144",
   "name": "そしてあなたもいなくなる",
   "category": "体験",
   "organizer": "1-1 HR",
   "position": "ブルー館2F",
   "keywords": []
 },
 {
   "id": "31",
   "locid": "157",
   "name": "地獄の沙汰も賭け次第",
   "category": "体験",
   "organizer": "1-2 HR",
   "position": "ブルー館1F",
   "keywords": []
 },
 {
   "id": "32",
   "locid": "160",
   "name": "忍の試練",
   "category": "体験",
   "organizer": "1-3 HR",
   "position": "ブルー館1F",
   "keywords": []
 },
 {
   "id": "33",
   "locid": "161",
   "name": "Order Restoration Institute",
   "category": "体験",
   "organizer": "1-4 HR",
   "position": "ブルー館1F",
   "keywords": []
 },
 {
   "id": "34",
   "locid": "102",
   "name": "Lux aeterna",
   "category": "パフォーマンス",
   "organizer": "アンサンブル同好会",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "35",
   "locid": "102",
   "name": "煌",
   "category": "パフォーマンス",
   "organizer": "ピアノ同好会",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "36",
   "locid": "103",
   "name": "ボドゲカフェ (場所1)",
   "category": "体験",
   "organizer": "中高アナログゲーム同好会",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "37",
   "locid": "166",
   "name": "ボドゲカフェ (場所2)",
   "category": "体験",
   "organizer": "中高アナログゲーム同好会",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "38",
   "locid": "166",
   "name": "数学科展示",
   "category": "展示 (特別)",
   "organizer": "",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "39",
   "locid": "104",
   "name": "折音 -ORION- ",
   "category": "展示",
   "organizer": "折り紙研究会",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "40",
   "locid": "105",
   "name": "企画展示「キテン」",
   "category": "展示",
   "organizer": "筑駒総合美術研究会",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "41",
   "locid": "165",
   "name": "ひかりとかげの新幹線 (場所1)",
   "category": "体験",
   "organizer": "鉄道研究部",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "42",
   "locid": "129",
   "name": "ひかりとかげの新幹線 (場所2)",
   "category": "体験",
   "organizer": "鉄道研究部",
   "position": "渡り廊下M3F",
   "keywords": []
 },
 {
   "id": "43",
   "locid": "107",
   "name": "稲実る湖畔に生きる",
   "category": "展示",
   "organizer": "地域振興研究会",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "44",
   "locid": "110",
   "name": "𰻞字路",
   "category": "展示",
   "organizer": "中高文藝部",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "45",
   "locid": "110",
   "name": "農ある部活は爪を隠す",
   "category": "体験",
   "organizer": "中高農芸部",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "46",
   "locid": "111",
   "name": "TKQS FOR LIFE",
   "category": "体験",
   "organizer": "中高クイズ研究会",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "47",
   "locid": "112",
   "name": "いきものわーるど2025",
   "category": "展示",
   "organizer": "中高生物部",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "48",
   "locid": "113",
   "name": "FLUX",
   "category": "展示",
   "organizer": "パーソナルコンピューター研究部",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "49",
   "locid": "117",
   "name": "パズル砦",
   "category": "展示",
   "organizer": "パズル部",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "50",
   "locid": "117",
   "name": "数研2025",
   "category": "体験",
   "organizer": "数学科学研究部",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "51",
   "locid": "118",
   "name": "Conical Chemical",
   "category": "体験",
   "organizer": "中高科学部",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "52",
   "locid": "105",
   "name": "美術科展示",
   "category": "展示 (特別)",
   "organizer": "美術科",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "53",
   "locid": "101",
   "name": "Wind Festa 2025 -Harmonia-",
   "category": "パフォーマンス",
   "organizer": "中高音楽部",
   "position": "体育館",
   "keywords": []
 },
 {
   "id": "54",
   "locid": "158",
   "name": "Free Fall",
   "category": "パフォーマンス",
   "organizer": "筑駒Jugglers",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "55",
   "locid": "116",
   "name": "書道科展示",
   "category": "展示 (特別)",
   "organizer": "",
   "position": "6号館",
   "keywords": []
 },
 {
   "id": "56",
   "locid": "122",
   "name": "入口",
   "category": "その他",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "57",
   "locid": "124",
   "name": "出口",
   "category": "その他",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "58",
   "locid": "123",
   "name": "受付",
   "category": "その他",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "59",
   "locid": "125",
   "name": "事務室",
   "category": "その他",
   "organizer": "",
   "position": "1号館1F",
   "keywords": []
 },
 {
   "id": "60",
   "locid": "126",
   "name": "フォトスポット",
   "category": "その他",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "61",
   "locid": "136",
   "name": "オレンジ館東男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "オレンジ館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "62",
   "locid": "137",
   "name": "オレンジ館西男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "オレンジ館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "63",
   "locid": "139",
   "name": "ブルー館東男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "ブルー館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "64",
   "locid": "140",
   "name": "ブルー館西男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "ブルー館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "65",
   "locid": "146",
   "name": "オレンジ館東女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "オレンジ館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "66",
   "locid": "147",
   "name": "オレンジ館西女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "オレンジ館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "67",
   "locid": "150",
   "name": "ブルー館東女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "ブルー館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "68",
   "locid": "151",
   "name": "ブルー館西女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "ブルー館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "69",
   "locid": "109",
   "name": "レッド館女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "70",
   "locid": "115",
   "name": "レッド館1Fトイレ",
   "category": "男女トイレ",
   "organizer": "",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "71",
   "locid": "56",
   "name": "オレンジ館1F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "オレンジ館1F",
   "keywords": []
 },
 {
   "id": "72",
   "locid": "40",
   "name": "オレンジ館2F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "オレンジ館2F",
   "keywords": []
 },
 {
   "id": "73",
   "locid": "28",
   "name": "オレンジ館3F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "オレンジ館3F",
   "keywords": []
 },
 {
   "id": "74",
   "locid": "57",
   "name": "オレンジ館1F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "オレンジ館1F",
   "keywords": []
 },
 {
   "id": "75",
   "locid": "43",
   "name": "オレンジ館2F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "オレンジ館2F",
   "keywords": []
 },
 {
   "id": "76",
   "locid": "29",
   "name": "オレンジ館3F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "オレンジ館3F",
   "keywords": []
 },
 {
   "id": "77",
   "locid": "59",
   "name": "ブルー館1F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "ブルー館1F",
   "keywords": []
 },
 {
   "id": "78",
   "locid": "45",
   "name": "ブルー館2F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "ブルー館2F",
   "keywords": []
 },
 {
   "id": "79",
   "locid": "33",
   "name": "ブルー館3F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "ブルー館3F",
   "keywords": []
 },
 {
   "id": "80",
   "locid": "66",
   "name": "ブルー館1F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "ブルー館1F",
   "keywords": []
 },
 {
   "id": "81",
   "locid": "48",
   "name": "ブルー館2F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "ブルー館2F",
   "keywords": []
 },
 {
   "id": "82",
   "locid": "34",
   "name": "ブルー館3F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "ブルー館3F",
   "keywords": []
 },
 {
   "id": "83",
   "locid": "14",
   "name": "レッド館1F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "84",
   "locid": "6",
   "name": "レッド館2F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "85",
   "locid": "3",
   "name": "レッド館3F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "レッド館3F",
   "keywords": []
 },
 {
   "id": "86",
   "locid": "19",
   "name": "レッド館1F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "レッド館1F",
   "keywords": []
 },
 {
   "id": "87",
   "locid": "12",
   "name": "レッド館2F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "レッド館2F",
   "keywords": []
 },
 {
   "id": "88",
   "locid": "4",
   "name": "レッド館3F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "レッド館3F",
   "keywords": []
 }
]

export function getLocationById(id: string): Location | null {
  return LOCATIONS.find((location) => location.locid === id) || null
}

export const maleBathrooms = LOCATIONS.filter(loc => loc.category === "男子トイレ" || loc.category === "男女トイレ");
export const femaleBathrooms = LOCATIONS.filter(loc => loc.category === "女子トイレ" || loc.category === "男女トイレ");

interface LocationSelectorProps {
  label: string
  placeholder: string
  value: Location | null
  departure: boolean
  onChange: (location: Location | null) => void
}

export function LocationSelector({ label, placeholder, value, departure, onChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(LOCATIONS)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  console.log(searchTerm)
  const term = searchTerm.toLowerCase();

  const filtered = LOCATIONS.filter((location) =>
    (location.name.toLowerCase().includes(term) ||
    location.category.toLowerCase().includes(term) ||
    location.organizer.toLowerCase().includes(term) ||
    location.position.toLowerCase().includes(term) ||
    location.keywords.some((keyword) => keyword.toLowerCase().includes(term))) &&
    (departure ? !["m", "f"].includes(location.locid) : true)
  )
  .map((location, index) => {
    let score = 0;

    if (location.name.toLowerCase().includes(term)) score = Math.max(score, 1);
    if (location.keywords.some((keyword) => keyword.toLowerCase().includes(term))) score = Math.max(score, 0.9);
    if (location.organizer.toLowerCase().includes(term)) score = Math.max(score, 0.8);
    if (location.category.toLowerCase().includes(term)) score = Math.max(score, 0.7);
    if (location.position.toLowerCase().includes(term)) score = Math.max(score, 0.6);

    return { location, score, originalIndex: index };
  })
  .sort((a, b) => {
    if (b.score === a.score) {
      return a.originalIndex - b.originalIndex; // keep original order for ties
    }
    return b.score - a.score; // sort descending by score
  })
  .map(item => item.location);

  setFilteredLocations(filtered);
}, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputClick = () => {
    setIsOpen(!isOpen)
    setSearchTerm("")
  }

  const handleLocationSelect = (location: Location) => {
    onChange(location)
    setIsOpen(false)
    setSearchTerm("")
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "男子トイレ": "bg-blue-100 text-blue-800",
      "女子トイレ": "bg-pink-100 text-pink-800",
      "男女トイレ": "bg-purple-100 text-purple-800",
      "その他": "bg-green-100 text-green-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>

      <div
        className="w-full bg-input border border-border rounded-lg px-4 py-3 cursor-pointer flex items-center justify-between"
        onClick={handleInputClick}
      >
        <div className="flex items-center gap-3 flex-1">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          {value ? (
            <div>
              <div className="font-medium">{value.name}</div>
              <div className="text-sm text-muted-foreground">
                {value.position + (value.organizer ? `, ${value.organizer}` : "")}
              </div>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <input
              ref={inputRef}
              name="場所を検索"
              type="text"
              placeholder="場所を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>

          <div className="max-h-[45vh] overflow-y-auto top-full">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {(location.organizer ? location.organizer : "")}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(location.category)}`}
                    >
                      {location.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">場所が見つかりませんでした</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
