import React from 'react';

function OptimizationResult({ result }) {
  if (!result || !result.original || !result.optimized) {
    return null;
  }

  const { original, optimized } = result;

  return (
    <div className="result-comparison">
      {/* Original Column */}
      <div className="column original-column">
        <h3>Original Listing</h3>
        
        <div className="content-section">
          <h4>Title</h4>
          <p>{original.title}</p>
        </div>

        <div className="content-section">
          <h4>Bullet Points</h4>
          <ul>
            {original.bullets.map((bullet, index) => (
              <li key={`orig-bullet-${index}`}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <h4>Description</h4>
          <p>{original.description}</p>
        </div>
      </div>

      {/* Optimized Column */}
      <div className="column optimized-column">
        <h3>AI Optimized Listing</h3>
        
        <div className="content-section">
          <h4>Title</h4>
          <p>{optimized.title}</p>
        </div>

        <div className="content-section">
          <h4>Bullet Points</h4>
          <ul>
            {optimized.bullets.map((bullet, index) => (
              <li key={`opt-bullet-${index}`}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <h4>Description</h4>
          <p>{optimized.description}</p>
        </div>

        <div className="content-section">
          <h4>Keyword Suggestions</h4>
          <div>
            {optimized.keywords.split(',').map((keyword, index) => (
              <span key={`keyword-${index}`} className="keywords-tag">
                {keyword.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptimizationResult;

