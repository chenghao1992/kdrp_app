import React, {PropTypes} from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
import {browserHistory, hashHistory} from 'dva/router'
import ReactDOM from 'react-dom'
import {formatMoney} from '../../utils/helper'

import styles from './home.less'

import { RefreshControl, ListView } from 'antd-mobile';

function genData(index) {
  const dataArr = [];
  dataArr.push(`row - ${index}`);
  return dataArr;
}

class List extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    for (let i = 0; i <1; i++) {
      this.initData.push(`r${i}`);
    }

    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
      height: document.documentElement.clientHeight,
      i: 0
    };

    console.log(document.documentElement.clientHeight)
  }
  componentDidMount() {
    this.manuallyRefresh = true;
    setTimeout(() => this.setState({ refreshing: true }), 10);

    setTimeout(() => this.setState({
      height: this.state.height - ReactDOM.findDOMNode(this.refs.lv).offsetTop,
    }), 0);

    this.refs.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    this.refs.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        console.log('start pull to refresh');
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
  }
  componentWillUnmount() {
    this.refs.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
    this.refs.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
  }
  onScroll = (e) => {
    this.st = e.scroller.getValues().top;
    this.domScroller = e;
  }


  onRefresh = () => {
    this.setState({i: this.state.i + 1});
    this.props.onRefreshs();
    console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }

    setTimeout(() => {
      this.rData = genData(this.state.i);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        showFinishTxt: true,
      });
      if (this.domScroller) {
        this.domScroller.scroller.options.animationDuration = 500;
      }
    }, 600);

  };
  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID}
          style={{
            paddingBottom:'1.36rem',
            backgroundColor: '#f5f5f9',
            borderColor: '#f5f5f9',
          }}
        >
          <div style={{height: '10.08rem',
          }}>
            <div className={styles.list_div}>
              <div className={styles.list_div2}>
                <img src="./src/assets/listLogo1.png" alt=""/>
                <div className={styles.list_div3}>
                  <p>我的客户</p>
                  <p>{this.props.customer.time}</p>
                </div>
              </div>
              <div className={styles.list_div4}>
                <div><p  className={styles.list_p1}>+ {this.props.customer.today_customer.num}</p><p className={styles.list_p2}>新增</p></div>
                <div><p  className={styles.list_p1}>{this.props.customer.total_customer.num}</p><p className={styles.list_p2}>累积客户</p></div>
              </div>
              <div className={styles.list_div5} onClick={() => {hashHistory.push(`/custermer/custermerList`)}}>查看更多</div>
            </div>
            <WhiteSpace/>

            <div className={styles.list_div}>
              <div className={styles.list_div2}>
                <img src="./src/assets/listLogo2.png" alt=""/>
                <div className={styles.list_div3}>
                  <p>客户交易</p>
                  <p>{this.props.employee_fee_detail ? this.props.employee_fee_detail.time : ''}</p>
                </div>
              </div>
              <div className={styles.list_div4_1}>
                <div>
                  {this.props.employee_fee_detail ?
                    <div>
                      <p  className={styles.list_p1}>￥{formatMoney(this.props.employee_fee_detail.invest_amount)}</p>
                      <p className={styles.list_p2}>最近一笔 {this.props.employee_fee_detail.invest_time}</p>
                    </div> :
                    <p>加油吧，实习生！现在还没有交易哦</p>
                  }

                </div>
              </div>
              <div className={styles.list_div5} onClick={() => {hashHistory.push(`/personal/personalServiceCharge`)}}>查看更多</div>
            </div>


            <WhiteSpace/>

            <div className={styles.list_div}>
              <div className={styles.list_div2}>
                <img src="./src/assets/listLogo3.png" alt=""/>
                <div className={styles.list_div3}>
                  <p>服务费月账单</p>
                  <p>{this.props.employee_fee_bill ? this.props.employee_fee_bill.bill_month : ''}</p>
                </div>
              </div>
              <div className={styles.list_div4_1}>
                <div>
                  {this.props.employee_fee_bill ?
                    <div>
                      <p  className={styles.list_p1}>￥{formatMoney(this.props.employee_fee_bill.accrued_amount)}</p>
                      <p className={styles.list_p2}>{this.props.employee_fee_bill.bill_date}</p>
                    </div>:
                    <p>上个月没有账单生成。加油吧！</p>
                  }
                </div>
              </div>
              <div className={styles.list_div5} onClick={() => {hashHistory.push(`/personal/personalAccountList?url=/home`)}}>查看更多</div>
            </div>

            <WhiteSpace/>
          </div>
        </div>
      );
    };
    return (
      <div style={{width:'100%'}} >
        <ListView
          ref="lv"
          dataSource={this.state.dataSource}
          renderRow={row}
          renderSeparator={separator}
          scrollRenderAheadDistance={200}
          scrollEventThrottle={20}
          style={{
            height: this.state.height,
            margin: '0.1rem 0 0 0',
            borderColor: '#f5f5f9',
          }}
          useBodyScroll={false}
          scrollerOptions={{ scrollbars: true }}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          onScroll={this.onScroll}
        />
      </div>
    );
  }
}
export default List;




