import { Spinner } from '@chakra-ui/react';
import cx from 'classnames';
import { Fragment, ReactNode } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

import styles from './custom-session-auth.module.scss';

export interface ICustomSessionAuthProps {
  children: ReactNode;
}

// Sessions with client components
export default function CustomSessionAuth(props: ICustomSessionAuthProps) {
  const { children } = props;
  const session = useSessionContext();

  // TODO: [UX] Get a fallback component as a prop, so that we can have page wise skeletons in place.
  if (session.loading) {
    return (
      <div className={cx(styles['d-container'])}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </div>
    );
  }

  if (session.doesSessionExist === false) {
    return <div>Session does not exist</div>;
  }
  console.log('Client side component got userId: ', session.userId);
  return <Fragment>{children}</Fragment>;
}
