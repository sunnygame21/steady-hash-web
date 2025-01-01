import Home from "@/components/home";
import Link from "next/link";

export default function Page() {
  return (
    <Link href={"/"}>
      <Home />
    </Link>
  );
}
