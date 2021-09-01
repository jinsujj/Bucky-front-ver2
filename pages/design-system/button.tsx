import Head from 'next/head';
import React from 'react';
import Button from '@/components/Button';
import styled from '@emotion/styled';

export default function DesignSysytemButtonPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Bucky | DesignSysytem Button </title>
        <meta name="description" content="Bucky | DesignSysytem" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title>Design System |Button </Title>
        <Subtitle>Size</Subtitle>
        <ButtonList>
          <Button size="xsmall">Xsmall</Button>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button size="xlarge">XLarge</Button>
        </ButtonList>
        <Subtitle>Colors</Subtitle>
        <ThirdTitle>Variant: default</ThirdTitle>
        <ButtonList>
          <Button color="default">Default Color</Button>
          <Button color="primary">Primary Color</Button>
          <Button color="secondary">Secondary Color</Button>
        </ButtonList>
        <ThirdTitle>Varaint: Contained</ThirdTitle>
        <ButtonList>
          <Button color="default" variant="contained">
            Default Color Contained
          </Button>
          <Button color="primary" variant="contained">
            Primary Color Contained
          </Button>
          <Button color="secondary" variant="contained">
            Secondary Color Contained
          </Button>
        </ButtonList>
        <ThirdTitle>Varaint: Outlined</ThirdTitle>
        <ButtonList>
          <Button color="default" variant="outlined">
            Default Color outlined
          </Button>
          <Button color="primary" variant="outlined">
            Primary Color outlined
          </Button>
          <Button color="secondary" variant="outlined">
            Secondary Color outlined
          </Button>
        </ButtonList>
        <ThirdTitle>Varaint: Text</ThirdTitle>
        <ButtonList>
          <Button color="default" variant="text">
            Default Color text
          </Button>
          <Button color="primary" variant="text">
            Primary Color text
          </Button>
          <Button color="secondary" variant="text">
            Secondary Color text
          </Button>
        </ButtonList>
      </main>
    </div>
  );
}

const Title = styled.h1`
  font-size: 40px;
`;

const Subtitle = styled.h2`
  font-size: 28px;
`;

const ThirdTitle = styled.h3`
  font-size: 20px;
`;

const ButtonList = styled.div`
  display: flex;
  button {
    margin: 0 12px;
  }
`;
