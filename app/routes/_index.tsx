import { generateMeta } from "~/utils/generateMeta";
import { showToast } from "~/utils/notifications";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = generateMeta("Home");

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Mode Tunes</h1>
      <p className="mt-4">Listen to your favorite songs and moods.</p>
      <button
        className="bg-blue-500 hover:bg-blue-700  mt-4 rounded-md shadow-md px-4 py-2 text-white font-bold"
        onClick={() => showToast("Hooray!!! notification working fine...")}
      >
        Click Me!!!!
      </button>
    </div>
  );
}
