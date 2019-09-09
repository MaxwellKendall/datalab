import React, { useEffect } from 'react';
import * as $ from "jquery";
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import { StaticQuery, graphql } from 'gatsby';
import axios from 'axios';


class Mapbox extends React.Component {
  constructor(props) {
    super(props);

    const query = StaticQuery(graphql`
query whateverQuery {
dataJson {
features {
properties 
}
}
}
`);

    this.state = {
      data: query,
    };

    const mapStyle = {
      position: 'relative',
      border: '1px solid #ddd',
      borderRadius: '0.25rem',
      marginLeft: '2rem',
      marginRight: '2rem',
      top: '0',
      bottom: '0',
      width: '100%',
      height: '600px',
    };
  };



  createMap() {
    let map = new mapboxgl.Map({
      container: 'collegesMap', // container id
      style: 'mapbox://styles/usaspending/cjvduv2b7fwlc1fnv9iyihkqo', // stylesheet location
      center: [-80.59179687498357, 40.66995747013945], // usa
      zoom: 3 // starting zoom (3 default)
    });

    map.on('load', function() {
      $.getJSON('../../data-lab-data/CU/updated_CU_data/CU_mapbox_v2.geojson', function(data) {

//	renderAllSchools(); // populate sidebar with list of all schools

	map.scrollZoom.disable(); // disable until we click on the map

	// hide on "clickout" of element
	$(document).click(function (e) {
	  if ($(e.target).parents("#collegesMap").length === 0) {
	    map.scrollZoom.disable(); // disable until we click on the map
	  }
	});

	map.addSource('schools', {
	  type: 'geojson',
	  data: data,
	  cluster: true,
	  clusterMaxZoom: 7,
	  clusterRadius: 75 // 50 is default look into tweaking this
	});

	map.addLayer({
	  id: 'clusters',
	  type: 'circle',
	  source: 'schools',
	  filter: ['has', 'point_count'],
	  paint: {
	    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
	    // with three steps to implement three types of circles:
	    //   * Blue, 20px circles when point count is less than 100
	    //   * Yellow, 30px circles when point count is between 100 and 750
	    //   * Pink, 40px circles when point count is greater than or equal to 750
	    "circle-stroke-color": '#ddd',
	    "circle-color": [
	      "step",
	      ["get", "point_count"],
	      "#881E3D",
	      100,
	      "#881E3D",
	      400,
	      "#881E3D"
	    ],
	    "circle-radius": [
	      "step",
	      ["get", "point_count"],
	      9,
	      15,
	      20,
	      30,
	      15,
	      50,
	      20,
	      75,
	      30,
	      300,
	      40
	    ]
	  }
	});

	// set opactiy to 40%
	map.setPaintProperty('clusters', 'circle-opacity', .35);
	
	map.addLayer({
	  id: "cluster-count",
	  type: "symbol",
	  source: "schools",
	  filter: ["has", "point_count"],
	  layout: {
	    "text-field": "{point_count_abbreviated}",
	    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
	    "text-size": 10
	  }
	});

	map.loadImage('../images/C&U/map-pin.png', function(err, image) {
	  if (err) throw err;
	  map.addImage('pin', image);
	  map.addLayer({
	    id: "unclustered-point",
	    type: "symbol",
	    source: "schools",
	    layout: {
	      "icon-image": 'pin',
	      "icon-size": .6
	    },
	    filter: ["!", ["has", "point_count"]]
	  });
	});

	map.on('click', 'clusters', function (e) {
	  const cluster = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
	  const coordinates = cluster[0].geometry.coordinates;
	  flyIntoCluster(map, coordinates);
	});

	// if we click on the map then we can scroll
	map.on('click', function(){
	  map.scrollZoom.enable();
	});

	map.on('mouseenter', 'clusters', function () {
	  map.getCanvas().style.cursor = 'pointer';
	});
	map.on('mouseleave', 'clusters', function () {
	  map.getCanvas().style.cursor = '';
	});

	function flyIntoCluster(map, coordinates) {
	  const maxZoom = map.getZoom() + 1.5; // goin innn

	  map.flyTo({
	    // These options control the ending camera position: centered at
	    // the target, at zoom level 16, and north up.
	    center: coordinates,
	    zoom: maxZoom,
	    bearing: 0,

	    // These options control the flight curve, making it move
	    // slowly and zoom out almost completely before starting
	    // to pan.
	    speed: 1, // make the flying slow
	    curve: 1, // change the speed at which it zooms out
	  });
	}

	map.on('mouseenter', 'unclustered-point', function(e) {
	  // Change the cursor style as a UI indicator.
	  map.getCanvas().style.cursor = 'pointer';
	  
	  let coordinates = e.features[0].geometry.coordinates.slice();
	  let name = e.features[0].properties.Recipient;
	  let state = e.features[0].properties.State;
	  let fedInvest = formatCurrency(e.features[0].properties.Total_Federal_Investment);
	  let county = e.features[0].properties.COUNTY;
	  let numStudents = numberWithCommas(e.features[0].properties.Total);

	  let tooltipHtml = `<div class='tooltip-float'><p class='map-tooltip-p-left-inst'>Institution</p> <p class='map-tooltip-p-right'>${name}</p></div> <div class='tooltip-float'><p class='map-tooltip-p-left'>State</p> <p class='map-tooltip-p-right'>${state}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>County</p> <p class='map-tooltip-p-right'>${county}</p></div><div class='tooltip-float tooltip-float--underline'><p class='map-tooltip-p-left'>Number of Students </p> <p class='map-tooltip-p-right'>${numStudents}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>Total $ Received</p><p class='map-tooltip-p-right-invest'>${fedInvest}</p></div>`;


	  // Ensure that if the map is zoomed out such that multiple
	  // copies of the feature are visible, the popup appears
	  // over the copy being pointed to.
	  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	  }
	  
	  // Populate the popup and set its coordinates
	  // based on the feature found.
	  tooltip.setLngLat(coordinates)
	    .setHTML(tooltipHtml)
	    .addTo(map);
	});

	// duplicate with "click" for mobile register
	map.on('click', 'unclustered-point', function(e) {
	  // Change the cursor style as a UI indicator.
	  map.getCanvas().style.cursor = 'pointer';
	  
	  let coordinates = e.features[0].geometry.coordinates.slice();
	  let name = e.features[0].properties.Recipient;
	  let state = e.features[0].properties.State;
	  let fedInvest = formatCurrency(e.features[0].properties.Total_Federal_Investment);
	  let county = e.features[0].properties.COUNTY;
	  let numStudents = numberWithCommas(e.features[0].properties.Total);

	  let tooltipHtml = `<div class='tooltip-float'><p class='map-tooltip-p-left-inst'>Institution</p> <p class='map-tooltip-p-right'>${name}</p></div> <div class='tooltip-float'><p class='map-tooltip-p-left'>State</p> <p class='map-tooltip-p-right'>${state}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>County</p> <p class='map-tooltip-p-right'>${county}</p></div><div class='tooltip-float tooltip-float--underline'><p class='map-tooltip-p-left'>Number of Students </p> <p class='map-tooltip-p-right'>${numStudents}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>Total $ Received</p><p class='map-tooltip-p-right-invest'>${fedInvest}</p></div>`;

	  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	  }

	  tooltip.setLngLat(coordinates)
	    .setHTML(tooltipHtml)
	    .addTo(map);
	});


	map.on('mouseleave', 'unclustered-point', function() {
	  map.getCanvas().style.cursor = '';
	  tooltip.remove();
	});

	map.on('click', 'schools', function(e) {
	  let features = map.queryRenderedFeatures(e.point, { layers: ['clusters']});
	  let clusterId = features[0].properties.cluster_id;
	  map.getSource('schools').getClusterExpansionZoom(clusterId, function(err, zoom){
	    if (err) return;
	    map.easeTo({
	      center: features[0].geometry.coordinates,
	      zoom: zoom
	    });
	  });
	});

	// click for righthand panel
	map.on('click', 'unclustered-point', function(e) {
	  if ($(window).width() > 949) {
	    instmap.activateDetail(e.features[0].properties);
	  }
	});
	
      }); // end getjson (get map function)
    }); // end of map on load

    // filter overlay section //
    let mapDiv = $('#collegesMap');
    let almaTable = $('#alma-mater-table');
    let listingEl = $('.map-search__list');
    let mobileListingEl = $('.map-search__list--mobile');

    // helper function, sort json //
    function sortByKey(array, key) {
      return array.sort(function(a, b) {
	let x = a[key]; let y = b[key];
	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }

    function renderAllSchools() {
      // Add zoom and rotation controls to the map.
      let zoomCtrl = new mapboxgl.NavigationControl();
      map.addControl(zoomCtrl, 'top-right');

      // Create a popup, but don't add it to the map yet.
      let tooltip = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: true,
      });

      $.getJSON('../../../data/mapbox_data.geojson', function(data) { 

	let geoandname = data.features.map(function (ele) {
	  return {
	    coord: ele.geometry,
	    name: ele.properties.Recipient,
	    fedInvest: formatCurrency(ele.properties.Total_Federal_Investment),
	    instType: ele.properties.INST_TYPE_1,
	    yearType: ele.properties.INST_TYPE_2,
	    state: ele.properties.State,
	    county: ele.properties.COUNTY,
	    numStudents: numberWithCommas(ele.properties.Total),
	  };
	});

	let sortedGeoandName = sortByKey(geoandname, 'name');

	// mobile search //
	sortedGeoandName.forEach(function(ele) {
	  let mobileListitem = document.createElement('li');
	  mobileListitem.classList.add('map-search__item--mobile');
	  mobileListitem.textContent = ele.name;

	  mobileListingEl.append(mobileListitem);

	  mobileListitem.addEventListener('click', function() {
	    let that = this;
	    let mobileMatched = geoandname.filter(function(ele) {
	      return that.textContent === ele.name;
	    });
	    let mobileTooltip = `<div class='tooltip-float'><p class='map-tooltip-p-left-inst'>Institution</p> <p class='map-tooltip-p-right'>${mobileMatched[0].name}</p></div> <div class='tooltip-float'><p class='map-tooltip-p-left'>State</p> <p class='map-tooltip-p-right'>${mobileMatched[0].state}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>County</p> <p class='map-tooltip-p-right'>${mobileMatched[0].county}</p></div><div class='tooltip-float tooltip-float--underline'><p class='map-tooltip-p-left'>Number of Students </p> <p class='map-tooltip-p-right'>${mobileMatched[0].numStudents}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>Total $ Received</p><p class='map-tooltip-p-right-invest'>${mobileMatched[0].fedInvest}</p></div>`;
	    map.easeTo({
	      center: mobileMatched[0].coord.coordinates,
	      zoom: 12
	    });
	    tooltip.setLngLat(mobileMatched[0].coord.coordinates)
	      .setHTML(mobileTooltip)
	      .addTo(map);


	    $("#map-search-ul--mobile").hide(); // hide mobile search list
	  });
	});

	// tablet and desktop search //
	sortedGeoandName.forEach(function(ele) {
	  let listitem = document.createElement('li');
	  listitem.classList.add('map-search__item');
	  listitem.textContent = ele.name;
	  listitem.addEventListener('click', function() {
	    let that = this;
	    let matched = geoandname.filter(function(ele) {
	      return that.textContent === ele.name;
	    });
	    let tooltipHtml = `<div class='tooltip-float'><p class='map-tooltip-p-left-inst'>Institution</p> <p class='map-tooltip-p-right'>${matched[0].name}</p></div> <div class='tooltip-float'><p class='map-tooltip-p-left'>State</p> <p class='map-tooltip-p-right'>${matched[0].state}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>County</p> <p class='map-tooltip-p-right'>${matched[0].county}</p></div><div class='tooltip-float tooltip-float--underline'><p class='map-tooltip-p-left'>Number of Students </p> <p class='map-tooltip-p-right'>${matched[0].numStudents}</p></div><div class='tooltip-float'><p class='map-tooltip-p-left'>Total $ Received</p><p class='map-tooltip-p-right-invest'>${matched[0].fedInvest}</p></div>`;
	    map.easeTo({
	      center: matched[0].coord.coordinates,
	      zoom: 12
	    });
	    tooltip.setLngLat(matched[0].coord.coordinates)
	      .setHTML(tooltipHtml)
	      .addTo(map);
	  });
	  listingEl.append(listitem);
	});
	
      });
    } // render all schools end()
    

    $('#map-table-trigger').click(function(){
      mapDiv.hide(); // hide map
      almaTable.show(); // show table
    });

    $('#map-chart-trigger').click(function(){
      mapDiv.show();
      almaTable.hide();
    });

    $('#refresh-div').click(function(){
      map.flyTo({
	center: [-80.59179687498357, 40.66995747013945],
	zoom: 3,
	bearing: 0,
	speed: 1,
	curve: 1,
      });
      tooltip.remove();
      $('.map-detail').removeClass('map-detail--active');
    });

    // when the map first loads all resources!


    renderAllSchools.bind(this)();
  }; // end function (createMapbox)


  componentDidMount() {
    console.log('mounted');
//    console.log(this.state.data);
    mapboxgl.accessToken = `${process.env.GATSBY_MAPBOX_API_KEY}`;
    this.createMap(); // this is running inside functions as well
    
  };

  render() {
    return(
	<div id="collegesMap" style={{width: '100%', height: 600, position: 'relative', borderRadius: '.25rem', border: '1px solid #ddd'}}></div>
    );
  };
};

export default Mapbox;
