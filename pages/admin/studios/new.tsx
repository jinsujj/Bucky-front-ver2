import React, { useState } from 'react';
import studioApi, { Phone } from '@/api/studio';
import Layout from '@/components/admin/Layout';
import StudioForm, { StudioFormPayload } from '@/components/admin/StudioForm';
import { useRouter } from 'next/router';

function NewStudioPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const saveStudio = async ({ studio, addresses, phones, menus }: StudioFormPayload) => {
    try {
      // Phone validataion Check
      if (!checkPhoneFormat(phones)) {
        alert('연락처 입력시 "-" 를 입력해 주세요');
        return;
      }

      setIsLoading(true);
      const {
        data: { studio_id },
      } = await studioApi.saveStudio(studio);
      await Promise.all([
        studioApi.saveStudioPhones(studio_id, phones),
        studioApi.saveStudioAddress(studio_id, addresses),
        studioApi.saveStudioMenus(studio_id, menus),
      ]);
      alert('입력하신 스튜디오가 등록 되었습니다 ');
      router.push('/admin/studios');
    } catch (e) {
      console.error(e);
      alert('에러가 발생했습니다 다시 시도해주세요');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPhoneFormat = (phones: Array<Phone>) => {
    const regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
    return phones.some((phone) => regExp.test(phone.phone));
  };

  return (
    <Layout title="스튜디오 등록">
      <StudioForm onSubmit={saveStudio} isLoading={isLoading} />
    </Layout>
  );
}

export default NewStudioPage;
