"use client"
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
  <>
  <div className="flex flex-col items-center justify-center text-white h-[44vh]">
    <div className="font-bold text-3xl flex justify-center items-center">Fuel My Flow <span><img width={60} src="2a524376-a7db-46d3-8d3d-98a0b5426c0e.svg" alt="" /></span></div>
    <p>A creator-first platform to fuel your passion — one contribution at a time.</p>
    <div className="py-6">
    <Link href={"/login"}>
   <button type="button" class="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
  Fuel the Flow
</button>
</Link>
<Link href={"/about"}>
<button type="button" class="cursor-pointer text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
  Read More
</button>
</Link>
</div>
  </div>
  <div className="bg-white opacity-8 h-1"></div>
  <div className="container text-white mx-auto">
   <h1 className="text-xl font-bold text-center my-8">
  Your fans can fuel your flow — one boost at a time
</h1>
<div className="flex justify-around items-center">
  <div className="items space-y-3 flex flex-col items-center justify-center">
    <img width={80} className="rounded-full p-3" src="man.gif" alt="" />
   <p className="font-bold text-sm">Supporters want to see you thrive</p>
   <p className="text-center text-sm">They’re always ready to help you move forward</p>
  </div>
<div className="items space-y-3 flex flex-col items-center justify-center">
  <img width={80} className="rounded-full p-3" src="group.gif" alt="" />
  <p className="font-bold text-sm">Built by many, driven by purpose</p>
  <p className="text-center text-sm">Your journey inspires people to walk beside you.</p>
</div>
<div className="items space-y-3 flex flex-col items-center justify-center">
  <img width={80} className="rounded-full p-3" src="coin.gif" alt="" />
  <p className="font-bold text-sm">Gratitude goes both ways</p>
  <p className="text-center text-sm">Support is a two-way street of respect and impact.</p>
</div>
</div>
  </div>
  </>
  );
}
