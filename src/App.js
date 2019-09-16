import React, { Component } from 'react';
import './App.css';

const DATA_URL = 'api/rates.json'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sortBy: undefined,
      sortAsc: true,
      data: undefined,
      series: [],
      isLoading: false,
      isError: false,
      errorMessage: 'Error loading data please contact site administrator'
    }
    // bind methods
    this.handleClickColumn = this.handleClickColumn.bind(this)
  }

  async componentDidMount () {
    this.setState({isLoading: true})

    try {
      const res = await fetch(DATA_URL)
      let data = await res.json()
      let series = Object.keys(data.rates).map((country, i, arr) => {
        return {
          country,
          rate: data.rates[country]
        }
      })

      console.log('data', data)
      console.log('series', series)
      this.setState({
        data,
        series,
        isLoading: false
      })
    } catch (e) {
      console.warn(e)
      this.setState({isError: true})
    }

  }

  handleClickColumn (e) {
    const {target} = e
    const sortBy = target.getAttribute('data-sort-by')
    // const sortAsc = Boolean(target.getAttribute('data-sort-asc'))
    const {sortAsc} = this.state
    let {series} = this.state

    series = series.sort((a, b) => {
      if (sortAsc) {
        if (a[sortBy] < b[sortBy] ) {return 1}
        if (a[sortBy] > b[sortBy] ) {return -1}
        return 0
      } else {
        if (a[sortBy] < b[sortBy] ) {return -1}
        if (a[sortBy] > b[sortBy] ) {return 1}
        return 0
      }



    })

    this.setState({
      sortBy,
      sortAsc: sortBy === this.state.sortBy ? !sortAsc : sortAsc
    })

  }
  render () {
    const {series, sortAsc, isLoading} = this.state
    if (isLoading) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th data-sort-by="country" onClick={this.handleClickColumn}>Country</th>
              <th data-sort-by="rate" onClick={this.handleClickColumn}>Rate</th>
            </tr>
          </thead>
          <tbody>
          {series.map((item, i) => {
            return (
              <tr key={item.country}>
                <td key={`${item.country}0`}>{item.country}</td>
                <td key={`${item.country}1`}>{item.rate}</td>
              </tr>)
          })}
          </tbody>
        </table>
      </div>
    )
  }
} ;
