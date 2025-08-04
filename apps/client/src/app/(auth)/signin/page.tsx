import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "../_components/signin-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <Logo size={40} className="text-primary-foreground" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Login with your Google account or enter your email bellow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link className="underline" href="/signup">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
