import React, {PropTypes} from 'react';
import { WhiteSpace } from 'antd-mobile';
import {routerRedux, Link} from 'dva/router';

import styles from './about.less';

function About() {
	return (
    <div>
       <div className={styles.jzy_logo}>
            <img src="./src/assets/jzy_logo.jpg" alt=""/>
        </div>
        <WhiteSpace size="xl" />
        <div className={styles.jzy_breif}>
            <p className={styles.jzy_title}>公司简介</p>
            <p className={styles.jzy_content}>佳兆业金服(www.kaisafax.com)是佳兆业集团控股有限公司旗下的互联网金融平台，于2015年9月在深圳前海注册成立，注册资本2亿元人民币。佳兆业集团控股有限公司（股票代码：1638.HK）是中国大型综合性投资控股集团，成立于1999年，旗下拥有地产、金融、文化、城市更新、商业等14大集团及多家专业公司，总资产超1000亿元人民币。佳兆业金服专注于产业金融和社区金融，通过整合上市公司和大型企业集团上下游资产和客户资源，以强大的背景，雄厚的实力，严密的风控体系，专业的服务团队，为用户提供安全高效的投融资服务，全力打造卓越的综合金融服务品牌。</p>
        </div>
        <WhiteSpace size="xl" />
        <div className={styles.jzy_breif}>
            <p className={styles.jzy_title}>客户服务</p>
            <p className={styles.jzy_content}>
                如果您在使用佳兆业金服的过程中遇到任何疑问，请您与佳兆业金服客服人员联系<br />
                人工服务时间：09:00-18:00<br />
                客服热线：400-889-6099<br />
                客服邮箱：service@kaisafax.com<br />
                投诉与建议：fw@kaisafax.com
            </p>
            <p className={styles.jzy_title}>商务合作</p>
            <p className={styles.jzy_content}>
                如果您希望与我们建立商务合作，你可以通过以下方式联系我们<br />
                联系人：贾先生<br />
                联系电话：0755-82349230<br />
                合作邮箱：bd@kaisafax.com
            </p>
        </div>
    </div>
	)
}




export default About;
