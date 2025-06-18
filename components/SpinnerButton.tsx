import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

// استایل دکمه
const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  padding: ${props => {
    switch (props.size) {
      case 'sm': return 'var(--spacing-2) var(--spacing-4)';
      case 'lg': return 'var(--spacing-4) var(--spacing-8)';
      default: return 'var(--spacing-3) var(--spacing-6)';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return 'var(--font-size-sm)';
      case 'lg': return 'var(--font-size-lg)';
      default: return 'var(--font-size-base)';
    }
  }};
  font-weight: 500;
  border-radius: ${props => props.rounded ? 'var(--border-radius-full)' : 'var(--border-radius)'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: all var(--transition-normal);
  border: none;
  font-family: inherit;
  
  ${props => {
    if (props.isLoading) {
      return `
        color: transparent !important;
        pointer-events: none;
      `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: linear-gradient(to right, var(--color-secondary), var(--color-secondary-dark));
          color: var(--color-white);
          box-shadow: 0 4px 15px rgba(var(--color-secondary-rgb), 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--color-secondary-rgb), 0.4);
          }
        `;
      case 'success':
        return `
          background-color: var(--color-success);
          color: var(--color-white);
          
          &:hover {
            background-color: var(--color-success-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(var(--color-success-rgb), 0.3);
          }
        `;
      case 'danger':
        return `
          background-color: var(--color-danger);
          color: var(--color-white);
          
          &:hover {
            background-color: var(--color-danger-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(var(--color-danger-rgb), 0.3);
          }
        `;
      case 'warning':
        return `
          background-color: var(--color-warning);
          color: var(--color-white);
          
          &:hover {
            background-color: var(--color-warning-dark);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(var(--color-warning-rgb), 0.3);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 2px solid var(--color-primary);
          color: var(--color-primary);
          
          &:hover {
            background-color: var(--color-primary);
            color: var(--color-white);
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));
          color: var(--color-white);
          box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--color-primary-rgb), 0.4);
          }
        `;
    }
  }}
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: linear-gradient(to right, var(--color-gray-300), var(--color-gray-400));
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

// کانتینر اسپینر
const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface SpinnerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  spinnerType?: 'circle' | 'dots';
  spinnerColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  fullWidth?: boolean;
  rounded?: boolean;
}

const SpinnerButton: React.FC<SpinnerButtonProps> = ({
  isLoading = false,
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  spinnerType = 'circle',
  spinnerColor,
  fullWidth = false,
  rounded = true,
  ...rest
}) => {
  // اگر رنگ اسپینر مشخص نشده باشد، از رنگ دکمه استفاده می‌کنیم
  const spinnerColorToUse = spinnerColor || (
    variant === 'outline' ? 'primary' : variant
  );

  return (
    <Button
      variant={variant}
      size={size}
      isLoading={isLoading}
      fullWidth={fullWidth}
      rounded={rounded}
      disabled={rest.disabled || isLoading}
      {...rest}
    >
      {leftIcon && !isLoading && leftIcon}
      {children}
      {rightIcon && !isLoading && rightIcon}
      
      {isLoading && (
        <SpinnerWrapper>
          <Spinner 
            type={spinnerType} 
            size="small"
            color={spinnerColorToUse}
          />
        </SpinnerWrapper>
      )}
    </Button>
  );
};

export default SpinnerButton; 