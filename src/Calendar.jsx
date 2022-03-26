import "./Calendar.css";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Force Tailwind to generate col-start-{n} classes
const days = (
  <>
    <div className="row-start-1 col-start-1">
      <p>Sunday</p>
    </div>
    <div className="row-start-1 col-start-2">
      <p>Monday</p>
    </div>
    <div className="row-start-1 col-start-3">
      <p>Tuesday</p>
    </div>
    <div className="row-start-1 col-start-4">
      <p>Wednesday</p>
    </div>
    <div className="row-start-1 col-start-5">
      <p>Thursday</p>
    </div>
    <div className="row-start-1 col-start-6">
      <p>Friday</p>
    </div>
    <div className="row-start-1 col-start-7">
      <p>Saturday</p>
    </div>
  </>
);

const lines = [];
for (let hour = 7; hour <= 22; hour++) {
  let start = (hour - 7) * 12 + 2;
  lines.push(
    <div
      className="bg-white h-px col-span-full"
      style={{ gridRowStart: start }}
    ></div>
  );
}
export default function Calendar(props) {
  const hours = [];
  for (let h = 7; h < 22; h++) {
    let start = (h - 7) * 12 + 2;
    hours.push(
      <div
        className={`col-start-${getRandomInt(
          1,
          8
        )} bg-red-500 text-center rounded`}
        style={{ gridRow: `${start} / span 10` }}
      >
        {h}:00
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 auto-rows-fr gap-x-1 max-w-3xl calendar">
      {days}
      {lines}
      {hours}
    </div>
  );
}
