import React from 'react';
import pageFooterStyles from './page.module.scss';

import { Grid } from '@material-ui/core';
import DataLab from '../logos/datalab';
import Github from '../logos/github';
import Dataworld from '../logos/dataworld';
import Twitter from '../logos/twitter';
import Facebook from '../logos/facebook';
import LinkedIn from '../logos/linkedin';

/* record events in Google Analytics (later)
<script>
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
</script>
*/

export default class PageFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () =>
    <div className={pageFooterStyles.pageFooter}>
      <Grid container className={pageFooterStyles.content}>
        <Grid item xs={12} lg={3} className={pageFooterStyles.logo}>
          <DataLab fillColor='#666' />
        </Grid>
        <Grid item xs={12} lg={3}>
          <div className={pageFooterStyles.title}>Contact Us</div>
          <p>For general inquiries or questions on Data Lab activities or operations, please contact:
            <a href='mailto: usaspending.help@fiscal.treasury.gov?subject=Data Lab - Contact Us' rel='noopener noreferrer'>
              <br /><br />
              E: usaspending.help@fiscal.treasury.gov
            </a>
          </p>
        </Grid>
        <Grid item xs={12} lg={3}>
          <div className={pageFooterStyles.title}>Mailing List</div>
          <p>
            To join our mailing list, send a blank email with no subject to:{' '}
            <a href='mailto: datalab@lists.fiscal.treasury.gov' rel='noopener noreferrer'>datalab@lists.fiscal.treasury.gov</a>
          </p>
          <div className={pageFooterStyles.title}>Join the Conversation</div>
          <p>
            Visit our <a href='https://usaspending-help.zendesk.com/hc/en-us/community/topics' target='_blank' rel='noopener noreferrer'>Community Page today.</a>
          </p>
        </Grid>
        <Grid item xs={12} lg={3} className={pageFooterStyles.social}>
          <div className={pageFooterStyles.contents}>
            <div className={pageFooterStyles.title}>Connect With Us</div>
            <a><Github /></a>
            <a><Dataworld /></a>
            <a><Twitter /></a>
            <a><Facebook /></a>
            <a><LinkedIn /></a>
          </div>
        </Grid>
      </Grid>
    </div>
    ;









  // <div className={pageFooterStyles.pageFooter}>
  //   <div className={pageFooterStyles.content}>
  //     <div className={`${pageFooterStyles.flexItem} ${pageFooterStyles.logo}`}>
  //       <DataLab fillColor='#666' />
  //     </div>
  //     <div className={pageFooterStyles.flexItem}>
  //       <div className={pageFooterStyles.title}>Contact Us</div>
  //       <p>For general inquiries or questions on Data Lab activities or operations, please contact:</p>
  //       <p><a href='mailto: usaspending.help@fiscal.treasury.gov?subject=Data Lab - Contact Us' rel='noopener noreferrer'>
  //         E: usaspending.help@fiscal.treasury.gov
  //       </a></p>
  //     </div>
  //     <div className={pageFooterStyles.flexItem}>
  //       <div className={pageFooterStyles.title}>Mailing List</div>
  //       <p>
  //         To join our mailing list, send a blank email with no subject to:{' '}
  //         <a href='mailto: datalab@lists.fiscal.treasury.gov' rel='noopener noreferrer'>datalab@lists.fiscal.treasury.gov</a>
  //       </p>
  //       <div className={pageFooterStyles.title}>Join the Conversation</div>
  //       <p>
  //         Visit our <a href='https://usaspending-help.zendesk.com/hc/en-us/community/topics' target='_blank' rel='noopener noreferrer'>Community Page today.</a>
  //         {/* <a onclick='leaveSiteLink('https://usaspending-help.zendesk.com/hc/en-us/community/topics'); trackLinkClick('Send Feedback'); return false;' href='https://usaspending-help.zendesk.com/hc/en-us/community/topics'> */}
  //       </p>
  //     </div>
  //     <div className={`${pageFooterStyles.flexItem} ${pageFooterStyles.socialLogos}`}>
  //       <div className={pageFooterStyles.floatBottom}>
  //         <div>
  //           <div className={pageFooterStyles.title}>Connect With Us</div>
  //           <div>
  //             {/* <a onclick='trackLinkClick('GitHub')' target='_blank' rel='noopener noreferrer' aria-labelledby='Github-icon-title' href='https://github.com/fedspendingtransparency/datalab'> */}
  //             <a><Github /></a>
  //             {/* <a onclick='trackLinkClick('Data World')' target='_blank' rel='noopener noreferrer' aria-labelledby='DataWorld-icon-title' href='https://data.world/usaspending'> */}
  //             <a><Dataworld /></a>
  //             {/* <a onclick='trackLinkClick('Twitter')' target='_blank' rel='noopener noreferrer' aria-labelledby='Twitter-icon-title' href='https://twitter.com/fiscalservice'> */}
  //             <a><Twitter /></a>
  //             {/* <a onclick='trackLinkClick('Facebook')' target='_blank' rel='noopener noreferrer' aria-labelledby='Facebook-icon-title' href='https://www.facebook.com/pg/fiscalservice'> */}
  //             <a><Facebook /></a>
  //             {/* <a onclick='trackLinkClick('Linkedin')' target='_blank' rel='noopener noreferrer' aria-labelledby='LinkediIn-icon-title' href='https://www.linkedin.com/company/united-states-department-of-the-treasury-bureau-of-public-debt'> */}
  //             <a><LinkedIn /></a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}
