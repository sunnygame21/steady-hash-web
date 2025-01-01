import Link from "next/link";
import Account from "@/components/account";

export default function Home() {
  return (
    <Link href={"/account"}>
      <Account />
    </Link>
  );
}
