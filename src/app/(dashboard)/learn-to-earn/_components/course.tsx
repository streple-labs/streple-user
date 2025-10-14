import { course_data } from "@/assets/gamification-lessons/data";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function Course({
  level,
  phase,
}: {
  level: number;
  phase: 1 | 2;
}) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <>
      <div className="aspect-video w-full">
        <video
          className="size-full object-cover relative rounded-2xl"
          controls
          playsInline
          preload="metadata"
          poster="/video-thumbnail.jpg"
        >
          <source src={course_data[phase][level - 1].src} type="video/mp4" />
        </video>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm md:text-base leading-[22px] tracking-[3%]">
          {course_data[phase][level - 1].title}
        </p>

        <p
          onClick={() => {
            setShowTranscript((prev) => !prev);
          }}
          className="text-[10px] md:text-xs leading-[150%] cursor-pointer tracking-[2px] flex items-center gap-4"
        >
          View transcript
          <span>
            <FaChevronDown
              className={`fill-white/70 ${showTranscript && "rotate-180"}`}
              width={11}
            />
          </span>
        </p>
      </div>

      {showTranscript && (
        <p className="text-white/60 tracking-[1px] text-sm/[170%]">
          {course_data[phase][level - 1].transcript}
        </p>
      )}
    </>
  );
}
