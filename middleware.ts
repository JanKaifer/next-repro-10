// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.headers.has("from-middleware")) {
    return NextResponse.next();
  }

  // Lets query if we have any page on that url
  const origResponse = await fetch(request.url, {
    headers: { "from-middleware": "true" },
  });

  if (origResponse.status === 404) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  return NextResponse.next();
}
