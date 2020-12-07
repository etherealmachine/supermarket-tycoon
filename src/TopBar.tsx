import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { css } from 'astroturf';

import { Context, } from './State';

const classes = css`
  .underline {
    text-decoration: underline;
  }
`;

const TopBar = (_props: {}) => {
  const state = useContext(Context);
  const phases = {
    'purchasing': 'Purchasing',
    'stocking': 'Stocking',
    'shopping1': 'Shopping',
    'restocking': 'Restocking',
    'shopping2': 'Shopping',
    'cleanup': 'Cleanup',
  };
  return <div className="d-flex form-inline bg-secondary text-white px-4">
    <div className="m-2">Round: {state.round}</div>
    <div className="m-2">Cash: ${state.cash}</div>
    <div className="d-flex align-items-center">
      {Object.entries(phases).map(([phase, name], i, a) => <span key={i}>
        <span className={classNames("m-2", { [classes.underline]: state.phase === phase })}>{name}</span>
        {i !== a.length - 1 && <FontAwesomeIcon icon={faArrowRight} />}
      </span>
      )}
      <button
        disabled={!state.canAdvancePhase()}
        className="m-2 btn btn-primary btn-sm"
        onClick={() => state.nextPhase()}>Next Phase</button>
    </div>
    <div className="ml-auto">
      <button disabled={!state.canUndo()} className="m-2 btn btn-light btn-sm" onClick={() => state.undo()}>Undo</button>
      <button className="m-2 btn btn-warning btn-sm" onClick={() => state.setup()}>New Game</button>
    </div>
  </div >;
}

export default TopBar;