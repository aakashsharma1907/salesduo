import React from 'react';

function HistoryView({ history, asin }) {
  if (!history || history.length === 0) {
    return <p className="message info">No optimization history found for ASIN: {asin}</p>;
  }

  return (
    <div className="history-list">
      <h2>Optimization History for ASIN: {asin}</h2>
      {history.map((record, index) => (
        <div key={record.id} className="history-item">
          <div className="history-header">
            <h4>Optimization Run #{history.length - index}</h4>
            <span>Date: {new Date(record.optimization_date).toLocaleString()}</span>
          </div>
          
          <div className="history-details">
            {/* Original Data Column */}
            <div className="history-detail-column">
              <h5>Original</h5>
              <p><strong>Title:</strong> {record.original.title}</p>
              <p><strong>Bullets:</strong></p>
              <ul>
                {record.original.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
              </ul>
              <p><strong>Description:</strong> {record.original.description.substring(0, 100)}...</p>
            </div>

            {/* Optimized Data Column */}
            <div className="history-detail-column">
              <h5>Optimized</h5>
              <p><strong>Title:</strong> {record.optimized.title}</p>
              <p><strong>Bullets:</strong></p>
              <ul>
                {record.optimized.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
              </ul>
              <p><strong>Description:</strong> {record.optimized.description.substring(0, 100)}...</p>
              <p><strong>Keywords:</strong> {record.optimized.keywords.join(', ')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryView;

