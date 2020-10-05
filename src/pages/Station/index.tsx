import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Title } from './styles';
import TableContainer from '../../components/TableContainer/index';
import api from '../../services/api';

interface StationParams {
  code: string;
  type: string;
  name: string;
}

interface StationData {
  DT_MEDICAO: string;
  HR_MEDICAO: string;
  TEMP_MIN: string;
  TEMP_MAX: string;
}

const Station: React.FC = () => {
  const { params } = useRouteMatch<StationParams>();
  const [stationData, setStationData] = useState<StationData[]>([]);

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
        setStationData(response.data);
      });
  }, [params.code]);

  const autoColumns = React.useMemo(
    () => [
      {
        Header: 'Data de Medição',
        accessor: 'DT_MEDICAO',
      },
      {
        Header: 'Hora de Medição',
        accessor: 'HR_MEDICAO',
      },
      {
        Header: 'Temperatura Mínima',
        accessor: 'TEM_MIN',
      },
      {
        Header: 'Temperatura Máxima',
        accessor: 'TEM_MAX',
      },
    ],
    [],
  );

  const convColumns = React.useMemo(
    () => [
      {
        Header: 'Data de Medição',
        accessor: 'DT_MEDICAO',
      },
      {
        Header: 'Hora de Medição',
        accessor: 'HR_MEDICAO',
      },
      {
        Header: 'Temperatura Mínima',
        accessor: 'TEMP_MIN',
      },
      {
        Header: 'Temperatura Máxima',
        accessor: 'TEMP_MAX',
      },
    ],
    [],
  );

  return (
    <>
      <Title>
        {`Estação ${params.type} de ${params.name.toLocaleLowerCase()}`}
      </Title>
      <Container style={{ marginTop: 50 }}>
        <TableContainer
          columns={params.type === 'Convencional' ? convColumns : autoColumns}
          data={stationData}
        />
      </Container>
    </>
  );
};

export default Station;
