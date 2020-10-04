import React from 'react';
import { useTable } from 'react-table';

import Table from '../../components/Table';

const Station: React.FC = () => {
  const data = [
    { firstName: 'jane', lastName: 'doe', age: 20 },
    { firstName: 'john', lastName: 'smith', age: 21 },
  ];

  const columns = [
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
  ];

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <h1>Estação Automatica de Cruz das Almas</h1>
      <Table columns={columns} data={data} />
    </>
  );
};

export default Station;
