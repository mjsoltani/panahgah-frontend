import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-lg);
  padding: 1.8rem;
  height: fit-content;
  transition: all var(--transition-normal);
  border: 1px solid var(--color-gray-100);
  position: relative;
  overflow: hidden;
  
  &:hover {
    box-shadow: var(--box-shadow-xl);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  }
`;

const PanelHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: var(--font-size-xl);
    color: var(--color-gray-900);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--color-gray-600);
    font-size: var(--font-size-sm);
  }
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 1.8rem;
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 2.8rem;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--border-radius-full);
    font-family: inherit;
    font-size: var(--font-size-base);
    transition: all var(--transition-normal);
    background-color: var(--color-gray-50);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
      background-color: var(--color-white);
    }
    
    &::placeholder {
      color: var(--color-gray-400);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-400);
    width: 20px;
    height: 20px;
    pointer-events: none;
    transition: all var(--transition-normal);
  }
  
  input:focus + .search-icon {
    color: var(--color-primary);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2.2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: var(--font-size-base);
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--color-gray-200);
  color: var(--color-gray-800);
  position: relative;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    right: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to left, var(--color-primary), var(--color-secondary));
    border-radius: var(--border-radius-full);
  }
  
  .section-icon {
    color: var(--color-primary);
    font-size: 1.2rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--font-size-base);
  padding: 0.7rem 0.8rem;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  color: var(--color-gray-700);
  
  &:hover {
    background-color: var(--color-gray-50);
  }
  
  .checkbox-container {
    position: relative;
    margin-left: 0.75rem;
    width: 20px;
    height: 20px;
  }
  
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: var(--color-white);
    border: 2px solid var(--color-gray-300);
    border-radius: 4px;
    transition: all var(--transition-normal);
  }
  
  input:checked ~ .checkmark {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  input:checked ~ .checkmark:after {
    display: block;
  }
  
  .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const IconBadge = styled.span<{ bgColor: string }>`
  margin-left: 0.7rem;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  background-color: ${props => props.bgColor};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

const RangeContainer = styled.div`
  margin: 1.8rem 0 1.2rem;
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 0.8rem 0;
  accent-color: var(--color-primary);
  height: 6px;
  
  &::-webkit-slider-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    cursor: pointer;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin-top: 0.6rem;
`;

const CurrentValue = styled.div`
  text-align: center;
  font-size: var(--font-size-base);
  color: var(--color-primary);
  font-weight: 600;
  margin: 1.2rem 0;
  background-color: rgba(var(--color-primary-rgb), 0.08);
  padding: 0.7rem;
  border-radius: var(--border-radius-full);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius-full);
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all var(--transition-normal);
  
  ${props => props.primary ? `
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px rgba(var(--color-primary-rgb), 0.4);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  ` : `
    background-color: var(--color-gray-100);
    color: var(--color-gray-700);
    border: 1px solid var(--color-gray-200);
    
    &:hover {
      background-color: var(--color-gray-200);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  .button-icon {
    font-size: 1.2rem;
  }
`;

const RadiusControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RadiusSlider = styled.input`
  width: 100%;
  accent-color: var(--color-primary);
  height: 6px;
`;

const RadiusValue = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-gray-500);
`;

const StatusDot = styled.span<{ color: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: auto;
  margin-left: 0.5rem;
`;

const LocationNoteSection = styled.div`
  margin-top: var(--spacing-4);
  padding: var(--spacing-3);
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: var(--border-radius);
  
  p {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-2);
    color: var(--color-primary);
    font-size: var(--font-size-sm);
    line-height: 1.5;
  }
  
  .info-icon {
    font-size: 1.2rem;
    color: var(--color-primary);
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: {
    [key: string]: boolean | undefined;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resourceTypes: {
    [key: string]: {
      title: string;
      color: string;
      icon: string;
    };
  };
  radius: number;
  onRadiusChange: (value: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  resourceTypes,
  radius,
  onRadiusChange,
}) => {
  return (
    <Panel>
      <PanelHeader>
        <h2>فیلترها</h2>
        <p>منابع مورد نظر خود را فیلتر کنید</p>
      </PanelHeader>
      
      <SearchInput>
        <input
          type="text"
          placeholder="جستجو در منابع..."
          value={searchQuery}
          onChange={onSearchChange}
        />
        <span className="material-symbols-rounded search-icon">search</span>
      </SearchInput>
      
      <FilterSection>
        <SectionTitle>
          <span className="material-symbols-rounded section-icon">travel_explore</span>
          شعاع جستجو
        </SectionTitle>
        <RadiusControl>
          <RadiusSlider
            type="range"
            min="500"
            max="3000"
            step="500"
            value={radius}
            onChange={(e) => onRadiusChange(parseInt(e.target.value))}
          />
          <RadiusValue>{(radius / 1000).toFixed(1)} کیلومتر</RadiusValue>
        </RadiusControl>
      </FilterSection>
      
      <FilterSection>
        <SectionTitle>
          <span className="material-symbols-rounded section-icon">category</span>
          نوع منابع
        </SectionTitle>
        <CheckboxGroup>
          {Object.entries(resourceTypes).map(([key, { title, color, icon }]) => (
            <CheckboxLabel key={key}>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name={key}
                  checked={filters[key] || false}
                  onChange={onFilterChange}
                />
                <span className="checkmark"></span>
              </div>
              {title}
              <IconBadge bgColor={color}>
                <span className="material-symbols-rounded">{icon}</span>
              </IconBadge>
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </FilterSection>
      
      <FilterSection>
        <SectionTitle>
          <span className="material-symbols-rounded section-icon">timer</span>
          وضعیت
        </SectionTitle>
        <CheckboxGroup>
          <CheckboxLabel>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="open"
                checked={filters.open || false}
                onChange={onFilterChange}
              />
              <span className="checkmark"></span>
            </div>
            فعال
            <StatusDot color="var(--color-success)" />
          </CheckboxLabel>
          
          <CheckboxLabel>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="limited"
                checked={filters.limited || false}
                onChange={onFilterChange}
              />
              <span className="checkmark"></span>
            </div>
            محدود
            <StatusDot color="var(--color-warning)" />
          </CheckboxLabel>
          
          <CheckboxLabel>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="closed"
                checked={filters.closed || false}
                onChange={onFilterChange}
              />
              <span className="checkmark"></span>
            </div>
            غیرفعال
            <StatusDot color="var(--color-danger)" />
          </CheckboxLabel>
          
          <CheckboxLabel>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="unknown"
                checked={filters.unknown || false}
                onChange={onFilterChange}
              />
              <span className="checkmark"></span>
            </div>
            نامشخص
            <StatusDot color="var(--color-gray-400)" />
          </CheckboxLabel>
        </CheckboxGroup>
      </FilterSection>
      
      <LocationNoteSection>
        <p>
          <span className="material-symbols-rounded info-icon">info</span>
          برای دیدن منابع نزدیک به خود، موقعیت مکانی خود را هنگام ثبت‌نام یا ورود به سیستم وارد کنید.
        </p>
      </LocationNoteSection>
    </Panel>
  );
};

export default FilterPanel; 