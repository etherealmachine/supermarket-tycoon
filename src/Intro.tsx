import React from 'react';
import { css } from 'astroturf';

const classes = css`
  .licenseIcon {
    height: 50px;
    margin: 0 4px 0 4px;
  }
`;

const Intro = (_props: {}) => {
  return <div className="jumbotron d-flex flex-column mt-5 pb-2">
    <h1 className="display-4">Welcome to Supermarket Tycoon!</h1>
    <div className="d-flex flex-column">
      <p className="lead">Supermarket Tycoon is a simple one-player game of inventory management with a dash of luck.</p>
      <p className="lead">Handle purchasing, make your customers happy, and control waste to become the...</p>
      <p className="lead mx-auto font-weight-bold">Supermarket Tycoon!</p>
    </div>
    <hr className="my-4" style={{ width: "100%" }} />
    <div className="d-flex justify-content-center">
      <a className="btn btn-primary btn-lg mr-4" href={process.env.PUBLIC_URL + '/rules.pdf'} role="button">Download Rules</a>
      <a className="btn btn-success btn-lg" style={{ width: '200px' }} href="#/game" role="button">Play</a>
    </div>
    <div className="d-flex justify-content-center mt-5">
      <p>Copyright James Pettit, 2020</p>
    </div>
    <div className="d-flex justify-content-center">
      <img className={classes.licenseIcon} src={process.env.PUBLIC_URL + '/by-nc-sa.svg'} alt="License - Creative Commons BY NC SA" />
    </div>
    <div className="d-flex justify-content-center mt-3">
      <p>Supermarket Tycoon is a web-based implementation of Supermarché, Copyright Ryan Mayes, 2014</p>
    </div>
  </div>;
}

export default Intro;