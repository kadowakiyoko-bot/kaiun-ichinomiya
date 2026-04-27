import { NextResponse } from "next/server";

const PASSWORD = process.env.APP_UNLOCK_PASSWORD || "818";
const COOKIE_NAME = "tomitabi_unlocked";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const input = String(body?.password ?? "").trim();

  if (input !== PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "true", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_YEAR,
  });
  return res;
}
