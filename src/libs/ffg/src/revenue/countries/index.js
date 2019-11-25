import { loadSourceData } from './data';
import { chartInit } from './chart';
import CountryData from '../../../../assets/ffg/data/revenue_country_comparison.csv';
import colors from '../../globalSass/colors.scss';
import Mapping from '../../../../_data/object_mapping.yml';

const incomeConfig = {
    amountField: 'revenue_usd',
    gdpField: 'revenue_gdp',
    amountLabel: 'Revenue',
    sourceFields: ['revenue_source','gdp_source'],
    chapter: 'revenue',
    primaryColor: colors.revenuePrimary,
    defaultCountries: [{
        display: 'United States',
        plainName: 'United States'
    },{
        display: 'China',
        plainName: 'China'
    },{
        display: 'Japan',
        plainName: 'Japan'
    },{
        display: 'Germany',
        plainName: 'Germany'
    },{
        display: 'United Kingdom',
        plainName: 'United Kingdom'
    },{
        display: 'India',
        plainName: 'India'
    },{
        display: 'France',
        plainName: 'France'
    }],
    accessibilityAttrs : {
        title: 'Federal Revenue Country Comparison',
        desc: `The top five countries in terms of federal revenue in ${Mapping.country_compare_year.value} were the United States with ${Mapping.current_fy_revenue.value} (${Mapping.compare_us_revenue_gdp.value} of its gross domestic product), China with $2.6 trillion (22%), Japan with $1.7 trillion (34%), Germany with $1.6 trillion (43%), and France with $1.4 trillion (56%).`
    }
};

loadSourceData(CountryData);
chartInit(incomeConfig);