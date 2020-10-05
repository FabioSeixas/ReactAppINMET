import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Title, Form, StationsList, Error } from './styles';

import api from '../../services/api';

interface Station {
  DC_NOME: string;
  CD_SITUACAO: string;
  TP_ESTACAO: string;
  SG_ESTADO: string;
  CD_ESTACAO: string;
}

const Dashboard: React.FC = () => {
  const [inputCity, setInputCity] = useState('');
  const [inputError, setInputError] = useState('');
  const [stationsList, setStationsList] = useState<Station[]>(() => {
    const stationsStorage = localStorage.getItem('@inmetAPI');

    if (stationsStorage) {
      return JSON.parse(stationsStorage);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@inmetAPI', JSON.stringify(stationsList));
  }, [stationsList]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setInputError('');

    if (!inputCity) {
      setInputError('Digite o nome de uma cidade.');
      return;
    }

    const conv = await api.get('estacoes/M');
    const auto = await api.get('estacoes/T');

    const response: Station[] = conv.data.concat(auto.data);

    const stationFound = response.filter(
      (station: Station) => station.DC_NOME === inputCity.toUpperCase(),
    );

    if (!stationFound.length) {
      setInputError('Cidade não encontrada.');
      setInputCity('');
    }

    setStationsList([...stationFound, ...stationsList]);
    setInputCity('');
  }

  return (
    <>
      <Title>Estações INMET</Title>
      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Digite o nome da cidade"
          value={inputCity}
          onChange={e => setInputCity(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Error>{inputError ? <span>{inputError}</span> : ' '}</Error>

      <StationsList>
        {stationsList.map(station => (
          <Link
            key={station.CD_ESTACAO}
            to={`station/${station.TP_ESTACAO}/${station.CD_ESTACAO}/${station.DC_NOME}`}
          >
            <strong>{`Nome: ${station.DC_NOME}`}</strong>
            <p>{`Estado: ${station.SG_ESTADO}`}</p>
            <p>{`Tipo: ${station.TP_ESTACAO}`}</p>
            <p>{`Situação: ${station.CD_SITUACAO}`}</p>
          </Link>
        ))}
      </StationsList>
    </>
  );
};

export default Dashboard;
