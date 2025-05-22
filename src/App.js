// src/App.js
import React from 'react'

import {fetchHoldings} from './api/holdingsApi'

import {fetchCapitalGains} from './api/capitalGainsApi'

import CapitalGainsCard from './components/CapitalGainsCard'

import HoldingsTable from './components/HoldingsTable'

import Disclaimer from './components/Disclaimer'

import WorkingToolTip from './components/WorkingToolTip'

import {
  calculateNetCapitalGains,
  calculateRealizedCapitalGains,
} from './components/Calculations'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      holdings: [],
      preHarvestCapitalGains: null,
      afterHarvestCapitalGains: null,
      selectedHoldings: [],
      loading: true,
      error: null,
    }
    // Bind event handlers
    this.handleSelectHolding = this.handleSelectHolding.bind(this)
    this.handleSelectAllHoldings = this.handleSelectAllHoldings.bind(this)
    this.updateAfterHarvestGains = this.updateAfterHarvestGains.bind(this)
  }

  componentDidMount() {
    this.fetchInitialData()
  }

  componentDidUpdate(prevProps, prevState) {
    // Only update afterHarvestCapitalGains if selectedHoldings has changed
    const {selectedHoldings} = this.state
    if (prevState.selectedHoldings !== selectedHoldings) {
      this.updateAfterHarvestGains()
    }
  }

  async fetchInitialData() {
    try {
      const holdingsData = await fetchHoldings()
      const capitalGainsData = await fetchCapitalGains()
      this.setState({
        holdings: holdingsData,
        preHarvestCapitalGains: capitalGainsData.capitalGains,
        afterHarvestCapitalGains: capitalGainsData.capitalGains, // Initially same
        loading: false,
      })
    } catch (err) {
      this.setState({
        error: 'Failed to fetch data. Please try again later.',
        loading: false,
      })
      console.error(err)
    }
  }

  updateAfterHarvestGains() {
    const {preHarvestCapitalGains, selectedHoldings} = this.state
    if (!preHarvestCapitalGains) return

    let newStcgProfits = preHarvestCapitalGains.stcg.profits
    let newStcgLosses = preHarvestCapitalGains.stcg.losses
    let newLtcgProfits = preHarvestCapitalGains.ltcg.profits
    let newLtcgLosses = preHarvestCapitalGains.ltcg.losses

    selectedHoldings.forEach(holding => {
      // If gain is negative, it adds to losses (reduces net profit or increases net loss)
      // If gain is positive, it adds to profits
      if (holding.stcg.gain < 0) {
        newStcgLosses = newStcgLosses - holding.stcg.gain // Subtracting a negative gain increases the loss value
      } else if (holding.stcg.gain > 0) {
        newStcgProfits = newStcgProfits + holding.stcg.gain
      }

      if (holding.ltcg.gain < 0) {
        newLtcgLosses = newLtcgLosses - holding.ltcg.gain // Subtracting a negative gain increases the loss value
      } else if (holding.ltcg.gain > 0) {
        newLtcgProfits = newLtcgProfits + holding.ltcg.gain
      }
    })

    this.setState({
      afterHarvestCapitalGains: {
        stcg: {profits: newStcgProfits, losses: newStcgLosses},
        ltcg: {profits: newLtcgProfits, losses: newLtcgLosses},
      },
    })
  }

  handleSelectHolding(holdingToToggle) {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedHoldings.some(
        selected =>
          selected.coin === holdingToToggle.coin &&
          selected.coinName === holdingToToggle.coinName,
      )

      if (isAlreadySelected) {
        return {
          selectedHoldings: prevState.selectedHoldings.filter(
            selected =>
              !(
                selected.coin === holdingToToggle.coin &&
                selected.coinName === holdingToToggle.coinName
              ),
          ),
        }
      } else {
        return {
          selectedHoldings: [...prevState.selectedHoldings, holdingToToggle],
        }
      }
    })
  }

  handleSelectAllHoldings() {
    this.setState(prevState => {
      if (prevState.selectedHoldings.length === prevState.holdings.length) {
        return {selectedHoldings: []} // Deselect all
      } else {
        return {selectedHoldings: [...prevState.holdings]} // Select all
      }
    })
  }

  render() {
    const {
      holdings,
      preHarvestCapitalGains,
      afterHarvestCapitalGains,
      selectedHoldings,
      loading,
      error,
    } = this.state

    if (loading) return <div className="loading">Loading data...</div>
    if (error) return <div className="error">Error: {error}</div>
    if (!preHarvestCapitalGains)
      return <div className="no-data">No capital gains data available.</div>

    const preHarvestRealizedGains = calculateRealizedCapitalGains(
      calculateNetCapitalGains(
        preHarvestCapitalGains.stcg.profits,
        preHarvestCapitalGains.stcg.losses,
      ),
      calculateNetCapitalGains(
        preHarvestCapitalGains.ltcg.profits,
        preHarvestCapitalGains.ltcg.losses,
      ),
    )

    const afterHarvestRealizedGains = afterHarvestCapitalGains
      ? calculateRealizedCapitalGains(
          calculateNetCapitalGains(
            afterHarvestCapitalGains.stcg.profits,
            afterHarvestCapitalGains.stcg.losses,
          ),
          calculateNetCapitalGains(
            afterHarvestCapitalGains.ltcg.profits,
            afterHarvestCapitalGains.ltcg.losses,
          ),
        )
      : preHarvestRealizedGains // Fallback if not yet calculated

    const savings =
      preHarvestRealizedGains > afterHarvestRealizedGains
        ? preHarvestRealizedGains - afterHarvestRealizedGains
        : 0

    return (
      <div className="app-container">
        <div className="title-working-section">
          <h1 className="main-title">Tax Harvesting</h1>
          <WorkingToolTip />
        </div>

        <Disclaimer />
        <div className="cards-container">
          <CapitalGainsCard
            title="Pre-Harvesting"
            capitalGains={preHarvestCapitalGains}
            isAfterHarvesting={false}
          />
          <CapitalGainsCard
            title="After Harvesting"
            capitalGains={afterHarvestCapitalGains}
            isAfterHarvesting={true}
            savings={savings}
          />
        </div>
        <HoldingsTable
          holdings={holdings}
          selectedHoldings={selectedHoldings}
          onSelectHolding={this.handleSelectHolding}
          onSelectAllHoldings={this.handleSelectAllHoldings}
        />
      </div>
    )
  }
}

export default App
