import React, { useState } from 'react';

function OptimizationForm({ onOptimize, loading }) {
  const [asin, setAsin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (asin.trim()) {
      onOptimize(asin.trim().toUpperCase());
    }
  };

  return (
    <form className="optimization-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Amazon ASIN (e.g., B07H65KP63)"
        value={asin}
        onChange={(e) => setAsin(e.target.value)}
        disabled={loading}
      />
      <button 
        type="submit" 
        className="optimize-btn"
        disabled={loading || !asin.trim()}
      >
        {loading ? 'Optimizing...' : 'Optimize Listing'}
      </button>
    </form>
  );
}

export default OptimizationForm;

