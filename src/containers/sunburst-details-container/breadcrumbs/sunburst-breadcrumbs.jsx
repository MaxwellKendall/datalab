import React from "react";
import style from './sunburst-breadcrumbs.module.scss';
import PropTypes from "prop-types";

const SunburstBreadcrumbs = (props) => {

  return <>
    <div className={style.breadcrumbsContainer}>
      <span>{props.items.agency}&nbsp;</span>

      {props.items.subagency &&
        <span className={style.breadcrumb}>&nbsp;{props.items.subagency}&nbsp;</span>
      }

      {props.items.recipient &&
        <span className={style.breadcrumb}>&nbsp;{props.items.recipient}</span>
      }
    </div>
  </>
}

export default SunburstBreadcrumbs;

SunburstBreadcrumbs.propTypes = {
  items: PropTypes.object
};