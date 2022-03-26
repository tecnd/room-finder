// Force Tailwind to generate col-start-{n} classes
const days = (
  <>
    <div className="row-start-1 col-start-2">
      <p>Sunday</p>
    </div>
    <div className="row-start-1 col-start-3">
      <p>Monday</p>
    </div>
    <div className="row-start-1 col-start-4">
      <p>Tuesday</p>
    </div>
    <div className="row-start-1 col-start-5">
      <p>Wednesday</p>
    </div>
    <div className="row-start-1 col-start-6">
      <p>Thursday</p>
    </div>
    <div className="row-start-1 col-start-7">
      <p>Friday</p>
    </div>
    <div className="row-start-1 col-start-8">
      <p>Saturday</p>
    </div>
  </>
);

// Generate line divs for each hour
const lines = [];
for (let hour = 7; hour <= 22; hour++) {
  let start = (hour - 7) * 12 + 2;
  lines.push(
    <div
      className="bg-white h-px col-span-full"
      style={{ gridRowStart: start }}
    >
      {hour + ":00"}
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
  [5, "R"],
  [6, "F"],
  [7, "S"],
]);

export default function Calendar({ events }) {
  const cal = [];
  for (const [colNum, day] of dayMap) {
    for (const block of events[day]) {
      const [time, cid] = block;
      const [start, end] = convertTime(time);

      cal.push(
        <div
          className={`col-start-${colNum} bg-red-500 text-center rounded`}
          style={{ gridRow: `${start} / ${end}` }}
        >
          {cid} {time}
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-8 grid-rows-[minmax(0,_1fr)_repeat(192,_5px)] auto-rows-fr gap-x-1 max-w-full md:max-w-screen-md">
      {days}
      {lines}
      {cal}
    </div>
  );
}
