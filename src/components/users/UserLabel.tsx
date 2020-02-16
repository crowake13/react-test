import React from 'react';
import * as RENDER_LOG from '../../constants/render-log';
import withRenderLog from '../shared/withRenderLog';

export const UserLabel = ({ label }: { label: string }) => {
  return <h6 className="card-subtitle mb-2 text-muted">{label}</h6>;
};

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(UserLabel);
