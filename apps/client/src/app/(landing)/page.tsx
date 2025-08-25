import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <header className="border-b">
        <div className="container mx-auto py-4 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <Logo size={30} />
          </Link>

          <div className="flex gap-3">
            <Link href="/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-5xl font-bold">Lanes landing page</h1>
      </div>
    </main>
  );
}
