'use client';
import { useState, useEffect } from 'react';
import { makeAPIEndpointURL, execGETGameState } from '@/utils/api';
import { APIRouting } from '@/config/apiRouting';

export default function Home(): JSX.Element {
  const [gameState, setGameState] = useState('');
  const [apiEndpointURL, setApiEndpointURL] = useState('');

  useEffect(() => {
    const endpointURL = makeAPIEndpointURL(APIRouting.Point.getGameState);
    setApiEndpointURL(endpointURL);
  }, []);

  useEffect(() => {
    execGETGameState(apiEndpointURL).then((resValue) => {
      if (resValue == undefined) {
        return;
      }
      setGameState(resValue);
    });
  }, [apiEndpointURL]);

  if (gameState === '') {
    return <></>;
  }
  console.log(gameState);

  return (
    <>
      <p>ゲームマスターサイトです</p>
    </>
  );
}
