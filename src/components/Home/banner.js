import React, {PropTypes} from 'react';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import styles from './home.less'

function Banner({bannerList,clickToDetails,autoPlay}) {

  return (
    <Carousel
      className={styles.mycarousel}
      autoplay={autoPlay}
      infinite
      selectedIndex={0}
      swipeSpeed={35}
      //beforeChange={(from, to) => console.log(`slide <f></f>rom ${from} to ${to}`)}
      afterChange={index => console.log('slide to', index)}
    >
      {bannerList.map(ii => (
        <a href={`${ii.image_url_address}&url=/home`} key={ii} >
          <img
            style={{width: '100%',height: '4.0rem'}}
            src={ii.image_url}
            alt="icon"
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
            }}
          />
        </a>
      ))}
    </Carousel>
  );
}

export default Banner;
