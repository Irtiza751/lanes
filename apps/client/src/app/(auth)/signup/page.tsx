import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SignupForm } from "../_components/signup-form";

export default function SignupPage() {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <Logo size={40} className="text-primary-foreground" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register now</CardTitle>
          <CardDescription className="text-center">
            Signup with your Google account or enter your email bellow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link className="underline" href="/signin">
              Signin
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
