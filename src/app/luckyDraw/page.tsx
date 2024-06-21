import Prize from "./components/prize";
import History from "./components/history";
import Setting from "./components/setting";
import Banner from "./components/banner";
import Footer from "./components/footer";
import DrawButton from "./components/drawButton";

export default function Index() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-background bg-dot-black/[0.2]">
      <div className="flex w-full flex-col">
        <Banner />
        <Prize />
        <History />
        <DrawButton />
        <Setting />
      </div>
      <Footer />
    </main>
  );
}
