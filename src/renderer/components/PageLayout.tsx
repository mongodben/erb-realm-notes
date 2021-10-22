import React from 'react';
import Header from './Header';

type Props = {
  children: React.ReactChild | React.ReactChild[];
};

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main> {children} </main>
    </>
  );
};

export default PageLayout;
