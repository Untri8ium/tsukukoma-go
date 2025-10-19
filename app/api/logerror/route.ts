// app/api/logerror/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const rainy = searchParams.get("rainy");

  console.error(
    `Route fetch error observed. [error] ${error} [from] ${from} [to] ${to} [rainy] ${rainy}`
  );

  return NextResponse.json({ ok: true });
}
