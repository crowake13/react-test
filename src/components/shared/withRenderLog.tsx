import React, { useEffect } from 'react';

interface IWithRenderLogProps {
  greeting: string;
}

const withRenderLog = ({ greeting }: IWithRenderLogProps) => (
  WrappedComponent: React.FC
) => {
  const WithDataFetching: React.FC<{
    [key: string]: string;
  }> = ({ renderLogMessage, ...rest }) => {
    useEffect(() => {
      console.log(
        `${renderLogMessage ?? greeting} ${WrappedComponent.name}`.trim()
      );
    });

    return <WrappedComponent {...rest} />;
  };

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;
};

export default withRenderLog;
