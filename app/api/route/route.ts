import { type NextRequest, NextResponse } from "next/server"
import { findRoute } from "@/lib/route-finder"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const departure = Number.parseInt(searchParams.get("departure") || "0")
    const destination = Number.parseInt(searchParams.get("destination") || "0")
    const rainyMode = searchParams.get("rainy") === "true"

    // Parse excluded edges if provided
    const excludedEdgesParam = searchParams.get("excludedEdges")
    let excludedEdges: Array<{ from: number; to: number }> = []

    if (excludedEdgesParam) {
      try {
        excludedEdges = JSON.parse(excludedEdgesParam)
      } catch {
        return NextResponse.json({ error: "Invalid excludedEdges format" }, { status: 400 })
      }
    }

    if (!departure || !destination) {
      return NextResponse.json({ error: "Missing departure or destination" }, { status: 400 })
    }

    const route = await findRoute(departure, destination, excludedEdges, rainyMode)

    return NextResponse.json(route)
  } catch (error) {
    console.error("Route API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Route finding failed" },
      { status: 500 },
    )
  }
}
