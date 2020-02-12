import React from 'react';
import withRenderLog from '../components/shared/withRenderLog';
import * as RENDER_LOG from '../constants/render-log';

const LoginPage = () => <div>login</div>;

export default withRenderLog({ greeting: RENDER_LOG.GREETING })(LoginPage);
