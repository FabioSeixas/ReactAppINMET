import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useTable } from 'react-table';

import api from '../../services/api';

interface StationParams {
  code: string;
  type: string;
}

interface ConvStationData {
  DT_MEDICAO: string;
  HR_MEDICAO: string;
  TEMP_MIN: string;
  TEMP_MAX: string;
}

interface AutoStationData {
  DT_MEDICAO: string;
  HR_MEDICAO: string;
  TEM_MIN: string;
  TEM_MAX: string;
}

const Station: React.FC = () => {
  const { params } = useRouteMatch<StationParams>();
  const [convStationData, setConvStationData] = useState<ConvStationData[]>([]);
  const [autoStationData, setAutoStationData] = useState<AutoStationData[]>([]);

  const getCurrentDate = () => {
    const date = new Date();
    const dateLast = new Date(date);
    dateLast.setDate(dateLast.getDate() + 10);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const dayLast = dateLast.getDate();
    const monthLast = dateLast.getMonth();
    const yearLast = dateLast.getFullYear();

    const firstDate = `${year}-${month}-${day}`;
    const lastDate = `${yearLast}-${monthLast}-${dayLast}`;

    return { firstDate, lastDate };
  };

  useEffect(() => {
    const { firstDate, lastDate } = getCurrentDate();

    api
      .get(`estacao/${firstDate}/${lastDate}/${params.code}`)
      .then(response => {
        if (params.type === 'Convencional') {
          setConvStationData(response.data);
        } else {
          setAutoStationData(response.data);
        }
      });
  }, [params.code]);

  useEffect(() => {
    if (params.type === 'Convencional') {
      const data = React.useMemo(() => convStationData, []);
      const tableInstance = useTable({ columns, data });
    }

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance;
  }, [convStationData, autoStationData]);

  const data = React.useMemo(
    () => [
      { firstName: 'jane', lastName: 'doe', age: 20 },
      { firstName: 'john', lastName: 'smith', age: 21 },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Other Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
        ],
      },
    ],
    [],
  );

  return (
    <>
      <h1>Estação Automatica de Cruz das Almas</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Station;
