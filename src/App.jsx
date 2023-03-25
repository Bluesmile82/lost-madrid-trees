import CablesPatch from './CablesPatch';
import './App.css';
import { useEffect, useState, useCallback } from 'react';

const YearSelector = ({ years, setYear, selectedYear }) => (
  <div className="relative flex mt-6">
    <span className="absolute w-full top-1.5 border border-t-1.5 border-black" />
    {years.map((year) => (
      <div className="relative flex flex-col items-center">
        <span
          className={`h-4 w-4 bg-white rounded-full ${
            selectedYear === year && 'border-2 border-black'
          }`}
        />
        <span
          className="year relative ml-2"
          onMouseEnter={(e) => {
            e.preventDefault();
            setYear(year);
          }}
        >
          {year}
        </span>
      </div>
    ))}
  </div>
);
function App() {
  const [variables, setVariables] = useState();
  const [CABLES, setCABLES] = useState();
  const years = [2019, 2021, 2022];
  const [year, setYear] = useState(years[0]);

  useEffect(() => {
    if (CABLES) {
      CABLES.patch.setVariable('year', year);
    }
  }, [year, CABLES]);

  const [selectedVariables, setSelectedVariables] = useState({});

  function handlePlay() {
    setYear(years[0]);
    for (let i = 0; i < years.length; i++) {
      setTimeout(() => {
        setYear(years[i]);
      }, 800 * i);
    }
  }

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

  const { year: yearVariable, page1Visibility } = selectedVariables || {};
  const renderYears = () => {
    return (
      <div className="years">
        <div className="flex items-center justify-center">
          <div className="relative w-10 ml-4">
            <button className="play-button" onClick={handlePlay}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <YearSelector years={years} setYear={setYear} selectedYear={year} />
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container" style={{ opacity: page1Visibility }}>
        <h1 className="title">Pérdida de árboles en Madrid</h1>
        <h2 className="title">{yearVariable}</h2>
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
        canvasId={'canvas'}
        patchOptions={{ glCanvasResizeToWindow: false }}
      />
      {page1Visibility < 1 && renderYears()}
    </div>
  );
}

export default App;
