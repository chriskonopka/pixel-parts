import * as React from 'react';
import { ArrowSortUpRegular, ArrowSortDownRegular, FilterRegular, ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
import debounce from 'lodash/debounce';
import styles from './ResponsiveTable.module.scss';

export interface Column {
  header: string;
  accessor: string;
  renderCell?: (value: any, row: Record<string, any>) => React.ReactNode;
}

export interface ResponsiveTableProps {
  /** The columns to display in the table */
  columns: Column[];
  /** The data to display in the table */
  data: Record<string, any>[];
  /** Whether the table should support sorting */
  isSortable?: boolean;
  /** Whether the table should support filtering */
  isFilterable?: boolean;
  /** Whether the table should have striped rows */
  isStriped?: boolean;
  /** Whether the table should have pagination */
  hasPagination?: boolean;
  /** The number of rows per page if pagination is enabled */
  pageSize?: number;
  /** The CSS table-layout property to use */
  tableLayout?: 'auto' | 'fixed';
  /** Optional default column accessor to sort by (defaults to first column) */
  defaultSortColumn?: string;
  /** Optional default sort direction: true for ascending, false for descending (defaults to ascending) */
  defaultSortAsc?: boolean;
  /** Optional global search text to filter rows */
  searchText?: string;
  /** Whether rows should be selectable */
  selectable?: boolean;
  /** Selection mode: 'single' or 'multiple' */
  selectionMode?: 'single' | 'multiple';
  /** Optional function to get a stable row ID (for selection) */
  getRowId?: (row: Record<string, any>, index: number) => string;
  /** Controlled array of selected row IDs */
  selectedRowIds?: string[]; // controlled (optional)
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: string[], selectedRows: Record<string, any>[]) => void;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  isSortable = false,
  isFilterable = false,
  isStriped = true,
  pageSize,
  tableLayout = 'auto',
  defaultSortColumn,
  defaultSortAsc,
  searchText = '',
  selectable = false,
  selectionMode = 'multiple',
  getRowId,
  selectedRowIds,
  onSelectionChange,
}) => {
  // ----- Sorting -----
  const [sortBy, setSortBy] = React.useState<string>(
    defaultSortColumn ?? columns[0]?.accessor
  );
  const [sortAsc, setSortAsc] = React.useState<boolean>(
    defaultSortAsc !== undefined ? defaultSortAsc : true
  );

  // ----- Per-column filters (existing) -----
  const [rawFilters, setRawFilters] = React.useState<Record<string, string>>({});
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [filterShown, setFilterShown] = React.useState<Record<string, boolean>>({});

  // ----- Pagination -----
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  // ----- Selection (supports controlled or uncontrolled) -----
 const getStableRowId = React.useCallback(
  (row: Record<string, any>, index: number) => {
    if (getRowId) return getRowId(row, index);
    const composite = columns.map(c => String(row?.[c.accessor] ?? '')).join('|');
    return composite || String(index);
  },
  [getRowId, columns]
);

  const [uncontrolledSelectedIds, setUncontrolledSelectedIds] = React.useState<string[]>([]);
  const effectiveSelectedIds = selectedRowIds ?? uncontrolledSelectedIds;

  const setSelectedIds = React.useCallback(
    (nextIds: string[]) => {
      if (selectedRowIds === undefined) {
        setUncontrolledSelectedIds(nextIds);
      }
      if (onSelectionChange) {
        const selectedRows = nextIds
          .map(id => {
            const index = data.findIndex((row, rowIndex) => getStableRowId(row, rowIndex) === id);
            return index >= 0 ? data[index] : null;
          })
          .filter((row): row is Record<string, any> => row !== null);
        onSelectionChange(nextIds, selectedRows);
      }
    },
    [selectedRowIds, onSelectionChange, data, getStableRowId]
  );

  const toggleSelection = React.useCallback(
    (rowId: string) => {
      if (!selectable) return;

      if (selectionMode === 'single') {
        setSelectedIds(effectiveSelectedIds.includes(rowId) ? [] : [rowId]);
      } else {
        // multiple
        if (effectiveSelectedIds.includes(rowId)) {
          setSelectedIds(effectiveSelectedIds.filter(existingId => existingId !== rowId));
        } else {
          setSelectedIds([...effectiveSelectedIds, rowId]);
        }
      }
    },
    [selectable, selectionMode, effectiveSelectedIds, setSelectedIds]
  );

  const areAllOnPageSelected = (pageRowsWithIds: string[]) =>
    pageRowsWithIds.length > 0 &&
    pageRowsWithIds.every(id => effectiveSelectedIds.includes(id));

  const areSomeOnPageSelected = (pageRowsWithIds: string[]) =>
    pageRowsWithIds.some(id => effectiveSelectedIds.includes(id)) &&
    !areAllOnPageSelected(pageRowsWithIds);

  // ----- Debounce per-column filters -----
  const debouncedSetFilters = React.useMemo(
    () => debounce((nextFilters: Record<string, string>) => setFilters(nextFilters), 200),
    []
  );
  React.useEffect(() => {
    debouncedSetFilters(rawFilters);
    return () => debouncedSetFilters.cancel();
  }, [rawFilters, debouncedSetFilters]);

  const toggleFilterShown = (accessor: string) => {
    setFilterShown(previous => ({
      ...previous,
      [accessor]: !previous[accessor],
    }));
  };

  const handleSort = (accessor: string) => {
    if (!isSortable) return;
    if (sortBy === accessor) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(accessor);
      setSortAsc(true);
    }
    setCurrentPage(0);
  };

  const handleSortKey = (accessor: string) => (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && isSortable) {
      event.preventDefault();
      handleSort(accessor);
    }
  };

  const handleFilterChange = (accessor: string, value: string) => {
    setRawFilters(previous => ({ ...previous, [accessor]: value }));
    setCurrentPage(0);
  };

  // ----- Global search (NEW) -----
  const normalizedSearch = (searchText ?? '').trim().toLowerCase();

  // ----- Apply filtering (column filters + global search) -----
  const filteredData = React.useMemo(() => {
    const base = !isFilterable ? data : data.filter(row =>
      columns.every(col => {
        const filterValue = (filters[col.accessor] ?? '').toLowerCase();
        const cellValue = String(row[col.accessor] ?? '').toLowerCase();
        return cellValue.includes(filterValue);
      })
    );

    if (!normalizedSearch) return base;

    return base.filter(row => {
      // match if ANY visible column contains the search text
      return columns.some(col => {
        const value = String(row[col.accessor] ?? '').toLowerCase();
        return value.includes(normalizedSearch);
      });
    });
  }, [data, columns, filters, isFilterable, normalizedSearch]);

  // ----- Apply sorting -----
  const sortedData = React.useMemo(() => {
    if (!isSortable || !sortBy) return filteredData;
    const sortedArray = [...filteredData].sort((rowA, rowB) => {
      const valueA = rowA[sortBy];
      const valueB = rowB[sortBy];

      // ensure stable comparison for undefined/null
      if (valueA === valueB) return 0;
      if (valueA === null || valueA === undefined) return 1;
      if (valueB === null || valueB === undefined) return -1;

      // strings vs numbers: rely on JS default > operator behavior
      return valueA > valueB ? 1 : -1;
    });
    return sortAsc ? sortedArray : sortedArray.reverse();
  }, [filteredData, sortBy, sortAsc, isSortable]);

  // ----- Pagination calculations -----
  const hasPagination = typeof pageSize === 'number' && pageSize > 0;
  const totalPages = hasPagination ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;

  const dataToRender = React.useMemo(() => {
    if (!hasPagination || typeof pageSize !== 'number') {
      return sortedData;
    }
    return sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  }, [sortedData, hasPagination, pageSize, currentPage]);

  // compute ids for the current page (for "select all on page")
  const currentPageRowIds = React.useMemo(
    () => dataToRender.map((row, indexOnPage) => {
      const absoluteIndex = hasPagination && typeof pageSize === 'number'
        ? currentPage * pageSize + indexOnPage
        : indexOnPage;
      return getStableRowId(row, absoluteIndex);
    }),
    [dataToRender, hasPagination, pageSize, currentPage, getStableRowId]
  );

  const handleToggleAllOnPage = () => {
    if (selectionMode !== 'multiple') return;
    const allSelected = areAllOnPageSelected(currentPageRowIds);
    if (allSelected) {
      setSelectedIds(effectiveSelectedIds.filter(id => !currentPageRowIds.includes(id)));
    } else {
      const union = new Set([...effectiveSelectedIds, ...currentPageRowIds]);
      setSelectedIds(Array.from(union));
    }
  };

  const startIndex = hasPagination && dataToRender.length > 0
    ? currentPage * (pageSize as number) + 1
    : dataToRender.length > 0
      ? 1
      : 0;

  const endIndex = hasPagination
    ? currentPage * (pageSize as number) + dataToRender.length
    : dataToRender.length;

    const tableClassName = [
    styles.table,
    selectable && styles.selectableRows,
    !isStriped && styles.noAlternateRows,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container} style={{ '--tableLayout': tableLayout } as React.CSSProperties}>
      <div className={styles.tableWrapper}>
        <table className={tableClassName}>
          <thead>
            <tr>
              {selectable && (
                <th className={styles.selectHeader}>
                  {selectionMode === 'multiple' ? (
                    <input
                      type="checkbox"
                      aria-label="Select all rows on this page"
                      checked={areAllOnPageSelected(currentPageRowIds)}
                      ref={element => {
                        if (element) {
                          element.indeterminate = areSomeOnPageSelected(currentPageRowIds);
                        }
                      }}
                      onChange={handleToggleAllOnPage}
                    />
                  ) : (
                    <span className={styles.selectHeaderPlaceholder} />
                  )}
                </th>
              )}

              {columns.map(col => {
                const headerInteractiveProps = isSortable
                  ? {
                      role: 'button' as const,
                      tabIndex: 0,
                      onClick: () => handleSort(col.accessor),
                      onKeyDown: handleSortKey(col.accessor),
                      className: `${styles.headerControls} ${styles.sortableHeader}`,
                    }
                  : { className: styles.headerControls };

                return (
                  <th key={col.accessor}>
                    <div {...headerInteractiveProps}>
                      <span className={styles.headerLabel}>
                        {col.header}
                        {isSortable && sortBy === col.accessor && (
                          sortAsc
                            ? <ArrowSortUpRegular className={styles.sortIcon} aria-hidden="true" focusable={false} />
                            : <ArrowSortDownRegular className={styles.sortIcon} aria-hidden="true" focusable={false} />
                        )}
                      </span>
                      {isFilterable && (
                        <span
                          className={styles.filterIcon}
                          role="button"
                          tabIndex={0}
                          onClick={event => {
                            event.stopPropagation();
                            toggleFilterShown(col.accessor);
                          }}
                          onKeyDown={event => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              event.stopPropagation();
                              toggleFilterShown(col.accessor);
                            }
                          }}
                        >
                          <FilterRegular aria-hidden="true" focusable={false} />
                        </span>
                      )}
                    </div>
                    {isFilterable && filterShown[col.accessor] && (
                      <input
                        type="text"
                        className={styles.filterInput}
                        placeholder="Filter..."
                        value={rawFilters[col.accessor] || ''}
                        onChange={event => handleFilterChange(col.accessor, event.target.value)}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {dataToRender.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={styles.noData}
                >
                  No data available
                </td>
              </tr>
            ) : (
              dataToRender.map((row, indexOnPage) => {
                const absoluteIndex = hasPagination && typeof pageSize === 'number'
                  ? currentPage * pageSize + indexOnPage
                  : indexOnPage;

                const rowId = getStableRowId(row, absoluteIndex);
                const isRowSelected = effectiveSelectedIds.includes(rowId);

                return (
                  <tr
                    key={rowId}
                    className={isRowSelected ? styles.rowSelected : undefined}
                    onClick={() => {
                      toggleSelection(rowId);
                    }}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        toggleSelection(rowId);
                      }
                    }}
                    tabIndex={selectable ? 0 : -1}
                    aria-selected={selectable ? isRowSelected : undefined}
                  >
                    {selectable && (
                      <td
                        className={styles.selectCell}
                        data-label="Select"
                        onClick={event => event.stopPropagation()}
                      >
                        <input
                          type={selectionMode === 'single' ? 'radio' : 'checkbox'}
                          name="responsive-table-selection"
                          aria-label="Select row"
                          checked={isRowSelected}
                          onChange={() => toggleSelection(rowId)}
                        />
                      </td>
                    )}

                    {columns.map((col, columnIndex) => (
                      <td key={columnIndex} data-label={col.header}>
                        {col.renderCell ? col.renderCell(row[col.accessor], row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {hasPagination && (
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Showing {startIndex} to {endIndex} of {sortedData.length} results
            </span>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage(previous => Math.max(previous - 1, 0))}
              disabled={currentPage === 0}
            >
              <ChevronLeftRegular aria-hidden="true" focusable={false} />
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              className={styles.pageButton}
              onClick={() =>
                setCurrentPage(previous => Math.min(previous + 1, totalPages - 1))
              }
              disabled={currentPage + 1 >= totalPages}
            >
              <ChevronRightRegular aria-hidden="true" focusable={false} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveTable;
