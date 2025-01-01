
import Link from "next/link";
import Portfolio from "@/components/portfolio";

export default function Home() {
  return (
    <Link href={"/portfolio"}>
      <Portfolio />
    </Link>
  );
}
