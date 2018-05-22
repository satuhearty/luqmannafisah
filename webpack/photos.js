import React, { Component } from 'react';
import Slider from 'react-slick';
import {render} from "react-dom";

class Memories extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      lazyLoad: 'ondemand',
      arrows: false
    };
    return (
      <div id="main">
        <article className="post featured">
          <header className="major" style={{ marginBottom: '2rem' }}>
            <h2>Photos</h2>
            <p>Some of our memories.</p>
          </header>

          <div style={{ marginBottom: '4em' }}>
            <p style={{ textAlign: 'center' }}>Upload your photos at our wedding to our photo album! Click on the button below.</p>
            <ul className="actions">
              <li><a href="https://photos.app.goo.gl/BwGHFM43JD5PqDZs2" target="_blank" className="button">Photo Album</a></li>
            </ul>
          </div>
          <Slider {...settings}>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-1.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-2.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-3.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-4.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-5.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-6.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-7.jpg" alt=""/></span></div>
              </div>
            </div>
            <div className="alt">
              <div className="row uniform 50%">
                <div className="12u"><span className="image fit"><img src="/images/photos-8.jpg" alt=""/></span></div>
              </div>
            </div>
          </Slider>
        </article>
        <footer>
          <ul className="actions">
            <li><a href="/guestbook" className="button">Guestbook &raquo;</a></li>
          </ul>
        </footer>
      </div>
    );
  }
}

render(<Memories />, document.getElementById('photos'));