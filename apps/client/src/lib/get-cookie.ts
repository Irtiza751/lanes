"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  console.log("Cookies:", Object.fromEntries(cookieStore));
  return cookieStore.get(name)?.value;
}
