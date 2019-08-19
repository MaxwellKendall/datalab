import React from 'react';
import './site-footer.scss';
// import logo from '../../images/index/dl-logo-grey.svg';
import Logo from '../../components/logo/logo';

/* <script>
  function trackLinkClick(actionName) {
          window.Analytics.event({
              category: 'Footer - Click Link',
              action: actionName
      });
  }

  function leaveSiteLink(outbound) {
          document.querySelector('#leave-modal .redirect-modal__link a').href = outbound;
          document.querySelector('#leave-modal .redirect-modal__link a').innerHTML = outbound;
          document.getElementById('leave-modal').style.display = 'block';
  }
</script> */

const SiteFooter = (props) => (
  // <img src={logo} alt='Logo' />
  // <object type="image/svg+xml" data={logo} className="logo-footer">Datalab logo</object>
  <Logo fillColor="#666" />

//   <div class="dl-footer__section dl-footer__divider">

//     <div class="dl-footer__group-title">Contact Us</div>
//     <p>
//       For media inquiries or questions<br> on Data Lab activities or operations,<br> please contact our Legislative<br> and Public Affairs Office:
//     </p>
//     <p>
//       E: media.relations@fiscal.treasury.gov
//     </p>
//   </div>

//   <div class="dl-footer__section dl-footer__divider">

//     <div class="dl-footer__group-title">Mailing List</div>
//     <p>
//       To join our mailing list, send a<br> blank email with no subject to:<br> <a class="community-page-link" href="mailto: datalab@lists.fiscal.treasury.gov">datalab@lists.fiscal.treasury.gov</a>
//     </p>
//     <div class="dl-footer__group-title">Join the Conversation</div>
//     <p>
//       Visit our  <a onclick="leaveSiteLink('https://usaspending-help.zendesk.com/hc/en-us/community/topics'); trackLinkClick('Send Feedback'); return false;" href="https://usaspending-help.zendesk.com/hc/en-us/community/topics" class="community-page-link">Community Page today.</a>
//     </p>

//   </div>
  

//   <div class="dl-footer__social">
//     <div class="dl-footer__group-title">Connect With Us</div>
//     <div class="dl-footer__social-items">
//       <a onclick="trackLinkClick('GitHub')" target="_blank" rel="noopener noreferrer" aria-labelledby="Github-icon-title" href="https://github.com/fedspendingtransparency/datalab">
//         {% include svgs/github-footer.svg %}
//       </a>

//       <a onclick="trackLinkClick('Data World')" target="_blank" rel="noopener noreferrer" aria-labelledby="DataWorld-icon-title" href="https://data.world/usaspending">
//         {% include svgs/data-world.svg %}
//       </a>

//       <a onclick="trackLinkClick('Twitter')" target="_blank" rel="noopener noreferrer" aria-labelledby="Twitter-icon-title" href="https://twitter.com/fiscalservice">
//         {% include svgs/twitter-footer.svg %}
//       </a>

//       <a onclick="trackLinkClick('Facebook')" target="_blank" rel="noopener noreferrer" aria-labelledby="Facebook-icon-title" href="https://www.facebook.com/pg/fiscalservice">
//         {% include svgs/facebook-footer.svg %}
//       </a>

//       <a onclick="trackLinkClick('Linkedin')" target="_blank" rel="noopener noreferrer" aria-labelledby="LinkediIn-icon-title" href="https://www.linkedin.com/company/united-states-department-of-the-treasury-bureau-of-public-debt">
//         {% include svgs/linkedin-footer.svg class="" %}
//       </a>
//     </div>
//   </div>

// <footer id="footer">
//     <div>
//       &copy; 2018 USAspending.gov |&nbsp;
//       <a href="https://www.usaspending.gov/#/about/accessibility">Accessibility</a> |&nbsp;
//       <a href="https://www.usaspending.gov/#/about/privacy">Privacy Policy</a> |&nbsp;
//       <a href="https://www.usaspending.gov/#/about/foia">Freedom of Information Act</a>
//   </div>
//     <div class="footer-important-info">
//       <b>NOTE:</b> <a href="https://beta.usaspending.gov/#/db_info">You must click here for very important D&B information.</a>
//   </div>
// </footer>
)

export default SiteFooter;
