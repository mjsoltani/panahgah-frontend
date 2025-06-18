import React from 'react';
import Spinner from './Spinner';

interface LoadingOverlayProps {
  text?: string;
  type?: 'circle' | 'gradient' | 'dots' | 'ripple';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  text = 'در حال بارگذاری...',
  type = 'gradient',
  color = 'primary'
}) => {
  return (
    <Spinner
      type={type}
      size="large"
      text={text}
      fullScreen={true}
      color={color}
    />
  );
};

export default LoadingOverlay; 