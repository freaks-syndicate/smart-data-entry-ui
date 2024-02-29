import { Fragment, ReactNode } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

export interface ICustomSessionAuthProps {
  children: ReactNode;
}

// Sessions with client components
export default function CustomSessionAuth(props: ICustomSessionAuthProps) {
  const { children } = props;
  const session = useSessionContext();

  if (session.loading) {
    return <div>Loading...</div>;
  }

  if (session.doesSessionExist === false) {
    return <div>Session does not exist</div>;
  }
  console.log('Client side component got userId: ', session.userId);
  return <Fragment>{children}</Fragment>;
}
