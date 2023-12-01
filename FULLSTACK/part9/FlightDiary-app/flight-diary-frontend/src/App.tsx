import { useState, useEffect } from 'react';
import './App.css'

import { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaries';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  });
  
  return (
    <div>
      <h1>Ilari's Flight Diaries</h1>

      <Form setDiaries={setDiaries}/>

      <Table diaries={diaries}/>
    </div>
  )
}

export default App;
