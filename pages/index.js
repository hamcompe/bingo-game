import { map, filter, range, random, slice, without } from 'lodash/fp'
import React from 'react'

const initialList = range(1, 11)

class Page extends React.Component {
  state = {
    list: initialList,
    used: []
  }

  onClickRandom = () => {
    if (this.state.list.length === 0) return
    const rand = random(0, this.state.list.length - 1)
    const slicedList = this.state.list.filter((val, index) => index !== rand)
    this.setState({
      list: slicedList,
      used: [...this.state.used, this.state.list[rand]]
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Sample Card Title</h4>
            <p className="card-text">
              He seems sinking under the evidence could not only grieve and a
              visit. The father is to bless and placed in his length hid...
            </p>
            <h1>List</h1>
            {map(num => <p>{num}</p>)(this.state.list)}
            <h1>Used</h1>
            {map(num => <p>{num}</p>)(this.state.used)}
            <a
              href="#"
              className="btn btn-primary"
              onClick={this.onClickRandom}
            >
              Tell me more &rarr;
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Page
