# Open Room List
Plots class times for each room so you can see when a room is free. Also lists open rooms in a hall right now. Data scraped from <https://courselist.wm.edu/courselist/>.

[Winner of Best UI/UX at Cypher VII!](https://devpost.com/software/openroomlist)

Web app written in [React](https://reactjs.org/), styled with [TailwindCSS](https://tailwindcss.com/), built with [Vite](https://vitejs.dev/), and deployed on GitHub Pages.

`rooms.json` is organized as Hall -> Room -> Day of week -> List of classes, in chronological order. Each element in the list is a 2-tuple of `[startTime-endTime, subject number section]`, for example:
```
{
    "John E. Boswell Hall": {
        "20": {
            "M": [
                ["0800-0850", "MATH 104 02"],
                ["0900-0950", "MATH 414 01"],
                ["1100-1150", "KINE 450 01"],
                ["1400-1550", "MATH 213 02"],
                ["1700-1820", "PHIL 210 01"]
            ],
            "T": [
                ...
```

`course_map.json` is a dictionary from subject-number-section names to full names, for example `"SOCL 205 01": "Global Social Problems"`.
