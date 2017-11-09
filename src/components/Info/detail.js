import React, {PropTypes} from 'react';


import styles from './info.less';

class Detail extends React.Component {

  componentDidMount () {
    document.getElementById('content').innerHTML = this.props.data.content;
  }
  // componentDidUpdate () {
  //   console.log(this.props.data.content)
  //   document.getElementById('content').innerHTML = this.props.data.content;
  // }

  render() {
  	return (
      <div>
        {this.props.data ? <div className={styles.info_detail}>
          <h2>{this.props.data.title}</h2>
          <p>{this.props.data.sub_title}</p>
          <p className={styles.clx}><span className={styles.author}>{this.props.data.username}</span><span className={styles.date}>{this.props.data.release_time}</span></p>
          <div id="content" className={styles.content}></div>
        </div> : ''}
      </div>
  	)
  }

}

export default Detail;
