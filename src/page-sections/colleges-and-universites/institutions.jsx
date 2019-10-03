import React from "react";
import "../../styles/index.scss";
import { graphql, useStaticQuery } from "gatsby";

/* components */
import Accordion from "../../components/accordion/accordion";
import StoryHeading from "../../components/section-elements/story-heading/story-heading";
import Downloads from "../../components/section-elements/downloads/downloads";
import defaultImage from "../../images/default-image.jpg";
import Mapbox from "../../components/visualizations/mapbox/mapbox";
import ShareMenu from '../../components/share-menu/share-menu';

const Institutions = () => {

   // 	const _data = useStaticQuery(graphql`
   // 	query {
   // 				 allGeoFeature {
   // 				 nodes {
   // 					 featureFields {
   // 						 Total
   // 						 Basketball
   // 						 research_grants_received
   // 						 subsidized18
   // 						 Undergrad
   // 						 INSTURL
   // 						 grants_received
   // 					 }
   // 					 geometry {
   // 						 type
   // 						 coordinates
   // 					 }
   // 				 }
   // 			 }
   // 	 }
   // `);

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
            <a href="https://datalab.usaspending.gov">...and a link to the Data Lab</a>
	    </Accordion>

{/* 		<ShareMenu siteUrl='https://datalab-dev.usaspending.gov/' pageUrl='colleges-and-universities' 
			twitter='Did you know the federal government invested over $149 billion in higher education? Check out this analysis and discover how much your Alma Mater received in federal funds! #DataLab #Treasury #DataTransparency #USAspending' 
			facebook='' reddit='' linkedin='' tumblr='' email=''/>
 */}
	    <div className="container" style={defaultImageStyle}>
		<Mapbox/>
	    </div>
	    
	    <Downloads
        href={'assets/js/colleges-and-universities/download-files/Agency_Section_Download.csv'}
        date={'March 2019'}
	    />
	    </>

    );
}


export default Institutions;
