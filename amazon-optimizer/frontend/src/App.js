import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import OptimizationForm from './components/OptimizationForm';
import OptimizationResult from './components/OptimizationResult';
import HistoryView from './components/HistoryView';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('optimize'); // 'optimize' or 'history'

  const handleOptimize = async (inputAsin) => {
    setAsin(inputAsin);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/optimize`, { asin: inputAsin });
      setResult(response.data);
      setView('optimize'); // Show results view
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to optimize listing. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = async (asinToFetch) => {
    setAsin(asinToFetch);
    setLoading(true);
    setError(null);
    setHistory([]);

    try {
      const response = await axios.get(`${API_BASE_URL}/history/${asinToFetch}`);
      setHistory(response.data.history);
      setView('history'); // Show history view
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to fetch history. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Amazon Listing Optimizer</h1>
      </header>
      
      <div className="container">
        <OptimizationForm 
          onOptimize={handleOptimize} 
          onViewHistory={handleViewHistory}
          loading={loading}
        />

        <div className="view-selector">
          <button 
            className={view === 'optimize' ? 'active' : ''} 
            onClick={() => setView('optimize')}
            disabled={!result && !loading}
          >
            Optimization Result
          </button>
          <button 
            className={view === 'history' ? 'active' : ''} 
            onClick={() => handleViewHistory(asin)}
            disabled={!asin || loading}
          >
            Optimization History ({asin || 'ASIN'})
          </button>
        </div>

        {loading && <p className="message loading">Processing optimization...</p>}
        {error && <p className="message error">Error: {error}</p>}

        {!loading && !error && view === 'optimize' && result && (
          <OptimizationResult result={result} />
        )}

        {!loading && !error && view === 'history' && history.length > 0 && (
          <HistoryView history={history} asin={asin} />
        )}

        {!loading && !error && view === 'history' && history.length === 0 && asin && (
          <p className="message info">No optimization history found for ASIN: {asin}</p>
        )}
      </div>
    </div>
  );
}

export default App;

