import * as React from 'react';
import { FormEvent } from 'react';
import { colors } from '../../styles/colors';
import styles from './Dropdown.module.scss';

export type DropdownVariant = 'dark-multi' | 'light';

export interface DropdownOption {
  key: string;
  text: string;
  disabled?: boolean;
}

export interface DropdownProps {
  /** Choose between the default multi-select dark variant or the new light single-select. */
  variant?: DropdownVariant;
  /** The circle color in the title (dark-multi only). */
  circleColor?: 'blue' | 'purple';
  /** Text shown in the closed dropdown (dark-multi only). */
  displayText?: string;
  /** Optional placeholder (light only). */
  placeholder?: string;
  /** Optional label above the control. */
  label?: string;
  /** Called when selection changes. */
  onChange?: (e: FormEvent<HTMLElement>, item?: DropdownOption) => void;
  /** Initial selected keys (dark-multi) or single selectedKey (light). */
  initialSelectedKeys?: string[];
  /** Controlled selectedKey (light only). */
  selectedKey?: string;
  /** Dropdown options. */
  dropdownOptions: DropdownOption[];
  /** For dark-multi only, whether multiple is allowed. */
  multiSelect?: boolean;
  /** Explicit closed-dropdown width (e.g. '150px' or 200) */
  width?: string | number;
  /** NEW: render as read-only (show value but prevent changes) */
  readOnly?: boolean;
  /** Max height for the options list; overflow will scroll */
  optionsListHeight?: string | number;
}

const toSize = (value?: string | number) =>
  value === null || value === undefined
    ? undefined
    : typeof value === 'number'
    ? `${value}px`
    : value;

const Dropdown: React.FC<DropdownProps> = ({
  variant = 'dark-multi',
  circleColor,
  displayText,
  placeholder,
  label,
  onChange: externalOnChange,
  initialSelectedKeys = [],
  selectedKey,
  dropdownOptions,
  multiSelect = true,
  width,
  readOnly = false,
  optionsListHeight,
}) => {
  // dark-multi state
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(initialSelectedKeys);
  // light single-select state
  const [singleKey, setSingleKey] = React.useState<string>(
    variant === 'light' ? selectedKey ?? initialSelectedKeys[0] ?? '' : ''
  );

  // sync dark-multi
  React.useEffect(() => {
    if (variant === 'dark-multi') {
      const curr = selectedKeys.join(',');
      const next = initialSelectedKeys.join(',');
      if (curr !== next) setSelectedKeys(initialSelectedKeys);
    }
  }, [variant, initialSelectedKeys, selectedKeys]);

  // sync light
  React.useEffect(() => {
    if (variant === 'light') {
      setSingleKey(selectedKey ?? initialSelectedKeys[0] ?? '');
    }
  }, [variant, selectedKey, initialSelectedKeys]);

  const handleSingleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (readOnly) return;
      const key = e.target.value;
      setSingleKey(key);
      const item = dropdownOptions.find(o => o.key === key);
      if (item && externalOnChange) {
        externalOnChange(e as unknown as FormEvent<HTMLElement>, item);
      }
    },
    [readOnly, dropdownOptions, externalOnChange]
  );

  const handleMultiChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (readOnly) return;
      const options = Array.from(e.target.options);
      const next = options.filter(o => o.selected).map(o => o.value);
      setSelectedKeys(next);
      // call onChange for each toggled item (mirrors FluentUI behaviour)
      const added = next.filter(k => !selectedKeys.includes(k));
      const removed = selectedKeys.filter(k => !next.includes(k));
      [...added.map(k => ({ key: k, selected: true })), ...removed.map(k => ({ key: k, selected: false }))].forEach(
        ({ key }) => {
          const item = dropdownOptions.find(o => o.key === key);
          if (item && externalOnChange) {
            externalOnChange(e as unknown as FormEvent<HTMLElement>, item);
          }
        }
      );
    },
    [readOnly, selectedKeys, dropdownOptions, externalOnChange]
  );

  const isDark = variant === 'dark-multi';
  const isMulti = isDark && multiSelect;

  const containerStyle: React.CSSProperties = {
    width: toSize(width),
  };

  const selectStyle: React.CSSProperties = {
    backgroundColor: isDark ? colors.mwsNavy : colors.white,
    color: isDark ? colors.white : colors.mwsNavy,
    border: isDark ? `1px solid ${colors.mwsNavy}` : `1px solid ${colors.mwsStroke}`,
    borderRadius: isDark ? 4 : 6,
    height: isMulti ? undefined : 40,
    minWidth: isDark ? 200 : undefined,
    width: '100%',
    padding: '0 8px',
    fontSize: 14,
    maxHeight: toSize(optionsListHeight),
    overflowY: optionsListHeight ? 'auto' : undefined,
    cursor: readOnly ? 'not-allowed' : 'pointer',
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          htmlFor="pixel-dropdown"
          style={{ display: 'block', marginBottom: 4, fontSize: 15, color: colors.mwsNavy }}
        >
          {label}
        </label>
      )}
      {isMulti ? (
        <select
          id="pixel-dropdown"
          multiple
          disabled={readOnly}
          value={selectedKeys}
          onChange={handleMultiChange}
          style={selectStyle}
          aria-label={label ?? displayText ?? placeholder}
        >
          {displayText && (
            <option value="" disabled>
              <span className={`${styles.circle} ${styles[circleColor || '']}`} />
              {displayText}
            </option>
          )}
          {dropdownOptions.map(option => (
            <option key={option.key} value={option.key} disabled={option.disabled}>
              {option.text}
            </option>
          ))}
        </select>
      ) : (
        <select
          id="pixel-dropdown"
          disabled={readOnly}
          value={singleKey}
          onChange={handleSingleChange}
          style={selectStyle}
          aria-label={label ?? placeholder}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {dropdownOptions.map(option => (
            <option key={option.key} value={option.key} disabled={option.disabled}>
              {option.text}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
