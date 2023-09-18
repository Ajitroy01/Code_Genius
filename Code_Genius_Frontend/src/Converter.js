import React, { useState } from 'react';
import axios from 'axios';
import { Waveform } from '@uiball/loaders'

function Converter() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('convert');

  const handleConversion = async () => {
    try {
      setLoading(true); // Start loading
      if (selectedFeature === 'convert') {
        // Handle code conversion logic here
        const response = await axios.post('https://code-genius-jf9d.onrender.com/convert', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { code: input, targetLanguage },
        });
        setOutput(response.data.convertedCode);
      } else if (selectedFeature === 'debug') {
        const response = await axios.post('https://code-genius-jf9d.onrender.com/debug', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { code: input },
        });
        setOutput(response.data.convertedCode);
      } else if (selectedFeature === 'qualityCheck') {
        const response = await axios.post('https://code-genius-jf9d.onrender.com/qualityCheck', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { code: input },
        });
        setOutput(response.data.convertedCode);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }finally {
      setLoading(false); // Stop loading
    }
  };

  const renderInputArea = () => {
    if (selectedFeature === 'convert') {
      return (
        <div id="input">
          <div>
          <textarea placeholder="Write your code here..." value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          <div className="btn1">
          <select className='button-30' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            <option value="">Language</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
          {/* Generate Output button */}
      <button className="button-30" onClick={handleConversion}>Generate Output</button>
      </div>
        </div>
      );
    } else {
      return (
        <div id="input">
          <div>
          <textarea placeholder="Write your code here..." value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          <div className="btn">
          <button className="button-30" onClick={handleConversion}>Generate Output</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="main">
      {/* Feature selection buttons */}
      <div id="feature-buttons">
        <button className="button-85" onClick={() => setSelectedFeature('convert')}>Code Converter</button>
        <button className="button-85" onClick={() => setSelectedFeature('debug')}>Code Debugging</button>
        <button className="button-85" onClick={() => setSelectedFeature('qualityCheck')}>Code Quality Check</button>
      </div>
       <div id="content">
      {/* Input area */}
      {renderInputArea()}

        {/* Output area */}
      <div className="output-container">
        {loading && (
          <div className="loader">
          <Waveform
           size={40}
           lineWeight={3.5}
           speed={1} 
           color="white" 
          />
          </div>
        )}
        <textarea placeholder='Your results will appear here...' id="res" value={output} disabled />
      </div>
      </div>
    </div>
  );
}

export default Converter;
