import { SearchParams } from "@/types/search-params";
import { redirect } from "next/navigation";

// signin with google/callback page
export default async function GooglePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { accessToken, refreshToken } = await searchParams;
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  if (!accessToken || !refreshToken) {
    return redirect("/signin");
  }
  return redirect("/waredrop-123");
}
