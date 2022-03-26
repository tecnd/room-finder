import { useState, useEffect } from "react";
// Force Tailwind to generate col-start-{n} classes
const days = (
  <>
    <div className="row-start-1 col-start-2 text-center">
      <p className="hidden md:block">Sunday</p>
      <p className="block md:hidden">S</p>
    </div>
    <div className="row-start-1 col-start-3 text-center">
      <p className="hidden md:block">Monday</p>
      <p className="block md:hidden">M</p>
    </div>
    <div className="row-start-1 col-start-4 text-center">
      <p className="hidden md:block">Tuesday</p>
      <p className="block md:hidden">T</p>
    </div>
    <div className="row-start-1 col-start-5 text-center">
      <p className="hidden md:block">Wednesday</p>
      <p className="block md:hidden">W</p>
    </div>
    <div className="row-start-1 col-start-6 text-center">
      <p className="hidden md:block">Thursday</p>
      <p className="block md:hidden">T</p>
    </div>
    <div className="row-start-1 col-start-7 text-center">
      <p className="hidden md:block">Friday</p>
      <p className="block md:hidden">F</p>
    </div>
    <div className="row-start-1 col-start-8 text-center">
      <p className="hidden md:block">Saturday</p>
      <p className="block md:hidden">S</p>
    </div>
  </>
);

// Generate line divs for each hour
const lines = [];
for (let hour = 7; hour <= 22; hour++) {
  let start = (hour - 7) * 12 + 2;
  lines.push(
    <div
      className="bg-white h-px col-span-full col-start-2"
      style={{ gridRowStart: start }}
    >
      <p className="w-12 text-right -ml-14 -mt-3">{hour + ":00"}</p>
    </div>
  );
}

/**
 * Takes in two 4-digit military times and outputs their corresponding row numbers.
 * @param {string} times
 * @return {[int, int]}
 */
function convertTime(times) {
  let [startTime, endTime] = times.split("-");
  let startSince7 = parseInt(startTime.slice(0, 2)) - 7;
  let startNumIntervals = parseInt(startTime.slice(-2)) / 5;
  let endSince7 = parseInt(endTime.slice(0, 2)) - 7;
  let endNumIntervals = parseInt(endTime.slice(-2)) / 5;
  let start = startSince7 * 12 + 2 + startNumIntervals;
  let end = endSince7 * 12 + 2 + endNumIntervals;
  return [start, end];
}

const dayMap = new Map([
  [2, "U"],
  [3, "M"],
  [4, "T"],
  [5, "W"],
  [6, "R"],
  [7, "F"],
  [8, "S"],
]);

export default function Calendar({ events }) {
  // Update current day and time every second
  const [dayOfWeek, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      let now = new Date();
      setDay(now.getDay());
      setHour(now.getHours());
      setMinute(now.getMinutes());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  let nowLine = <></>;
  if (hour > 6 && hour < 23) {
    let pos = Math.floor((hour - 7) * 12 + 2 + minute / 5);
    nowLine = (
      <div
        className="h-px bg-red-500 col-span-full col-start-2"
        style={{ gridRowStart: pos }}
      >
        <p className="w-12 text-center -ml-12 -mt-3 bg-red-500 rounded">{`${hour}:${minute
          .toString()
          .padStart(2, "0")}`}</p>
      </div>
    );
  }
  const cal = [];
  for (const [colNum, day] of dayMap) {
    for (const block of events[day]) {
      const [time, cid] = block;
      const [start, end] = convertTime(time);

      cal.push(
        <div
          className={`col-start-${colNum} bg-amber-400 text-slate-900 text-center text-sm flex rounded border-2 border-black `}
          style={{ gridRow: `${start} / ${end}` }}
        >
          <div className="mx-auto pt-1">
            <p>{cid}</p>
            <p className="hidden md:block">{time}</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-[3rem_repeat(7,_minmax(0,_1fr))] grid-rows-[minmax(0,_1fr)_repeat(192,_5px)] auto-cols-max gap-x-1 w-full sm:w-2/3">
      {days}
      {lines}
      {cal}
      <div
        className={`col-start-${
          dayOfWeek + 2
        } row-span-full bg-white rounded opacity-50 -z-50`}
      ></div>
      {nowLine}
    </div>
  );
}
