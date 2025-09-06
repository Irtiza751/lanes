import { Button } from "@/components/ui/button";
import { Google } from "@/icons";

export function GoogleSigninButton({ text }: { text: string }) {
  const googleSignin = () => {
    const googleUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
    console.log("Redirecting to:", googleUrl);
    window.location.href = googleUrl;
  };

  return (
    <Button
      variant="secondary"
      onClick={googleSignin}
      className="shadow-none w-full"
    >
      <Google />
      <span>{text}</span>
    </Button>
  );
}
