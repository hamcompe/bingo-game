import { remove, map, range } from 'ramda'
import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'

const COL_SIZE = 40
const COL_NUMBERS = 8
const BOX_WIDTH = COL_SIZE * COL_NUMBERS + 60
const initialRemaining = range(1, 100)

const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${COL_NUMBERS}, ${COL_SIZE}px);
  grid-row-gap: 5px;
`
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: ${BOX_WIDTH}px ${BOX_WIDTH}px auto;
  grid-template-rows: minmax(200px, 1fr);
  grid-column-gap: 20px;
`
const PageContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`
const H1 = styled.h1`
  text-align: center;
`
const H4 = styled.h4`
  text-align: center;
`
const TitleDiv = styled.div`
  margin: 48px 0;
  text-align: center;
`
const Flex = styled.div`
  display: flex;
`
const HeroNumber = styled.div`
  font-size: 200px;
  font-weight: 500;
  margin: auto;

  line-height: 400px;
  height: 400px;
`
const NumDiv = styled.div`
  margin: 0 auto;
`
const Divider = styled.div`
  margin-bottom: 24px;
`

const initialState = {
  remaining: initialRemaining,
  used: [],
  latestAnswer: ''
}
class Page extends React.Component {
  state = initialState

  onClickRandom = () => {
    const { remaining } = this.state

    if (remaining.length === 0) return
    const randomNumber = _.random(0, remaining.length - 1)
    const slicedList = remove(randomNumber, 1)(remaining)
    const latestAnswer = remaining[randomNumber]

    this.setState({
      remaining: slicedList,
      used: [...this.state.used, latestAnswer],
      latestAnswer
    })
  }
  onClickReset = () => {
    this.setState(initialState)
  }

  render() {
    return (
      <PageContainer>
        <TitleDiv>
          <h1>🎉 Jitta's Bingo! 🎉</h1>
          <h4>Only available at Jitta's New Year Party 2018</h4>
          <Divider />
          <button className="btn btn-danger" onClick={this.onClickReset}>
            🔥 Reset 🔥
          </button>
        </TitleDiv>
        <DashboardContainer>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Remaining</h4>
              <TableContainer>
                {map(num => (
                  <NumDiv key={num}>
                    <span className="badge badge-pill badge-outline-success">
                      {num}
                    </span>
                  </NumDiv>
                ))(this.state.remaining)}
              </TableContainer>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Used</h4>
              <TableContainer>
                {map(num => (
                  <NumDiv key={num}>
                    <span className="badge badge-pill badge-outline-danger">
                      {num}
                    </span>
                  </NumDiv>
                ))(this.state.used)}
              </TableContainer>
            </div>
          </div>
          <Flex>
            <button
              className={`btn btn-primary ${
                this.state.remaining.length === 0
                  ? ''
                  : 'animated pulse infinite'
              }`}
              disabled={this.state.remaining.length === 0}
              onClick={this.onClickRandom}
            >
              Random &rarr;
            </button>
            <HeroNumber className="shake-chunk shake-constant">
              {this.state.latestAnswer}
            </HeroNumber>
          </Flex>
        </DashboardContainer>
      </PageContainer>
    )
  }
}

export default Page
