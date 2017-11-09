/**
 * Created by xiaoys on 2017/9/17.
 */
import React from 'react'
import {SearchBar} from 'antd-mobile'

class Search extends React.Component {

  state = {
    inputValue: '',
    timer: false
  }
  componentWillMount () {
    console.log(this.props)
    this.setState ({
      inputValue: this.props.initSearchValues
    })
  }


  onSearch = (val) => {
    clearTimeout(this.state.timer);
    this.setState({ inputValue: val });
    const d = 'name';
    this.state.timer = setTimeout(() => {
      this.props.onSearchCodes(val,d);
      console.log(val);
      console.log(d);
    }, 300)
  }

  onCancel = () => {
    this.setState({
      inputValue: ''
    });
    const val = '';
    const d = 'name';
    this.props.onSearchCodes(val,d)
  }

  render () {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0,zIndex: 10000000000 }}>
        {/*搜索框*/}
        <SearchBar
          value={this.state.inputValue}
          placeholder="搜索"
          onChange={this.onSearch}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}

export default Search
