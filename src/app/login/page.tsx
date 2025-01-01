// import Login from "@/components/login";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/login"), {
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: 16, fontSize: 24 }}>Welcome to SteadyHash</div>
    </div>
  ), // 显示占位符
});
export default function Home() {
  return <Login></Login>;
}
