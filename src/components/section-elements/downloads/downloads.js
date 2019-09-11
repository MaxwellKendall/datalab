import React from 'react';
import "./downloads.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from "@fortawesome/free-solid-svg-icons"

const Downloads = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-offset-1 col-xs-10 end-xs">
          <div className="download">
            <span className='download--faded'>Updated as of {props.date} / </span>
            <a className="download__data"
               href={props.href}>
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Downloads;