import React from "react";
import "../../styles/index.scss";

import Accordion from "../../components/accordion/accordion";
import StoryHeading from "../../components/section-elements/story-heading/story-heading";
import Downloads from "../../components/section-elements/downloads/downloads";
import Mapbox from "../../components/visualizations/mapbox/mapbox";
import GeoDataMapbox from '../../unstructured-data/mapbox/mapData.json';

const Institutions = () => {

  const defaultImageStyle = {
    marginBottom: "1rem"
  };

  return (
    <>
      <StoryHeading
        number={'02'}
        title={'My Alma Mater'}
        teaser={['Find how much your Alma Mater ', <span className="heading--red">received in federal funds.</span>] }
        blurb={`The federal government may have invested in your college or university, whether it is public, private, four year, or two year. Use the map below to uncover the amount and type of investment for individual schools. Click on a regional cluster to expand the area and see the schools in that area. `}
      />

      <Accordion
        title="Accordion Title">
        <p>I am an accordion with lots to say.</p>
        <p>I have several paragraphs...</p>
        <p>I have several paragraphs...</p>
      </Accordion>

      <div>
	<Mapbox data={GeoDataMapbox}/>
      </div>
      
      <Downloads
        href={'assets/js/colleges-and-universities/download-files/Agency_Section_Download.csv'}
        date={'March 2019'}
      />
    </>

  );
};


export default Institutions;

