import React from 'react';
import './404.scss';

import HeaderOnly from '../components/layouts/header-only/header-only';
import SEO from '../components/seo';

// separate url from querystring (if any) and strip "[index].html" to redirect
const splitUrl = href => {
  const urlFrags = href.split('?');
  if (urlFrags[0].slice(-1) == '/') {
    urlFrags[0] = urlFrags[0].slice(0, -1);
  }
  if (urlFrags[0].slice(-5) == '.html') {
    urlFrags[0] = urlFrags[0].slice(0, -5);
  }
  if (urlFrags[0].slice(-6) == '/index') {
    urlFrags[0] = urlFrags[0].slice(0, -6);
  }
  return urlFrags;
};

const afgTranslation = old => {
  const start = '/americas-finance-guide/';
  if (old === '') return start;
  if (old === 'revenue') return start + 'revenue-and-gdp';
  if (old === 'revenue/categories') return start + 'revenue-categories';
  if (old === 'revenue/trends') return start + 'revenue-trends';
  if (old === 'revenue/country-comparison') return start + 'revenue-country-comparison';
  if (old === 'spending') return start + 'spending-and-gdp';
  if (old === 'spending/categories') return start + 'spending-categories';
  if (old === 'spending/trends') return start + 'spending-trends';
  if (old === 'spending/country-comparison') return start + 'spending-country-comparison';
  if (old === 'deficit') return start + 'explore-deficit';
  if (old === 'deficit/trends') return start + 'deficit-trends';
  if (old === 'deficit/country-comparison') return start + 'deficit-country-comparison';
  if (old === 'debt') return start + 'explore-debt';
  if (old === 'debt/trends') return start + 'debt-trends';
  if (old === 'debt/analysis') return start + 'debt-analysis';
  if (old === 'debt/country-comparison') return start + 'debt-country-comparison';
  return ''; // AFG path not found; genuine 404
};

const NotFoundPage = () => {

  // check for Jekyll links, redirect if possible
  if (typeof window !== 'undefined') {
    let urlFrags;
    if (window.location.href.indexOf('.html') > -1) {
      urlFrags = splitUrl(window.location.href);

      let afg;
      if ((afg = urlFrags[0].indexOf('/americas-finance-guide/')) > -1) { // AFG pages have moved; can't simply strip ".html"
        window.location = (afgTranslation(urlFrags[0].slice(afg + 24)) + (urlFrags[1] ? '?' + urlFrags[1] : ''));
        return <></>;
      }
      window.location = urlFrags[0] + (urlFrags[1] ? '?' + urlFrags[1] : '');
      return <></>;

    } else {
      return (
        <HeaderOnly _containerClass='four-oh-four' _headerClass='four-oh-four__header'>
          <SEO title='404: Not found' />
          <div id='four-oh-four'>
            <div className='four-container'>
              <h1>Oops!</h1>
              <h4>Looks like you got lost in the data.
            <div><span>It happens.</span> Find your way back.</div>
              </h4>
              <div id='btn-container'>
                <div id='back-btn'><a href='/'>BACK</a></div>
                <div id='home-btn'><a href='/'>HOME</a></div>
              </div>
            </div>
          </div>
        </HeaderOnly>
      );
    }
  } else {
    return <></>;
  }
}

export default NotFoundPage;
