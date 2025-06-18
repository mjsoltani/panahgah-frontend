import React from 'react';
import styled, { keyframes } from 'styled-components';

// انیمیشن‌های مورد نیاز
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
`;

const ripple = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
`;

// کانتینر اصلی برای اسپینر
type ContainerProps = {
  fullScreen?: boolean;
  overlay?: boolean;
  padding?: string;
  absoluteCenter?: boolean;
}

const SpinnerContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.padding && `padding: ${props.padding};`}
  
  ${props => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(4px);
  `}
  
  ${props => props.overlay && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.7);
  `}
  
  ${props => props.absoluteCenter && `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `}
`;

// استایل متن
const SpinnerText = styled.p<{ size?: 'small' | 'sm' | 'medium' | 'md' | 'large' | 'lg' }>`
  margin-top: 1rem;
  color: var(--color-gray-700);
  font-weight: 500;
  
  font-size: ${props => {
    switch (props.size) {
      case 'small':
      case 'sm':
        return '0.8rem';
      case 'large':
      case 'lg':
        return '1.1rem';
      default:
        return '1rem';
    }
  }};
`;

// اسپینر چرخشی ساده
const CircleSpinner = styled.div<{ size: string, color?: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border: 3px solid ${props => `rgba(var(--color-${props.color || 'primary'}-rgb), 0.2)`};
  border-radius: 50%;
  border-top: 3px solid var(--color-${props => props.color || 'primary'});
  animation: ${spin} 1s linear infinite;
`;

// اسپینر گرادینت
const GradientSpinner = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: conic-gradient(
    var(--color-primary) 0deg, 
    var(--color-primary-light) 90deg, 
    rgba(255, 255, 255, 0.3) 150deg
  );
  animation: ${spin} 1.2s linear infinite;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-color: white;
  }
`;

// اسپینر چند نقطه‌ای
const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ delay: string, color?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-${props => props.color || 'primary'});
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay};
`;

// اسپینر با افکت موج
const RippleContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const RippleCircle = styled.div<{ delay: string, color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: var(--color-${props => props.color || 'primary'});
  opacity: 0.7;
  animation: ${ripple} 2s infinite;
  animation-delay: ${props => props.delay};
`;

// کامپوننت اصلی
interface SpinnerProps {
  type?: 'circle' | 'gradient' | 'dots' | 'ripple';
  size?: 'small' | 'sm' | 'medium' | 'md' | 'large' | 'lg';
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  absoluteCenter?: boolean;
  padding?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  type = 'circle',
  size = 'medium',
  text,
  fullScreen = false,
  overlay = false,
  color = 'primary',
  absoluteCenter = false,
  padding
}) => {
  // تعیین سایز مناسب بر اساس اندازه انتخاب شده
  const getSizeValue = () => {
    switch (size) {
      case 'small':
      case 'sm':
        return '24px';
      case 'large':
      case 'lg':
        return '60px';
      default:
        return '40px';
    }
  };

  // رندر اسپینر مناسب با نوع انتخاب شده
  const renderSpinner = () => {
    switch (type) {
      case 'gradient':
        return <GradientSpinner size={getSizeValue()} />;
      case 'dots':
        return (
          <DotsContainer>
            <Dot delay="0s" color={color} />
            <Dot delay="0.3s" color={color} />
            <Dot delay="0.6s" color={color} />
          </DotsContainer>
        );
      case 'ripple':
        return (
          <RippleContainer>
            <RippleCircle delay="0s" color={color} />
            <RippleCircle delay="0.6s" color={color} />
          </RippleContainer>
        );
      default:
        return <CircleSpinner size={getSizeValue()} color={color} />;
    }
  };

  return (
    <SpinnerContainer 
      fullScreen={fullScreen} 
      overlay={overlay}
      padding={padding}
      absoluteCenter={absoluteCenter}
    >
      {renderSpinner()}
      {text && <SpinnerText size={size}>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

export default Spinner; 