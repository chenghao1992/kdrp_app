/**
 * Created by xiaoys on 2017/9/22.
 */
import React from 'react'
import { Icon } from 'antd-mobile';
import {Link} from 'dva/router'

const Error = () => <div>
  <div style={{textAlign: 'center'}}>
    <h3>404 Not Found</h3>
    <Link style={{color: '#ee7700'}} to={{pathname: '/home'}}>点击返回首页</Link>
  </div>
</div>

export default Error
