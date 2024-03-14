import ReactQRCode, { QRCodeProps as ReactQRCodeProps } from 'react-qr-code';

interface QrCodeProps extends ReactQRCodeProps {}

export const QrCode = ({ value }: QrCodeProps) => {
  return (
    <div className="bg-white p-16">
      <ReactQRCode value={value} />
    </div>
  );
};
