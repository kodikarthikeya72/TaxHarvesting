import {useState} from 'react'

import {
  Container,
  WorksLink,
  Tooltip,
  Arrow,
  KnowMore,
} from './styledComponents'

const WorkingToolTip = () => {
  const [visible, setVisible] = useState(false)

  const toggleTooltip = () => {
    setVisible(prev => !prev)
  }

  return (
    <Container>
      <WorksLink type="button" onClick={toggleTooltip}>
        How it works?
      </WorksLink>
      {visible && (
        <Tooltip>
          <Arrow />
          Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper
          mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui
          consectetur.
          <KnowMore href="#" target="_blank">
            Know More
          </KnowMore>
        </Tooltip>
      )}
    </Container>
  )
}

export default WorkingToolTip
