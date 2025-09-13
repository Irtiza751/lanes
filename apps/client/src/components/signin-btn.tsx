"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function SigninBtn() {
  const router = useRouter();
  const [signinText, setSigninText] = useState("Sign in");

  useEffect(() => {
    if (Cookies.get("lap")) {
      setSigninText("Go to app");
    }
  }, []);

  const clickHandler = useCallback(() => {
    const lap = Cookies.get("lap");
    if (lap) {
      router.replace(`/${lap}`);
    } else {
      router.push("/signin");
    }
  }, []);

  return (
    <Button
      onClick={clickHandler}
      variant="outline"
      size="sm"
      className="rounded"
    >
      <span>{signinText}</span>
    </Button>
  );
}
