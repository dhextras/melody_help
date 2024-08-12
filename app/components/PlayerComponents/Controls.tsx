import { Pause, Play, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { useCallback, useState } from "react";

import type { PlayerControlProp } from "~/types/player.types";

export default function Controls({
  playerControl,
}: {
  playerControl: PlayerControlProp;
}) {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = useCallback(
    (buttonName: string, action: () => void) => {
      setClickedButton(buttonName);
      action();
      setTimeout(() => setClickedButton(null), 250);
    },
    [],
  );

  const getButtonClass = (buttonName: string) => {
    const baseClass =
      "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondary p-2 pl-2.5";
    const defaultShadow = "shadow-neumorphism";
    const clickedShadow = "shadow-neumorphismInset";

    return `${baseClass} ${clickedButton === buttonName ? clickedShadow : defaultShadow}`;
  };

  return (
    <div className="flex items-center gap-4 px-4">
      <div className={getButtonClass("prev")}>
        <SkipBack
          size={30}
          onClick={() => handleButtonClick("prev", playerControl.prevSong)}
          className="fill-textPrimary text-textPrimary opacity-70"
        />
      </div>
      {playerControl.isPlaying ? (
        <div className={getButtonClass("play_pause")}>
          <Pause
            size={45}
            onClick={() =>
              handleButtonClick("play_pause", () =>
                playerControl.setIsPlaying(false),
              )
            }
            className="fill-action text-action opacity-70"
          />
        </div>
      ) : (
        <div className={getButtonClass("play_pause")}>
          <Play
            size={45}
            onClick={() =>
              handleButtonClick("play_pause", () =>
                playerControl.setIsPlaying(true),
              )
            }
            className="fill-action text-action opacity-70"
          />
        </div>
      )}
      <div className={getButtonClass("next")}>
        <SkipForward
          size={30}
          onClick={() => handleButtonClick("next", playerControl.nextSong)}
          className="fill-textPrimary text-textPrimary opacity-70"
        />
      </div>
      <div className={`${getButtonClass("shuffle")} `}>
        <Shuffle
          size={20}
          onClick={() =>
            handleButtonClick("shuffle", () =>
              playerControl.setShuffle((prev) => !prev),
            )
          }
          className={
            !playerControl.shuffle
              ? "fill-textPrimary text-textPrimary opacity-70"
              : "fill-action text-action opacity-70"
          }
        />
      </div>
    </div>
  );
}
