import { styled, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Accounts from '../Accounts';
import UserSearch from '../UserSearch';
import Users from '../Users';

const TabsContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  justifyContent: 'center',
  'tabs-header': {
    borderBottom: 1,
    borderColor: 'divider'
  },
  tabs: {
    width: '100%',
    justifyContent: 'center'
  }
}));

const tabsStyles = {
  color: 'white',
  width: '50%',
  fontWeight: 700,
  textTransform: 'capitalize',
  '&.Mui-selected': {
    color: `#FFFFFF' !important`
  }
};

const SelectorContainer = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  type TabItemProps = {
    value: string;
    isSelected: boolean;
    children: JSX.Element;
  };
  const TabItem = ({ value, isSelected, children }: TabItemProps) => {
    return (
      <div id={`${value}-tab`} hidden={!isSelected}>
        {isSelected ? children : null}
      </div>
    );
  };

  return (
    <TabsContainer>
      <div className="tabs-header">
        <Tabs
          className={'tabs'}
          value={selectedTab}
          onChange={handleChange}
          aria-label="navigation-tabs"
        >
          <Tab label="Users" id={'users'} sx={tabsStyles} />
          <Tab label="Find user" id={'findUser'} sx={tabsStyles} />
          <Tab label="Accounts" id={'accounts'} sx={tabsStyles} />
        </Tabs>
      </div>

      <TabItem isSelected={selectedTab === 0} value={'users'}>
        <Users />
      </TabItem>
      <TabItem isSelected={selectedTab === 1} value={'findUser'}>
        <UserSearch />
      </TabItem>
      <TabItem isSelected={selectedTab === 2} value={'accounts'}>
        <Accounts />
      </TabItem>
    </TabsContainer>
  );
};

export default SelectorContainer;
