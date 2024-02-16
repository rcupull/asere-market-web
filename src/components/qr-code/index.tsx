import QRCode, { QRCodeProps } from 'react-qr-code';

interface QrCodeProps extends QRCodeProps {}

export const QrCode = (props: QrCodeProps) => {
  return (
    <div className='bg-white p-16'>
      <QRCode {...props} />
    </div>
  );
};
