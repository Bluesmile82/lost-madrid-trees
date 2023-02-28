import CablesPatch from './CablesPatch';
import './App.css';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [variables, setVariables] = useState();
  const [CABLES, setCABLES] = useState();
  const [selectedVariables, setSelectedVariables] = useState({});

  const setSelectedVariable = useCallback(
    (key, variable) => {
      setSelectedVariables({ ...selectedVariables, [key]: variable });
    },
    [selectedVariables]
  );

  useEffect(() => {
    if (variables) {
      Object.keys(variables).forEach((varKey) => {
        if (varKey && variables[varKey]) {
          variables[varKey].on('change', (newValue) => {
            setSelectedVariable(varKey, newValue);
          });
        }
      });
    }
  }, [variables, setSelectedVariable]);

  const { year, page1Visibility } = selectedVariables || {};
  console.log(page1Visibility);
  return (
    <div className="App">
      <div className="container" style={{ opacity: page1Visibility }}>
        <h1 className="title">Pérdida de árboles en Madrid</h1>
        <h2 className="title">{year}</h2>
        <p>
          Madrid ha perdido 78.616 árboles maduros en sus calles y parques en
          los últimos cuatro años.
        </p>
        <p>
          Los árboles maduros son aquellos que se encuentran "en pleno vigor" o
          “que han alcanzado su tamaño máximo
        </p>
      </div>
      <CablesPatch
        patchDir={'/patch/'}
        setVariables={setVariables}
        setCABLES={setCABLES}
      />
      {page1Visibility < 1 && (
        <div className="years">
          Pasa el cursor sobre los años:{' '}
          <span
            className="year"
            onMouseEnter={(e) => {
              e.preventDefault();
              CABLES.patch.setVariable('year', 2019);
            }}
          >
            2019
          </span>
          <span
            className="year"
            onMouseEnter={(e) => {
              e.preventDefault();
              CABLES.patch.setVariable('year', 2021);
            }}
          >
            2021
          </span>
          <span
            className="year"
            onMouseEnter={(e) => {
              e.preventDefault();
              CABLES.patch.setVariable('year', 2022);
            }}
          >
            2022
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
