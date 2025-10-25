import { NextResponse } from "next/server";
import { MOCK_MONUMENTS } from "@/app/lib/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  try {
    // const body = await request.json();
    // const { image } = body; // Image data available for future AI integration

    // Mock recognition - just return a random monument
    // In a real implementation, this would process the image with AI
    const randomMonument = MOCK_MONUMENTS[
      Math.floor(Math.random() * MOCK_MONUMENTS.length)
    ];

    return NextResponse.json({ 
      success: true,
      monument: randomMonument 
    }, { status: 200 });
  } catch (error) {
    console.error("Recognition error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
