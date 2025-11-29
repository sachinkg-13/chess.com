import React, { useEffect, useRef } from "react";

export default function MoveHistory({ history }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // history is array of moves (SAN strings). We need to pair them.
  const pairs = [];
  for (let i = 0; i < history.length; i += 2) {
    pairs.push({
      white: history[i],
      black: history[i + 1] || "",
      number: Math.floor(i / 2) + 1,
    });
  }

  return (
    <div className="flex-1 bg-sidebar-bg overflow-hidden flex flex-col">
      <div className="bg-sidebar-hover p-2 text-sm font-semibold text-gray-300 border-b border-gray-700">
        Moves
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2">
        <table className="w-full text-sm text-gray-300">
          <tbody>
            {pairs.map((pair, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-transparent" : "bg-sidebar-hover"
                }
              >
                <td className="py-1 px-2 text-gray-500 w-8">{pair.number}.</td>
                <td className="py-1 px-2 font-medium hover:bg-gray-700 cursor-pointer rounded">
                  {pair.white}
                </td>
                <td className="py-1 px-2 font-medium hover:bg-gray-700 cursor-pointer rounded">
                  {pair.black}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
