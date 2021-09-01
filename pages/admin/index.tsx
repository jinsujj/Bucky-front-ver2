import { GetServerSideProps } from 'next';
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/admin/studios',
      permanent: false,
    },
  };
};

export default function AdminMainPage() {
  return null;
}
