import styled from 'styled-components'

export const DisclaimerContainer = styled.div`
  background-color: #0c1523;
  border: 1px solid #24304a;
  border-radius: 10px;
  padding: 16px 20px;
  color: white;
  margin-bottom: 24px;
  margin: 20px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
`

export const ToggleIcon = styled.div`
  font-size: 16px;
  color: #94a3b8;
  transition: transform 0.3s ease;
`

export const Content = styled.ul`
  margin-top: 16px;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.7;
  color: #d1d5db;
  list-style-type: disc;
`
