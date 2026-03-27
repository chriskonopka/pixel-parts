import * as React from 'react';
import { DropdownOption } from './';
import Dropdown from './';

const Options: DropdownOption[] = [
  { key: 'propertiesHeader', text: 'Properties' },
  { key: 'property1',        text: 'Property 1' },
  { key: 'property2',        text: 'Property 2' },
  { key: 'property3',        text: 'Property 3' },
];

const LightOnlyOptions: DropdownOption[] = [
  { key: 'opt1', text: 'Option A' },
  { key: 'opt2', text: 'Option B' },
  { key: 'opt3', text: 'Option C' },
];


const US_STATES: DropdownOption[] = [
  { key: 'AL', text: 'Alabama' },
  { key: 'AK', text: 'Alaska' },
  { key: 'AZ', text: 'Arizona' },
  { key: 'AR', text: 'Arkansas' },
  { key: 'CA', text: 'California' },
  { key: 'CO', text: 'Colorado' },
  { key: 'CT', text: 'Connecticut' },
  { key: 'DE', text: 'Delaware' },
  { key: 'FL', text: 'Florida' },
  { key: 'GA', text: 'Georgia' },
  { key: 'HI', text: 'Hawaii' },
  { key: 'ID', text: 'Idaho' },
  { key: 'IL', text: 'Illinois' },
  { key: 'IN', text: 'Indiana' },
  { key: 'IA', text: 'Iowa' },
  { key: 'KS', text: 'Kansas' },
  { key: 'KY', text: 'Kentucky' },
  { key: 'LA', text: 'Louisiana' },
  { key: 'ME', text: 'Maine' },
  { key: 'MD', text: 'Maryland' },
  { key: 'MA', text: 'Massachusetts' },
  { key: 'MI', text: 'Michigan' },
  { key: 'MN', text: 'Minnesota' },
  { key: 'MS', text: 'Mississippi' },
  { key: 'MO', text: 'Missouri' },
  { key: 'MT', text: 'Montana' },
  { key: 'NE', text: 'Nebraska' },
  { key: 'NV', text: 'Nevada' },
  { key: 'NH', text: 'New Hampshire' },
  { key: 'NJ', text: 'New Jersey' },
  { key: 'NM', text: 'New Mexico' },
  { key: 'NY', text: 'New York' },
  { key: 'NC', text: 'North Carolina' },
  { key: 'ND', text: 'North Dakota' },
  { key: 'OH', text: 'Ohio' },
  { key: 'OK', text: 'Oklahoma' },
  { key: 'OR', text: 'Oregon' },
  { key: 'PA', text: 'Pennsylvania' },
  { key: 'RI', text: 'Rhode Island' },
  { key: 'SC', text: 'South Carolina' },
  { key: 'SD', text: 'South Dakota' },
  { key: 'TN', text: 'Tennessee' },
  { key: 'TX', text: 'Texas' },
  { key: 'UT', text: 'Utah' },
  { key: 'VT', text: 'Vermont' },
  { key: 'VA', text: 'Virginia' },
  { key: 'WA', text: 'Washington' },
  { key: 'WV', text: 'West Virginia' },
  { key: 'WI', text: 'Wisconsin' },
  { key: 'WY', text: 'Wyoming' },
];

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The Dropdown component supports both dark-multiselect and light single-select variants.'
      },
    },
  },
};

export const Default: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const handleChange = (
    _ev: React.FormEvent<HTMLElement>,
    item?: DropdownOption
  ) => {
    if (!item) return;
    const next = selectedKeys.includes(item.key)
      ? selectedKeys.filter(k => k !== item.key)
      : [...selectedKeys, item.key];
    setSelectedKeys(next);
  };

  return (
    <Dropdown
      circleColor="blue"
      displayText="Properties"
      initialSelectedKeys={selectedKeys}
      onChange={handleChange}
      dropdownOptions={Options}
      multiSelect={true}
    />
  );
};

export const WithInitialSelectedKeys: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([
    'property1',
    'property2'
  ]);

  const handleChange = (
    _ev: React.FormEvent<HTMLElement>,
    item?: DropdownOption
  ) => {
    if (!item) return;
    const next = selectedKeys.includes(item.key)
      ? selectedKeys.filter(k => k !== item.key)
      : [...selectedKeys, item.key];
    setSelectedKeys(next);
  };

  return (
    <Dropdown
      circleColor="purple"
      displayText="Workflows"
      initialSelectedKeys={selectedKeys}
      onChange={handleChange}
      dropdownOptions={Options}
      multiSelect={true}
    />
  );
};

export const LightVariant: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const handleChange = (
    _ev: React.FormEvent<HTMLElement>,
    item?: DropdownOption
  ) => {
    if (!item) return;
    setSelectedKeys([item.key]);
  };

  return (
    <Dropdown
      variant="light"
      width="200px"
      placeholder="Choose an option"
      initialSelectedKeys={selectedKeys}
      onChange={handleChange}
      dropdownOptions={LightOnlyOptions}
      multiSelect={false}
    />
  );
};

export const LightWithInitialSelectedKey: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['opt2']); // "Option B" pre-selected

  const handleChange = (
    _ev: React.FormEvent<HTMLElement>,
    item?: DropdownOption
  ) => {
    if (!item) return;
    setSelectedKeys([item.key]);
  };

  return (
    <Dropdown
      variant="light"
      width="200px"
      placeholder="Choose an option"
      initialSelectedKeys={selectedKeys}
      onChange={handleChange}
      dropdownOptions={LightOnlyOptions}
      multiSelect={false}
    />
  );
};

export const ReadOnly: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['opt2']); // "Option B" pre-selected

  const handleChange = (
    _ev: React.FormEvent<HTMLElement>,
    item?: DropdownOption
  ) => {
    if (!item) return;
    setSelectedKeys([item.key]);
  };

  return (
    <Dropdown
      variant="light"
      width="200px"
      placeholder="Choose an option"
      initialSelectedKeys={selectedKeys}
      onChange={handleChange}
      dropdownOptions={LightOnlyOptions}
      multiSelect={false}
      readOnly
    />
  );
};

export const LargeList_Height400: React.FC = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleChange = (
    _ev: React.FormEvent<HTMLElement>,
    item?: DropdownOption
  ) => {
    if (!item) return;
    setSelected([item.key]);
  };

  return (
    <div style={{ maxWidth: 280 }}>
      <Dropdown
        variant="light"
        width="100%"
        placeholder="Select a state"
        initialSelectedKeys={selected}
        onChange={handleChange}
        dropdownOptions={US_STATES}
        multiSelect={false}
        optionsListHeight={400}
      />
    </div>
  );
};
