import React, { useEffect } from 'react';

let counterHashMap = new Map<string, number>();

interface IWithRenderLogProps {
  greeting: string;
}

const withRenderLog = ({ greeting }: IWithRenderLogProps) => (
  WrappedComponent: any
) => {
  const WithRenderLog: React.FC<{
    [key: string]: any;
  }> = ({ renderLogMessage, ...rest }) => {
    useEffect(() => {
      counterHashMap.set(
        WrappedComponent.name,
        (counterHashMap.get(WrappedComponent.name) ?? 0) + 1
      );
      console.log(
        `${counterHashMap.get(WrappedComponent.name)} ${renderLogMessage ??
          greeting} ${WrappedComponent.name}`.trim()
      );
    });

    return <WrappedComponent {...rest} />;
  };

  WithRenderLog.displayName = `WithRenderLog(${WrappedComponent.name})`;

  return process.env.NODE_ENV === 'production'
    ? WrappedComponent
    : WithRenderLog;
};

export default withRenderLog;
