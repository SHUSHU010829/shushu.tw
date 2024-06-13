import Button from "./components/button";
import Gachapon from "./components/gachapon";
import PeopleList from "./components/peopleList";
import Prize from "./components/prize";

export default function Index() {
  return (
    <main className="relative flex min-h-screen bg-background bg-dot-black/[0.2]">
      <div className="flex w-full flex-col">
        <div className="bg-secondary-light px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">都來抽獎！</p>
        </div>
        <div className="flex justify-center px-10">
          <Prize />
        </div>
        <div className="flex h-[50%] gap-5 px-10">
          <PeopleList />
          <Button />
          <Gachapon />
        </div>
      </div>
    </main>
  );
}
