import React, { useEffect } from 'react';

interface IWithRenderLogProps {
  greeting: string;
}

const withRenderLog = ({ greeting }: IWithRenderLogProps) => (
  WrappedComponent: any
) => {
  const WithDataFetching: React.FC<{
    [key: string]: any;
  }> = ({ renderLogMessage, ...rest }) => {
    useEffect(() => {
      console.log(
        `${renderLogMessage ?? greeting} ${WrappedComponent.name}`.trim()
      );
    });

    return <WrappedComponent {...rest} />;
  };

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return process.env.NODE_ENV === 'production'
    ? WrappedComponent
    : WithDataFetching;
};

export default withRenderLog;
