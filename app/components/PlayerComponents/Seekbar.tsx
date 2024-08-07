import React from "react";

import type { SeekControlProp } from "~/types/player.types";

export default function Seekbar({
  SeekControl,
}: {
  SeekControl: SeekControlProp;
}) {
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
  const timeRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="mt-1 flex flex-row items-center">
      <p className="hidden text-white sm:flex">
        {SeekControl.appTime === 0 ? "0:00" : getTime(SeekControl.appTime)}
      </p>
      <input
        type="range"
        step="any"
        ref={timeRef}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          SeekControl.setSeekTime(event.target.valueAsNumber);
        }}
        value={SeekControl.appTime}
        min={0}
        max={SeekControl.duration}
        className="mx-4 h-1 w-36 rounded-lg md:w-56 2xl:mx-6 2xl:w-96"
      />
      <p className="hidden text-white sm:flex">
        {SeekControl.duration === 0 ? "0:00" : getTime(SeekControl.duration)}
      </p>
    </div>
  );
}
