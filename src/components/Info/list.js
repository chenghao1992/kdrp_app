import React, {PropTypes} from 'react';
import { List} from 'antd-mobile';
import {connect} from 'dva';
import {hashHistory} from 'dva/router';

import styles from './info.less';

const Item = List.Item;
const Brief = Item.Brief;

function TabList(listProps) {
  let data = listProps.data.data;
  let page = listProps.page;
  let pageTotal = Math.ceil(listProps.data.page.total / 20);
  let hasMore = listProps.hasMore;

  const handleClickLoad = () => {
    page++;
    if (page >= pageTotal) {
      hasMore = false;
    }
    listProps.getPageData(page, data[0].catalog_id, hasMore);
  }

  const handleClick = (id) => {
    listProps.clickToDetailsId('list')
    hashHistory.push('/information/informationDetail?article_id='+id )
  }

  if (!data) return <div></div>;

  return (
  <div>
  <List className="tab-list">
    {data.map((v,i) => (
      <Item
        className={styles.tab_list_item}
        key={i}
        arrow="horizontal"
        thumb={v.image_url}
        multipleLine
        onClick={() => { handleClick(v.id)}}
      >
        {v.title} <Brief>{v.sub_title}</Brief>
      </Item>
    ))}
    <div className="loading" style={{ marginBottom: '1rem'}}>{pageTotal <= 1 || !hasMore ? '' : <div onClick={handleClickLoad} style={{lineHeight:'1rem', color:'#666', textAlign:'center'}}>点击加载</div>}</div>
  </List>
  </div>
  )
}

export default TabList;
