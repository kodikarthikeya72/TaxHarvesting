import {useState} from 'react'

import {FiInfo, FiChevronUp, FiChevronDown} from 'react-icons/fi'

import {
  DisclaimerContainer,
  Header,
  LeftSection,
  Title,
  Content,
  ToggleIcon,
} from './styledComponents'

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DisclaimerContainer>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <LeftSection>
          <FiInfo />
          <Title>Important Notes & Disclaimers</Title>
        </LeftSection>
        <ToggleIcon open={isOpen}>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </ToggleIcon>
      </Header>
      {isOpen && (
        <Content>
          <li>
            Tax-loss harvesting is currently not allowed under Indian tax
            regulations. Please consult your tax advisor before making any
            decisions.
          </li>
          <li>
            Tax harvesting does not apply to derivatives or futures. These are
            handled separately as business income under tax rules.
          </li>
          <li>
            Price and market value data is fetched from Coingecko, not from
            individual exchanges. As a result, values may slightly differ from
            the ones on your exchange.
          </li>
          <li>
            Some countries do not have a short-term / long-term bifurcation. For
            now, we are calculating everything as long-term.
          </li>
          <li>
            Only realized losses are considered for harvesting. Unrealized
            losses in held assets are not counted.
          </li>
        </Content>
      )}
    </DisclaimerContainer>
  )
}

export default Disclaimer
