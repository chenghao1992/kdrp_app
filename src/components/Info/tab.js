import React, {PropTypes} from 'react';
import { Tabs } from 'antd-mobile';

import List from './list';

const TabPane = Tabs.TabPane;

function Tab(tabProps) {
	let data = tabProps.data;
	let result=[];
	let catalog = {};
	let params = {};
	let pageNum = 1;

	if (data.data) {
		result = data.data;
	};

	result.forEach((v,i) => {
		catalog[i] = v.id;
	})


	const getTabKey = (tab) => {
		let key = 0;
		if (tabProps.query) {
			tab.forEach((v, i) => {
				if (v.id == tabProps.query) {
					key = i;
				}
			})
		}
		return key.toString();
	}

	const handleTabClick = (key) => {
		params = {
			page: pageNum,
			catalog_id: catalog[key]
		}
		tabProps.onClick(params)
	}

	const clickToDetailsId = tabProps.clickToDetailsId;

	const listProps = {
		data: tabProps.pageData,
    page: tabProps.page,
    hasMore: tabProps.hasMore,
		getPageData: function(page, id, hm){
			params = {
				page: page,
				catalog_id: id,
				hasMore: hm
			}
      tabProps.onClick(params);
    },
    clickToDetailsId,
	}

	if (!result.length) return <div></div>;

	return (
    <Tabs defaultActiveKey={getTabKey(result)} pageSize={4} swipeable={false} onTabClick={handleTabClick}>
	    {result.map((v,i) => (
	      <TabPane tab={v.name} key={i} style={{overflow:'hidden'}}>
	      	<div id={"tabList"+i}>
	      	{listProps.data.data ? <List  {...listProps} /> : ''}
	      	</div>
			  </TabPane>
			))}
    </Tabs>
	)
}


export default Tab;
