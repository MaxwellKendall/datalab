import React, { Component } from 'react';
import './share-menu.scss';
import svgShareLogo from '../share-svg/share-svg';
import shareLogo from '../../images/colleges-and-universities/share.svg'
import facebookLogo from '../../images/colleges-and-universities/facebook.svg'
import twitterLogo from '../../images/colleges-and-universities/twitter.svg'
import linkedinLogo from '../../images/colleges-and-universities/linkedin.svg'
import redditLogo from '../../images/colleges-and-universities/reddit.svg'
import emailLogo from '../../images/colleges-and-universities/email.svg'

class ShareMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleShareClickFacebook = this.handleShareClickFacebook.bind(this);
    this.handleShareClickTwitter = this.handleShareClickTwitter.bind(this);
    this.handleShareClickLinkedin = this.handleShareClickLinkedin.bind(this);
    this.handleShareClickReddit = this.handleShareClickReddit.bind(this);
  }

  componentDidMount() {
    console.log('share mounted');
  }

  handleShow() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  handleShareClickFacebook(e) {
    let finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${this.props.siteUrl}${this.props.pageUrl}`;
    window.open(finalUrl, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
  }

  handleShareClickTwitter(e) {
    let finalUrl = `https://twitter.com/intent/tweet?text=${this.props.twitter}'\n${this.props.siteUrl}${this.props.pageUrl}`
    window.open(finalUrl, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
  }

  handleShareClickLinkedin(e) {
    let finalUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${this.props.siteUrl}${this.props.pageUrl}`;
    window.open(finalUrl, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
  }

  handleShareClickReddit(e) {
    let finalUrl = `http://www.reddit.com/submit?url=${this.props.siteUrl}${this.props.pageUrl}`;
    window.open(finalUrl, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
  }

  render() {

    // there is an article i read regarding using svgs
    // we shouldn't be importing them as images! we should find a better way...
    const images = [
      {
        src: shareLogo
      },
      {
        src: facebookLogo,
        style: { height: '15px', width: '15px' }
      },
      {
        src: twitterLogo,
        style: { height: '15px', width: '15px' }
      },
      {
        src: redditLogo,
        style: { height: '15px', width: '15px' }
      },
      {
        src: linkedinLogo,
        style: { height: '15px', width: '15px' }
      },
      {
        src: emailLogo,
        style: { height: '15px', width: '15px' }
      },
    ];

    const shareStyle = {
      textAlign: 'right',
    };

    const newShareBtn = {
      display: 'flex',
      marginLeft: '20px',
      cursor: 'pointer',
      position: 'relative',
    }

    const isShowing = this.state.show;

    // https://www.facebook.com/sharer/sharer.php?u={{ site.url }}{{ site.baseurl }}{{ page.url }}#{{include.anchor}}')
    // site url is : localhost:8000/
    // base url is : we dont need this
    // page url is : colleges-and-universities

    // TODO, use data-id's to dynamically see if "facebook" or "twitter".. etc..


    return (
      <div className='share-container'>
        <div className="popup new-share-button">
          <span className="viz-share-icon" aria-hidden="true" onClick={this.handleShow}>
            <img src={images[0].src}></img>
            <span className="share-text">Share</span>
          </span>
          <span className={`popuptext right newpopup ${isShowing ? `show` : ``}`} id="sharePopup">
            <div className="share-buttons">
              <ul>
                <li>                  
                  <a href="#" onClick={this.handleShareClick} title="Share on Facebook" data-id="1">
                    <img src={images[1].src} style={images[1].style} className='icon-facebook'></img>
                    <span className="share-button-text">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href='#' onClick={this.handleShareClickTwitter} title="Share on Twitter" data-id='2'>
                    <img src={images[2].src} style={images[2].style} className='icon-twitter'></img>
                    <span className="share-button-text">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href='#' onClick={this.handleShareClickReddit} title="Share on Reddit" data-id='3'>
                    <img src={images[3].src} style={images[3].style} className='icon-reddit'></img>
                    <span className="share-button-text">Reddit</span>
                  </a>
                </li>
                <li>
                  <a href='#' onClick={this.handleShareClickLinkedin} title="Share on LinkedIn" data-id='4'>
                    <img src={images[4].src} style={images[4].style} className='icon-linkedin'></img>
                    <span className="share-button-text">Linkedin</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:?subject=Check out this analysis on Data Lab&body=Did you know the federal government invested over $149 billion in higher education? Check out this analysis and discover how much your Alma Mater received in federal funds!%0D%0A%0D%0ACheck out this site ${this.props.siteUrl}${this.props.pageUrl}`} title="Share via Email" data-id='5'>
                    <img src={images[5].src} style={images[5].style} className='icon-envelope'></img>
                    <span className="share-button-text">Email</span>
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default ShareMenu;