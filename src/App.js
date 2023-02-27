import CablesPatch from './CablesPatch';
import './App.css';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [variables, setVariables] = useState();
  const [selectedVariables, setSelectedVariables] = useState({});

  const setSelectedVariable = useCallback((key, variable) => {
    setSelectedVariables({...selectedVariables, [key]: variable });
  }, [selectedVariables]);

  useEffect(() => {
    if (variables) {
      Object.keys(variables).forEach(varKey => {
        if (varKey && variables[varKey]) {
          variables[varKey].on("change", ((newValue) => {
            setSelectedVariable(varKey, newValue)
          }));
        }
      });
    }
  }, [variables, setSelectedVariable])

  const { year, page1Visibility } = selectedVariables || {};

  return (
    <div className="App">
      <h1 className='title' style={{opacity: page1Visibility}}>Pérdida de árboles en Madrid</h1>
      <h2 className='title'>{year}</h2>
      <CablesPatch patchDir={"/patch/"} setVariables={setVariables} />
    </div>
  );
}

export default App;
