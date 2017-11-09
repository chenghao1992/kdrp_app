import React, {PropTypes,Component }from 'react';
import { ListView, List, SearchBar,Icon,Toast } from 'antd-mobile';
import { Link,hashHistory } from 'dva/router'
import Search from '../../components/Custermer/search'

import PopoverList from './popoverList'

const { Item } = List;

function DomeList({provinceData,onSearch,onChangeList,initCode,changeInitCode,initSearchValues,onSearchName}) {

  // const provinceData = {
  //   A: [{id:'1',name:'1'},{id:'2',name:'2'},{id:'3',name:'3'},{id:'4',name:'4'},],
  //   B: [{id:'5',name:'1'},{id:'6',name:'2'},{id:'7',name:'3'},{id:'8',name:'4'},],
  //   C: [{id:'9',name:'1'},{id:'10',name:'2'},{id:'11',name:'3'},{id:'12',name:'4'},],
  //   D: [{id:'13',name:'1'},{id:'14',name:'2'},{id:'15',name:'3'},{id:'16',name:'4'},],
  //   E: [{id:'17',name:'1'},{id:'18',name:'2'},{id:'19',name:'3'},{id:'20',name:'4'},],
  //   F: [{id:'21',name:'1'},{id:'22',name:'2'},{id:'23',name:'3'},{id:'24',name:'4'},],
  //   G: [{id:'25',name:'1'},{id:'26',name:'2'},{id:'27',name:'3'},{id:'28',name:'4'},],
  //   H: [{id:'29',name:'1'},{id:'30',name:'2'},{id:'31',name:'32'},{id:'33',name:'4'},],
  //   I: [{id:'34',name:'1'},{id:'35',name:'2'},{id:'36',name:'3'},{id:'37',name:'4'},],
  //   J: [{id:'38',name:'1'},{id:'39',name:'2'},{id:'40',name:'3'},{id:'41',name:'4'},],
  //   K: [{id:'42',name:'1'},{id:'43',name:'2'},{id:'44',name:'3'},{id:'45',name:'4'},],
  // }

  const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
  const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
  let dataSource = new ListView.DataSource({
    getRowData,
    getSectionHeaderData: getSectionData,
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });
  const createDs = (ds, provinceData) => {
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    Object.keys(provinceData).forEach((item, index) => {
      sectionIDs.push(item);
      dataBlob[item] = item;
      rowIDs[index] = [];
      provinceData[item].forEach((jj) => {
        rowIDs[index].push(jj.id);
        dataBlob[jj.id] = jj.name;
      });
    });
    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  };

  dataSource = createDs(dataSource, provinceData);

  // const getData = (val) => {
  //   let pd = {...provinceData};
  //   Object.keys(pd).forEach((item) => {
  //     pd[item] = pd[item].filter(jj => jj.name.toLocaleLowerCase().indexOf(val) > -1);
  //   });
  //   return pd
  // }

  const popoverListProps = {
    initCode,
    changeInitCode,
    onSearchCode(x,y) {
      onSearch(x,y);
    }
  }

  const searchProps = {
    initSearchValues,
    onSearchCodes (d,val) {
      onSearchName(d,val)
    }
  }




  return (
    <div style={{ paddingTop: '0.88rem', position: 'relative' }}>

      <Search {...searchProps}/>

      <ListView.IndexedList
        animationType = 'none'
        dataSource={dataSource}
        renderHeader={() => <PopoverList {...popoverListProps}/>}
        renderFooter={() => <div style={{height: '1.0rem'}}></div>}
        renderSectionHeader={sectionData => (<div className="ih">{sectionData}</div>)}
        renderRow={(rowData,dataBlob,rowIDs)=> (<Link style={{color: '#000'}} to={{ pathname: '/custermer/custermerDetail',query: {id: rowIDs}}}><Item onClick={(a,b) => {console.log(rowIDs)}}>{rowData}</Item></Link>)}
        className="am-list"
        stickyHeader
        stickyProps={{
          stickyStyle: { zIndex: 999 },
        }}
        quickSearchBarStyle={{
          top: 300,
          color: '#000'
        }}
        quickSearchBarTop={{
          value: '',
          lable: ''
        }}
        delayTime={10}
        showQuickSearchIndicator={false}
        onQuickSearch= {(a) => {console.log(a)}}
        //delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}><Icon type='loading'/></div>}
      />
    </div>);
}

export default DomeList
