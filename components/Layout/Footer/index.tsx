import styled from '@emotion/styled';
import NextLink from 'next/link';

/**
 * todo
 * 1. 한글, 영문 타입에 따라서 font-family 및 style 가능하도록 수정
 * 2. hover style 입히기 -> 나중에
 */

interface Site {
  label?: string;
  title: string;
  link?: string;
  titleType?: string;
}

const helpSites: Site[] = [
  {
    label: 'contact',
    title: 'ask@bucky.co.kr',
    link: '',
  },
  {
    label: 'sns',
    title: 'instagram',
    link: '',
  },
  {
    title: 'FAQ',
    link: '',
  },
  {
    title: '이용약관',
    link: '',
  },
  {
    title: '개인정보처리방침',
    link: '',
  },
];

type FooterSiteProps = Site;

function FooterSite({ label, title, link }: FooterSiteProps) {
  return (
    <FooterSiteBlock>
      <Label>{label}</Label>
      {link ? (
        <NextLink href={link} passHref>
          <SiteTitle>{title}</SiteTitle>
        </NextLink>
      ) : (
        <SiteTitle>{title}</SiteTitle>
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

const SiteTitle = styled.span`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 1.14;
`;

function Footer() {
  return (
    <FooterBlock>
      <Container>
        <ServiceInformation>
          {helpSites.map(({ title, ...siteProps }) => (
            <FooterSite key={title} title={title} {...siteProps} />
          ))}
        </ServiceInformation>
        <Copyright>{`©${new Date().getFullYear()} bucky. All rights reserved.`}</Copyright>
      </Container>
    </FooterBlock>
  );
}

const FooterBlock = styled.footer``;

const Container = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 46px 40px 67px;
  border-top: 1px solid #e5e5e5;
`;

const ServiceInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
`;

const Copyright = styled.span`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
`;

export default Footer;
