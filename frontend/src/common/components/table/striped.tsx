import React, { useState } from 'react';
import { classNames } from '../../../util/classnames';
import { distance } from '../../../util/distance';

export type TableRow = {
  id: string;
  columns: (string | React.ReactNode)[];
  onClick?: () => void;
};

type Props = {
  columnNames: string[];
  elements: TableRow[];
  clickableCTATitle?: string;
};

type Loc = {
  x: number;
  y: number;
};

export const StripedTable = ({
  columnNames,
  elements,
  clickableCTATitle,
}: Props) => {
  const [mouseDownLoc, setMouseDownLoc] = useState<Loc | null>(null);

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="font-medium bg-gray-50">
        <tr className="text-typography-tablelabel">
          {columnNames.map((columnName, idx) => (
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
              key={`${columnName}-${idx}`}
            >
              {columnName}
            </th>
          ))}
          {clickableCTATitle && (
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
            ></th>
          )}
        </tr>
      </thead>
      <tbody className="bg-white">
        {elements.map((element, elementIdx) => (
          <tr
            key={element.id}
            className={classNames(
              elementIdx % 2 === 0 ? undefined : 'bg-gray-50',
              element.onClick && 'cursor-pointer hover:bg-indigo-50'
            )}
            onMouseDown={(e) => setMouseDownLoc({ x: e.clientX, y: e.clientY })}
            onMouseUp={(e) =>
              element.onClick &&
              (!mouseDownLoc ||
                distance(
                  mouseDownLoc.x,
                  mouseDownLoc.y,
                  e.clientX,
                  e.clientY
                )) < 5 &&
              element.onClick()
            }
          >
            {element.columns.map((column, columnIdx) => (
              <td
                key={`${element.id}-${columnIdx}`}
                className={classNames(
                  'whitespace-nowrap text-sm text-gray-900 sm:pl-6',
                  columnIdx === 0 ? 'py-4 pl-4 pr-3 sm:pl-6' : 'px-3 py-4'
                )}
              >
                {column}
              </td>
            ))}
            {clickableCTATitle && (
              <td
                className={classNames(
                  'whitespace-nowrap text-sm text-indigo-400 hover:text-indigo-500 sm:pl-6 pl-3 pr-6 py-4 text-right'
                )}
              >
                {clickableCTATitle}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
