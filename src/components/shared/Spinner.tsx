import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import withRenderLog from './withRenderLog';

const Spinner = () => <div>spinner</div>;

export default process.env.NODE_ENV === 'production'
  ? Spinner
  : withRenderLog({ greeting: RENDER_LOG.GREETING })(Spinner);
