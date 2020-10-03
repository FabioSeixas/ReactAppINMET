import React, { useState, FormEvent, useEffect } from 'react';

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
  const [stationsList, setStationsList] = useState<Station[]>([]);
  const [stationsRender, setStationsRender] = useState<Station[]>([]);

  useEffect(() => {
    console.log('stationsList: ', stationsList);
    // const popItem: Station = stationsList.pop() as Station;
    // setStationsRender([...stationsRender, popItem]);
  }, [stationsList]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setInputError('');

    if (!inputCity) {
      setInputError('Digite o nome de uma cidade.');
    }

    const conv = await api.get('estacoes/M');
    const auto = await api.get('estacoes/T');

    const response: Station[] = conv.data.concat(auto.data);

    const stationFound = response.filter(
      (station: Station) => station.DC_NOME === inputCity.toUpperCase(),
    );
    stationFound.forEach(element =>
      setStationsList([...stationsList, element]),
    );
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
      {inputError && <Error>{inputError}</Error>}

      <StationsList>
        {stationsList.map(station => (
          <a key={station.CD_ESTACAO} href="asdgfasdf">
            <strong>{`Nome: ${station.DC_NOME}`}</strong>
            <p>{`Estado: ${station.SG_ESTADO}`}</p>
            <p>{`Tipo: ${station.TP_ESTACAO}`}</p>
            <p>{`Situação: ${station.CD_SITUACAO}`}</p>
          </a>
        ))}
      </StationsList>
    </>
  );
};

export default Dashboard;
