"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, MapPin } from "lucide-react"
import type { Location } from "@/app/page"

const LOCATIONS: Location[] = [
 {
   "id": "m",
   "name": "最寄りの男子トイレ",
   "category": "自動選択",
   "organizer": "",
   "position": "",
   "keywords": []
 }, 
 {
   "id": "f",
   "name": "最寄りの女子トイレ",
   "category": "自動選択",
   "organizer": "",
   "position": "",
   "keywords": []
 },
 {
   "id": "115",
   "name": "RED館1Fトイレ",
   "category": "男女トイレ",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "139",
   "name": "BLUE館東男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "BLUE館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "140",
   "name": "BLUE館西男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "BLUE館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "136",
   "name": "ORANGE館東男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "ORANGE館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "137",
   "name": "ORANGE館西男子トイレ",
   "category": "男子トイレ",
   "organizer": "",
   "position": "ORANGE館2-3F踊り場",
   "keywords": []
 },
 {
   "id": "109",
   "name": "RED館女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "150",
   "name": "BLUE館東女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "BLUE館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "151",
   "name": "BLUE館西女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "BLUE館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "146",
   "name": "ORANGE館東女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "ORANGE館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "147",
   "name": "ORANGE館西女子トイレ",
   "category": "女子トイレ",
   "organizer": "",
   "position": "ORANGE館1-2F踊り場",
   "keywords": []
 },
 {
   "id": "101",
   "name": "体育館",
   "category": "",
   "organizer": "",
   "position": "体育館",
   "keywords": []
 },
 {
   "id": "102",
   "name": "531",
   "category": "",
   "organizer": "",
   "position": "RED館3F",
   "keywords": []
 },
 {
   "id": "103",
   "name": "332",
   "category": "",
   "organizer": "",
   "position": "RED館3F",
   "keywords": []
 },
 {
   "id": "104",
   "name": "333",
   "category": "",
   "organizer": "",
   "position": "RED館3F",
   "keywords": []
 },
 {
   "id": "105",
   "name": "521",
   "category": "",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "106",
   "name": "OS",
   "category": "",
   "organizer": "",
   "position": "7号館3F",
   "keywords": []
 },
 {
   "id": "107",
   "name": "523",
   "category": "",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "108",
   "name": "",
   "category": "",
   "organizer": "高3喫茶",
   "position": "50周年記念会館",
   "keywords": []
 },
 {
   "id": "110",
   "name": "321",
   "category": "",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "111",
   "name": "322",
   "category": "",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "112",
   "name": "323",
   "category": "",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "113",
   "name": "511",
   "category": "",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "114",
   "name": "保健室",
   "category": "",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "116",
   "name": "6号館",
   "category": "",
   "organizer": "",
   "position": "6号館",
   "keywords": []
 },
 {
   "id": "117",
   "name": "312",
   "category": "",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "118",
   "name": "313",
   "category": "",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "119",
   "name": "431",
   "category": "",
   "organizer": "",
   "position": "ORANGE館3F",
   "keywords": []
 },
 {
   "id": "120",
   "name": "432",
   "category": "",
   "organizer": "",
   "position": "ORANGE館3F",
   "keywords": []
 },
 {
   "id": "121",
   "name": "433",
   "category": "",
   "organizer": "",
   "position": "ORANGE館3F",
   "keywords": []
 },
 {
   "id": "122",
   "name": "入口",
   "category": "",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "123",
   "name": "受付",
   "category": "",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "124",
   "name": "出口",
   "category": "",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "125",
   "name": "事務室",
   "category": "",
   "organizer": "",
   "position": "1号館1F",
   "keywords": []
 },
 {
   "id": "126",
   "name": "フォトスポット",
   "category": "",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "127",
   "name": "221",
   "category": "",
   "organizer": "",
   "position": "BLUE館2F",
   "keywords": []
 },
 {
   "id": "128",
   "name": "222",
   "category": "",
   "organizer": "",
   "position": "BLUE館2F",
   "keywords": []
 },
 {
   "id": "129",
   "name": "コモスペ",
   "category": "",
   "organizer": "",
   "position": "渡り廊下M3F",
   "keywords": []
 },
 {
   "id": "130",
   "name": "おみやげ販売",
   "category": "",
   "organizer": "",
   "position": "屋外 (中庭)",
   "keywords": []
 },
 {
   "id": "131",
   "name": "ステージ",
   "category": "",
   "organizer": "高3ステージ",
   "position": "屋外 (中庭)",
   "keywords": []
 },
 {
   "id": "132",
   "name": "231",
   "category": "",
   "organizer": "",
   "position": "BLUE館3F",
   "keywords": []
 },
 {
   "id": "133",
   "name": "232",
   "category": "",
   "organizer": "",
   "position": "BLUE館3F",
   "keywords": []
 },
 {
   "id": "134",
   "name": "233",
   "category": "",
   "organizer": "",
   "position": "BLUE館3F",
   "keywords": []
 },
 {
   "id": "135",
   "name": "234",
   "category": "",
   "organizer": "",
   "position": "BLUE館3F",
   "keywords": []
 },
 {
   "id": "138",
   "name": "高校昇降口案内所",
   "category": "",
   "organizer": "",
   "position": "RED館東付近1F",
   "keywords": []
 },
 {
   "id": "141",
   "name": "421",
   "category": "",
   "organizer": "",
   "position": "ORANGE館2F",
   "keywords": []
 },
 {
   "id": "142",
   "name": "422",
   "category": "",
   "organizer": "",
   "position": "ORANGE館2F",
   "keywords": []
 },
 {
   "id": "143",
   "name": "423",
   "category": "",
   "organizer": "",
   "position": "ORANGE館2F",
   "keywords": []
 },
 {
   "id": "144",
   "name": "223",
   "category": "",
   "organizer": "",
   "position": "BLUE館2F",
   "keywords": []
 },
 {
   "id": "145",
   "name": "224",
   "category": "",
   "organizer": "",
   "position": "BLUE館2F",
   "keywords": []
 },
 {
   "id": "148",
   "name": "413",
   "category": "",
   "organizer": "",
   "position": "ORANGE館1F",
   "keywords": []
 },
 {
   "id": "149",
   "name": "総合案内所",
   "category": "",
   "organizer": "",
   "position": "屋外 (中庭)",
   "keywords": []
 },
 {
   "id": "152",
   "name": "411",
   "category": "",
   "organizer": "",
   "position": "ORANGE館1F",
   "keywords": []
 },
 {
   "id": "153",
   "name": "412",
   "category": "",
   "organizer": "",
   "position": "ORANGE館1F",
   "keywords": []
 },
 {
   "id": "154",
   "name": "縁日",
   "category": "",
   "organizer": "高3縁日",
   "position": "屋外 (ピロティ)",
   "keywords": []
 },
 {
   "id": "155",
   "name": "チケット売場",
   "category": "",
   "organizer": "高3縁日",
   "position": "屋外 (ピロティ)",
   "keywords": []
 },
 {
   "id": "156",
   "name": "211",
   "category": "",
   "organizer": "",
   "position": "BLUE館1F",
   "keywords": []
 },
 {
   "id": "157",
   "name": "212",
   "category": "",
   "organizer": "",
   "position": "BLUE館1F",
   "keywords": []
 },
 {
   "id": "158",
   "name": "ジャグラーズ",
   "category": "",
   "organizer": "",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "160",
   "name": "213",
   "category": "",
   "organizer": "",
   "position": "BLUE館1F",
   "keywords": []
 },
 {
   "id": "161",
   "name": "214",
   "category": "",
   "organizer": "",
   "position": "BLUE館1F",
   "keywords": []
 },
 {
   "id": "162",
   "name": "食品班",
   "category": "",
   "organizer": "高3食品",
   "position": "屋外",
   "keywords": []
 },
 {
   "id": "14",
   "name": "RED館1F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "6",
   "name": "RED館2F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "3",
   "name": "RED館3F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "RED館3F",
   "keywords": []
 },
 {
   "id": "19",
   "name": "RED館1F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "RED館1F",
   "keywords": []
 },
 {
   "id": "12",
   "name": "RED館2F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "RED館2F",
   "keywords": []
 },
 {
   "id": "4",
   "name": "RED館3F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "RED館3F",
   "keywords": []
 },
 {
   "id": "59",
   "name": "BLUE館1F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "BLUE館1F",
   "keywords": []
 },
 {
   "id": "45",
   "name": "BLUE館2F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "BLUE館2F",
   "keywords": []
 },
 {
   "id": "33",
   "name": "BLUE館3F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "BLUE館3F",
   "keywords": []
 },
 {
   "id": "66",
   "name": "BLUE館1F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "BLUE館1F",
   "keywords": []
 },
 {
   "id": "48",
   "name": "BLUE館2F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "BLUE館2F",
   "keywords": []
 },
 {
   "id": "34",
   "name": "BLUE館3F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "BLUE館3F",
   "keywords": []
 },
 {
   "id": "56",
   "name": "ORANGE館1F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "ORANGE館1F",
   "keywords": []
 },
 {
   "id": "40",
   "name": "ORANGE館2F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "ORANGE館2F",
   "keywords": []
 },
 {
   "id": "28",
   "name": "ORANGE館3F東階段前",
   "category": "その他",
   "organizer": "",
   "position": "ORANGE館3F",
   "keywords": []
 },
 {
   "id": "57",
   "name": "ORANGE館1F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "ORANGE館1F",
   "keywords": []
 },
 {
   "id": "43",
   "name": "ORANGE館2F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "ORANGE館2F",
   "keywords": []
 },
 {
   "id": "29",
   "name": "ORANGE館3F西階段前",
   "category": "その他",
   "organizer": "",
   "position": "ORANGE館3F",
   "keywords": []
 }
]

export function getLocationById(id: string): Location | null {
  return LOCATIONS.find((location) => location.id === id) || null
}

export const maleBathrooms = LOCATIONS.filter(loc => loc.category === "男子トイレ" || loc.category === "男女トイレ");
export const femaleBathrooms = LOCATIONS.filter(loc => loc.category === "女子トイレ" || loc.category === "男女トイレ");

interface LocationSelectorProps {
  label: string
  placeholder: string
  value: Location | null
  onChange: (location: Location | null) => void
}

export function LocationSelector({ label, placeholder, value, onChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(LOCATIONS)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const term = searchTerm.toLowerCase();

  const filtered = LOCATIONS.filter((location) =>
    location.name.toLowerCase().includes(term) ||
    location.category.toLowerCase().includes(term) ||
    location.organizer.toLowerCase().includes(term) ||
    location.position.toLowerCase().includes(term) ||
    location.keywords.some((keyword) => keyword.toLowerCase().includes(term))
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <input
              ref={inputRef}
              type="text"
              placeholder="場所を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {location.position + (location.organizer ? `, ${location.organizer}` : "")}
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
              <div className="p-4 text-center text-muted-foreground">No locations found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
