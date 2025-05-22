// src/components/CapitalGainsCard.js
import React from 'react'
import {
  calculateNetCapitalGains,
  calculateRealizedCapitalGains,
  formatCurrency,
} from '../Calculations'
import './index.css'

const CapitalGainsCard = ({
  title,
  capitalGains,
  isAfterHarvesting,
  savings,
}) => {
  const stcgNet = calculateNetCapitalGains(
    capitalGains.stcg.profits,
    capitalGains.stcg.losses,
  )
  const ltcgNet = calculateNetCapitalGains(
    capitalGains.ltcg.profits,
    capitalGains.ltcg.losses,
  )
  const realizedCapitalGains = calculateRealizedCapitalGains(stcgNet, ltcgNet)

  const cardClass = isAfterHarvesting
    ? 'capital-gains-card after-harvesting'
    : 'capital-gains-card pre-harvesting'

  return (
    <div className={cardClass}>
      <h3>{title}</h3>
      <div className="card-section">
        <h4>Short-term</h4>
        <p>Profits: {formatCurrency(capitalGains.stcg.profits)}</p>
        <p>Losses: {formatCurrency(capitalGains.stcg.losses)}</p>
        <p>Net Capital Gains: {formatCurrency(stcgNet)}</p>
      </div>
      <div className="card-section">
        <h4>Long-term</h4>
        <p>Profits: {formatCurrency(capitalGains.ltcg.profits)}</p>
        <p>Losses: {formatCurrency(capitalGains.ltcg.losses)}</p>
        <p>Net Capital Gains: {formatCurrency(ltcgNet)}</p>
      </div>
      <div className="card-section total-gains">
        <h4>Realized Capital Gains: {formatCurrency(realizedCapitalGains)}</h4>
      </div>
      {isAfterHarvesting && savings > 0 && (
        <p className="savings-message">
          You're going to save {formatCurrency(savings)}
        </p>
      )}
    </div>
  )
}

export default CapitalGainsCard
