import React from 'react';
import styled from 'styled-components';

interface FormErrorProps {
  error?: string;
}

const ErrorText = styled.div`
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-1);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  
  .error-icon {
    font-size: 1rem;
  }
`;

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <ErrorText>
      <span className="material-symbols-rounded error-icon">error</span>
      {error}
    </ErrorText>
  );
};

export default FormError; 