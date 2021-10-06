import styled from '@emotion/styled';
import NextLink from 'next/link';

/**
 * todo
 * 1. 한글, 영문 타입에 따라서 font-family 및 style 가능하도록 수정
 * 2. hover style 입히기 -> 나중에
 */

interface Site {
  isMobile?: boolean;
  label?: string;
  title: string;
  link?: string;
  titleType?: string;
}

const helpSiteMain: Site[] = [
  {
    label: 'contact',
    title: 'ask@bucky.co.kr',
    link: 'mailto:ask@bucky.co.kr',
  },
  {
    label: 'sns',
    title: 'instagram',
    link: 'https://www.instagram.com/bucky.co.kr/',
  },
  {
    title: 'FAQ',
    link: '',
  },
  {
    label: '',
    title: '이용약관',
    link: '',
  },
  {
    label: '',
    title: '개인정보처리방침',
    link: '',
  },
];

// const helpSiteSub: Site[] = [
//   {
//     label: '',
//     title: '이용약관',
//     link: '',
//   },
//   {
//     label: '',
//     title: '개인정보처리방침',
//     link: '',
//   },
// ];

type FooterSiteProps = Site;

function FooterSite({ label, title, link }: FooterSiteProps) {
  return (
    <FooterSiteBlock>
      <Label>{label}</Label>
      {link ? (
        <NextLink href={link} passHref >
          <SiteTitle cursor="pointer" >{title}</SiteTitle>
        </NextLink>
      ) : (
        <SiteTitle cursor="">{title}</SiteTitle>
      )}
    </FooterSiteBlock>
  );
}

const FooterSiteBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  margin-bottom: 13px;
`;

const SiteTitle = styled.span<{cursor:string}>`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 1.14;

  cursor: ${props => props.cursor||'' };

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

function Footer() {
  return (
    <FooterBlock>
      <Hr/>
      <Container>
        <ServiceInformation>
          {helpSiteMain.map(({ title, ...siteProps }) => (
            <FooterSite key={title} title={title} {...siteProps} />
          ))}
        </ServiceInformation>
        <br />
        <br />
        <Copyright>{`©${new Date().getFullYear()} bucky. All rights reserved.`}</Copyright>
      </Container>
    </FooterBlock>
  );
}

const FooterBlock = styled.footer``;

const Hr = styled.hr`
    background-color: #e5e5e5;
    border-style: none;
    height: 1px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 170px;
  overflow-wrap: break-word;
  align-items: center;
  padding: 46px 40px 67px;

  @media only screen and (max-width: 600px) {
    padding: 26px 20px 26px;
  }
`;

const ServiceInformation = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Copyright = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;

  @media only screen and (max-width: 600px) {
    font-weight: 200;
    font-size: 14px;
    line-height: 16px;
  }
`;

export default Footer;
