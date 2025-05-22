// src/components/Checkbox.js
import React from 'react'
import './index.css'

class Checkbox extends React.Component {
  render() {
    const {id, checked, onChange, label, className} = this.props
    return (
      <div className={`checkbox-container ${className || ''}`}>
        <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    )
  }
}

export default Checkbox
