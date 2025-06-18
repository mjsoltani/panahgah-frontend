import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-4);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
  border: 1px solid var(--color-gray-100);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--box-shadow-lg);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
    opacity: 0.7;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-4);
`;

const IconContainer = styled.div<{ bgColor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-4);
  flex-shrink: 0;
  background: linear-gradient(135deg, ${props => props.bgColor}, ${props => props.bgColor}dd);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  .icon {
    color: white;
    font-size: 24px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;

const ResourceTitle = styled.h3`
  margin: 0 0 var(--spacing-2);
  font-size: var(--font-size-lg);
  color: var(--color-gray-900);
  font-weight: 700;
  line-height: 1.4;
`;

const Address = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-3);
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  
  .address-icon {
    color: var(--color-gray-400);
    margin-left: var(--spacing-2);
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-4);
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  
  .status-icon {
    font-size: 1rem;
  }
  
  ${props => {
    switch (props.status) {
      case 'open':
        return `
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--color-success);
        `;
      case 'limited':
        return `
          background-color: rgba(255, 171, 0, 0.1);
          color: var(--color-warning);
        `;
      case 'closed':
        return `
          background-color: rgba(255, 23, 68, 0.1);
          color: var(--color-danger);
        `;
      default:
        return `
          background-color: rgba(0, 0, 0, 0.1);
          color: var(--color-gray-500);
        `;
    }
  }}
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.75rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  .detail-icon {
    font-size: 16px;
    margin-left: 0.4rem;
    color: var(--color-gray-500);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: var(--color-gray-100);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all var(--transition-speed);
  
  .btn-icon {
    font-size: 18px;
    margin-left: 0.5rem;
  }
  
  &:hover {
    background-color: var(--color-gray-200);
  }
`;

interface ResourceCardProps {
  resource: any;
  icon: React.ReactNode;
  iconColor: string;
  status?: 'open' | 'limited' | 'closed' | 'unknown';
  onNavigate?: () => void;
  distance?: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  icon,
  iconColor,
  status = 'unknown',
  onNavigate,
  distance,
}) => {
  // تبدیل وضعیت به متن فارسی
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'باز';
      case 'limited':
        return 'محدود';
      case 'closed':
        return 'بسته';
      default:
        return 'نامشخص';
    }
  };
  
  // تبدیل فاصله به متن مناسب
  const formatDistance = (meters?: number): string => {
    if (!meters) return 'فاصله نامشخص';
    
    if (meters < 1000) {
      return `${Math.round(meters)} متر`;
    } else {
      return `${(meters / 1000).toFixed(1)} کیلومتر`;
    }
  };

  // استخراج اطلاعات منبع با توجه به ساختار
  const title = resource.name || resource.title || 'بدون نام';
  const address = resource.address || '';
  
  // پشتیبانی از ساختار داده‌های نشان و Map.ir
  const city = resource.city || resource.region || '';
  const neighborhood = resource.neighborhood || resource.neighbourhood || '';
  
  return (
    <Card>
      <CardHeader>
        <IconContainer bgColor={iconColor}>
          <div className="icon">{icon}</div>
        </IconContainer>
        
        <Content>
          <ResourceTitle>{title}</ResourceTitle>
          <Address>
            <span className="material-symbols-rounded address-icon">location_on</span>
            {address}
          </Address>
        </Content>
      </CardHeader>
      
      <StatusContainer>
        <span>وضعیت:</span>
        <StatusBadge status={status}>
          <span className="material-symbols-rounded status-icon">
            {status === 'open' ? 'check_circle' : 
             status === 'limited' ? 'info' : 
             status === 'closed' ? 'cancel' : 'help'}
          </span>
          {getStatusText(status)}
        </StatusBadge>
        
        {distance !== undefined && (
          <DetailItem>
            <span className="material-symbols-rounded detail-icon">distance</span>
            {formatDistance(distance)}
          </DetailItem>
        )}
      </StatusContainer>
      
      <Details>
        {city && (
          <DetailItem>
            <span className="material-symbols-rounded detail-icon">location_city</span>
            <span>{city}</span>
          </DetailItem>
        )}
        
        {neighborhood && (
          <DetailItem>
            <span className="material-symbols-rounded detail-icon">home_work</span>
            <span>{neighborhood}</span>
          </DetailItem>
        )}
      </Details>
      
      <Actions>
        <ActionButton onClick={onNavigate}>
          <span className="material-symbols-rounded btn-icon">navigation</span>
          مسیریابی
        </ActionButton>
      </Actions>
    </Card>
  );
};

export default ResourceCard;