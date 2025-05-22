// src/components/HoldingsTable.js
import React from 'react'
import Checkbox from '../Checkbox'
import {formatCurrency} from '../Calculations'
import './index.css'

class HoldingsTable extends React.Component {
  render() {
    const {holdings, selectedHoldings, onSelectHolding, onSelectAllHoldings} =
      this.props
    const isAllSelected =
      holdings.length > 0 && selectedHoldings.length === holdings.length

    return (
      <div className="holdings-table-container">
        <h2>Your Holdings</h2>
        <table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  id="select-all"
                  checked={isAllSelected}
                  onChange={onSelectAllHoldings}
                />
              </th>
              <th>Asset</th>
              <th>Holdings / Avg Buy Price</th>
              <th>Current Price</th>
              <th>Short-Term Gain</th>
              <th>Long-Term Gain</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map(holding => {
              const isSelected = selectedHoldings.some(
                selected =>
                  selected.coin === holding.coin &&
                  selected.coinName === holding.coinName,
              )
              return (
                <tr key={`${holding.coin}-${holding.coinName}`}>
                  <td>
                    <Checkbox
                      id={`${holding.coin}-${holding.coinName}`}
                      checked={isSelected}
                      onChange={() => onSelectHolding(holding)}
                    />
                  </td>
                  <td className="asset-cell">
                    <img
                      src={holding.logo}
                      alt={holding.coinName}
                      className="coin-logo"
                    />
                    <div>
                      <div className="coin-symbol">{holding.coin}</div>
                      <div className="coin-name">{holding.coinName}</div>
                    </div>
                  </td>
                  <td>
                    {holding.totalHolding.toFixed(4)} <br />
                    {formatCurrency(holding.averageBuyPrice)}
                  </td>
                  <td>{formatCurrency(holding.currentPrice)}</td>
                  <td
                    className={
                      holding.stcg.gain >= 0 ? 'gain-positive' : 'gain-negative'
                    }
                  >
                    {formatCurrency(holding.stcg.gain)} (
                    {holding.stcg.balance.toFixed(4)})
                  </td>
                  <td
                    className={
                      holding.ltcg.gain >= 0 ? 'gain-positive' : 'gain-negative'
                    }
                  >
                    {formatCurrency(holding.ltcg.gain)} (
                    {holding.ltcg.balance.toFixed(4)})
                  </td>
                  <td>{isSelected ? holding.totalHolding.toFixed(4) : '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default HoldingsTable
