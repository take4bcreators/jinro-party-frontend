import { FC } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeProps {
  url: string;
}

const QRCode: FC<QRCodeProps> = (props) => {
  return (
    <QRCodeCanvas
      value={props.url}
      // size={128}
      size={180}
      bgColor={'#FFFFFF'}
      fgColor={'#000000'}
      level={'L'}
      includeMargin={false}
      imageSettings={{
        // src: '/favicon.ico',
        src: '',
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        excavate: true,
      }}
    />
  );
};

export default QRCode;
