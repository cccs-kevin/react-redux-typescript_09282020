import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';

import { ToolHeaderMemo as ToolHeader } from './ToolHeader';
import { ToolFooterMemo as ToolFooter } from './ToolFooter';

export type CarToolLayoutProps = {
  children: ReactNode;
};

function CarToolHeader() {
  return <ToolHeader headerText="Car Tool" />;
}
function CarToolFooter() {
  return <ToolFooter companyName="A Cool Company, Inc." />;
}

export function CarToolLayout({ children }: CarToolLayoutProps) {
  return (
    <Grid container direction="column">
      <Grid item component={CarToolHeader} />
      <Grid item component="main">
        {children}
      </Grid>
      <Grid item component={CarToolFooter} />
    </Grid>
  );
}
