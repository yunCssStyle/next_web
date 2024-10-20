'use client';
import { Button } from '@mui/material';
import { ErrorPageStyle } from './page.style';
import { LINK } from '@/constants/link';
import Image from 'next/image';
import { localStateHandler } from '@/util/localStateHandler';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IErrorPageProps {
  type?: 'error' | 'maintenance';
}

type MaintenanceDataType = {
  message: string;
  startDateTime: string;
  endDateTime: string;
};
export default function Error(props: IErrorPageProps) {
  const { type = 'error' } = props;
  const router = useRouter();
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceDataType>({
    message: '',
    startDateTime: '',
    endDateTime: ''
  });

  const _conClickReturnToHome = () => {
    window.location.href = '/';
  };
  const _onClickLetUsHelpYou = () => {
    window.open(LINK.FAQ, '_blank');
    return;
  };

  useEffect(() => {
    const maintenanceData = JSON.parse(
      localStateHandler.errorDescription.get()
    ) as MaintenanceDataType | null;

    if (maintenanceData) {
      setMaintenanceData(maintenanceData);
    }

    if (type === 'maintenance' && !maintenanceData) {
      router.push('/');
    }
  }, [router, type]);

  return (
    <ErrorPageStyle>
      {type === 'maintenance' ? (
        <div className="maintenance">
          <h1>
            System under
            <br />
            maintenance
          </h1>
          <div
            className="message"
            dangerouslySetInnerHTML={{
              __html: (maintenanceData?.message as string) ?? ''
            }}
          />

          <div className="schedule__item">
            <p className="title">Maintenance Schedule</p>
            <p className="schedule">
              <span>
                {maintenanceData?.startDateTime?.slice(0, -3) ??
                  '9999-99-99 00:00'}
                (UTC)
              </span>
              <br />
              <span>
                ~
                {maintenanceData?.endDateTime?.slice(0, -3) ??
                  '9999-99-99 00:00'}
                (UTC)
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="information">
          <span className="oops">OOPS!</span>
          <div className="description__container">
            <div className="description1">
              <p className="title">Something went wrong.</p>
              <p>Please try again.</p>
            </div>
            <div className="description2">
              <p>Visit our homepage to start over.</p>
              <p>If the problem persists, please contact support.</p>
            </div>
            {/* <div className="description3">
            <p>
            Please include your nickname used for the
            <br />
            pre-mining, and the time and the content of the
            <br />
            issue occurred when submitting an inquiry.
            </p>
          </div> */}
          </div>
          <div className="links">
            <Button className="home" onClick={_conClickReturnToHome}>
              Visit Homepage
            </Button>
            <Button className="help" onClick={_onClickLetUsHelpYou}>
              Contact Support
            </Button>
          </div>
        </div>
      )}
      <div className="kiki">
        <Image
          src="/assets/images/error_kiki.png"
          alt="kiki"
          width={310}
          height={220}
        />
      </div>
    </ErrorPageStyle>
  );
}
