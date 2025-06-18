import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Spinner from './Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
  margin-bottom: 3rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: var(--font-size-3xl);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: var(--color-gray-600);
  font-size: var(--font-size-lg);
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.7;
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-full);
  height: 10px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${props => `${props.progress}%`};
  height: 100%;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  border-radius: var(--border-radius-full);
  transition: width 1.5s ease;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 50px;
  font-weight: 500;
  margin-top: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(var(--color-primary-rgb), 0.4);
  }
`;

const SpinnerContainer = styled.div`
  margin: 0.5rem 0 2.5rem;
`;

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  progress?: number;
  imageSrc?: string;
  backLink?: string;
  backText?: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  title = 'در حال توسعه',
  description = 'این بخش از پناهگاه امن در حال توسعه می‌باشد و به زودی در دسترس قرار خواهد گرفت.',
  progress = 90,
  imageSrc = '/images/under-development.svg',
  backLink = '/',
  backText = 'بازگشت به صفحه اصلی'
}) => {
  return (
    <Container>
      <ImageContainer>
        <img src={imageSrc} alt="در حال توسعه" />
      </ImageContainer>
      
      <Title>{title}</Title>
      <Description>{description}</Description>
      
      <SpinnerContainer>
        <Spinner type="dots" size="medium" />
      </SpinnerContainer>
      
      <ProgressContainer>
        <ProgressBar progress={progress} />
      </ProgressContainer>
      
      <p>پیشرفت: {progress}٪</p>
      
      <BackLink href={backLink}>
        <span className="material-symbols-rounded">arrow_back</span>
        {backText}
      </BackLink>
    </Container>
  );
};

export default UnderDevelopment; 