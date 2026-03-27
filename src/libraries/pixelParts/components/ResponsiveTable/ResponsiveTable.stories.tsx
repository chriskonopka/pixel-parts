// src/components/ResponsiveTable/ResponsiveTable.stories.tsx
import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ResponsiveTable, { ResponsiveTableProps, Column } from '.';
import bigResponse from './bigResponse.json';

const columns: Column[] = [
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age' },
  { header: 'Email', accessor: 'email' },
];

// small sample for default/no-data stories
const sampleData = [
  { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
  { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
  { name: 'Sam Wilson', age: 23, email: 'sam.wilson@example.com' },
];

// larger data set to demo sorting & filtering
const largeData = Array.from({ length: 50 }, (_, i) => ({
  name: `User ${i + 1}`,
  age: 20 + ((i * 7) % 50),
  email: `user${i + 1}@example.com`,
}));

// columns for the big response performance test, with renderCell on the Name column
const timekeeperColumns: Column[] = [
  {
    header: 'Name',
    accessor: 'name',
    renderCell: (value: string) => (
      <span style={{ fontWeight: 600, color: '#0078D4' }}>{value}</span>
    ),
  },
  { header: 'Last Time Entry', accessor: 'lastTimeEntry' },
  { header: 'Hours (% Total)', accessor: 'hoursWithPercent' },
  { header: 'Title', accessor: 'title' },
  { header: 'Practice Area', accessor: 'practiceArea' },
  { header: 'Office', accessor: 'office' },
];

const bigTimekeeperData = bigResponse.result.map(item => ({
  name: item.name,
  lastTimeEntry: item.lastTimeEntry,
  hoursWithPercent: `${item.hours} (${item.percentage})`,
  title: item.title,
  practiceArea: item.practiceArea,
  office: item.office,
}));


export default {
  title: 'Data Display/ResponsiveTable',
  component: ResponsiveTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The <b>ResponsiveTable</b> component is used to display tabular data in a responsive manner. On small screen sizes, the table will stack its columns vertically for better readability. Supports sorting, filtering, striped rows, and pagination.',
      },
    },
  },
} as Meta<ResponsiveTableProps>;

type Story = StoryObj<ResponsiveTableProps>;

// ------------------------------------------------------
// Default (no sorting, no filtering)
// ------------------------------------------------------
export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

// ------------------------------------------------------
// NoData (empty table fallback)
// ------------------------------------------------------
export const NoData: Story = {
  args: {
    columns,
    data: [],
  },
};

// ------------------------------------------------------
// WithSortingAndFilteringWhiteRows
//   - sorting and filtering both enabled, single row color
// ------------------------------------------------------
export const WithSortingAndFiltering: Story = {
  args: {
    columns,
    data: largeData,
    isSortable: true,
    isFilterable: true,
    isStriped: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates:

- **Sorting:** Click column headers to sort ascending/descending.
- **Filtering:** Use input boxes under headers to live-filter each column.
- **Striped false:** Rows all appear as the same color.
        `,
      },
    },
  },
};

// ------------------------------------------------------
// PERFORMANCE: use your bigResponse.json as the data source
// ------------------------------------------------------
export const Performance: Story = {
  args: {
    columns: timekeeperColumns,
    data: bigTimekeeperData,
    isSortable: true,
    isFilterable: true,
    isStriped: true,
    pageSize: 25,
  },
  parameters: {
    docs: {
      description: {
        story: `
Uses **bigResponse.json** to simulate a very large dataset and test performance:

- **renderCell** on the Name column to demonstrate custom cell rendering.
- \`isSortable\`, \`isFilterable\`, and \`isStriped\` all enabled.
- \`pageSize\` set to 25 to exercise pagination.
        `,
      },
    },
  },
};

 // DefaultSortOnAgeDesc
 //   - starts sorted by the 2nd column (“Age”) descending
 // ------------------------------------------------------
export const DefaultSortOnAgeDesc: Story = {
  args: {
    columns,
    data: sampleData,
    isSortable: true,
    defaultSortColumn: 'age',
    defaultSortAsc: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
Starts with the “Age” column sorted in descending order via the \`defaultSortColumn\` and \`defaultSortAsc\` props.
        `,
      },
    },
  },
};

// ------------------------------------------------------
// GlobalSearch (external input drives `searchText`)
// ------------------------------------------------------
export const GlobalSearch: Story = {
  args: {
    columns,
    data: largeData,
    isSortable: true,
    isFilterable: true,
    pageSize: 10,
  },
  render: (baseArgs) => {
    const [searchValue, setSearchValue] = React.useState('');
    return (
      <div style={{ width: 900 }}>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
          <label htmlFor="global-search">Search:</label>
          <input
            id="global-search"
            type="text"
            placeholder="Type to filter across all columns…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ padding: 8, flex: 1 }}
          />
        </div>
        <ResponsiveTable {...baseArgs} searchText={searchValue} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates an **external search box** controlling the table via the `searchText` prop. Matches if any visible column contains the query.',
      },
    },
  },
};

// ------------------------------------------------------
// SelectableMultiple (uncontrolled)
//   - adds checkbox column; header checkbox toggles current page
// ------------------------------------------------------
export const SelectableMultiple: Story = {
  args: {
    columns,
    data: largeData,
    isSortable: true,
    isFilterable: true,
    pageSize: 10,
    selectable: true,
    selectionMode: 'multiple',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enables **multi-select** with a leading checkbox column. Header checkbox selects/deselects the **current page**.',
      },
    },
  },
};

// ------------------------------------------------------
// SelectableSingle (uncontrolled)
//   - radio inputs; only one row selected at a time
// ------------------------------------------------------
export const SelectableSingle: Story = {
  args: {
    columns,
    data: sampleData,
    isSortable: true,
    selectable: true,
    selectionMode: 'single',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Single-select mode uses **radio inputs**; clicking a row or radio selects it and clears the previous selection.',
      },
    },
  },
};

// ------------------------------------------------------
// ControlledSelectionWithExternalSearch
//   - controlled selectedRowIds + getRowId + external search
// ------------------------------------------------------
export const ControlledSelectionWithExternalSearch: Story = {
  args: {
    columns,
    data: largeData.map((row, index) => ({ id: index + 1, ...row })), // add stable id
    isSortable: true,
    isFilterable: true,
    pageSize: 10,
    selectable: true,
    selectionMode: 'multiple',
  },
  render: (baseArgs) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    return (
      <div style={{ width: 900 }}>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
          <label htmlFor="ctl-search">Search:</label>
          <input
            id="ctl-search"
            type="text"
            placeholder="Type to filter across all columns…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ padding: 8, flex: 1 }}
          />
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Selected IDs: {selectedIds.length ? selectedIds.join(', ') : 'none'}
          </div>
        </div>

        <ResponsiveTable
          {...baseArgs}
          searchText={searchValue}
          getRowId={(row) => String((row as any).id)}
          selectedRowIds={selectedIds}
          onSelectionChange={(ids) => setSelectedIds(ids)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows **controlled selection** using `selectedRowIds`/`onSelectionChange`, an external search box, and a custom `getRowId` for stable keys.',
      },
    },
  },
};

// ------------------------------------------------------
// SelectionWithPagination
//   - illustrates "select all" being scoped to current page
// ------------------------------------------------------
export const SelectionWithPagination: Story = {
  args: {
    columns,
    data: largeData,
    isSortable: true,
    isFilterable: true,
    pageSize: 5,
    selectable: true,
    selectionMode: 'multiple',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header checkbox applies to the **current page only**. Change pages to see independent selection state.',
      },
    },
  },
};