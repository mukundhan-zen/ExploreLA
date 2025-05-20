import { NextRequest, NextResponse } from "next/server";
import { searchAI } from "@/actions/searchActions";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required." }, { status: 400 });
    }
    const results = await searchAI(query);
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal server error." }, { status: 500 });
  }
}
