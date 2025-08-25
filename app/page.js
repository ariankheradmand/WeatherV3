import Results from "@/components/Results";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div className="font-nunito h-full w-full flex flex-col gap-10 items-center justify-start mt-6">
      <div className=" bg-gradient-to-br from-gray to-white px-6 py-6 rounded-md shadow flex flex-col items-start justify-center gap-6">
        <h1 className="text-black/60 text-lg md:text-2xl">Welcome to the Weather today</h1>
        <Search />
      </div>
      <Results />
    </div>
  );
}
