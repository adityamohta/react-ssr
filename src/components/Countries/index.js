import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCountries } from "../../actions/countries";
import { Loading } from '../../common';
import CountriesItem from './CountriesItem';
import {Helmet} from "react-helmet";

const m = ({ countries }) => ({ countries });


@connect(m, { fetchCountries })
export default class Countries extends Component {

  static fetching ({ dispatch }) {
    return [dispatch(fetchCountries())];
  }

  componentDidMount() {
    this.props.fetchCountries();
  }


  render() {
    const { countries: { isFetching, data } } = this.props;

    if(isFetching) {
      return <Loading />
    }

    return(
      <div className="container">
          <Helmet>
              <meta charSet="utf-8" />
              <title>Health Factorial</title>
              <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
        <div className="countries-container">
          {data.map((item, i) => <CountriesItem key={i} {...item} />)}
        </div>
      </div>
    );
  }
};