import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline-block;
`

export const WorksLink = styled.span`
  color: #3b82f6;
  font-size: 14px;
  margin-left: 10px;
  text-decoration: underline;
  cursor: pointer;
`

export const Tooltip = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  background: #fff;
  color: #000;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  width: 500px;
  z-index: 10;
  font-size: 14px;
  line-height: 1.5;
  white-space: normal;
`

export const Arrow = styled.div`
  position: absolute;
  top: -6px;
  left: 24px;
  width: 12px;
  height: 12px;
  background: #fff;
  transform: rotate(45deg);
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.05);
`

export const KnowMore = styled.a`
  color: #3b82f6;
  margin-left: 6px;
  text-decoration: underline;
  cursor: pointer;
`
