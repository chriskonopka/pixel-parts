import * as React from 'react';
import classnames from 'classnames';
import styles from './Switch.module.scss';

type Size = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Controlled checked state (if provided, component becomes controlled) */
  checked?: boolean;
  /** Uncontrolled initial state */
  defaultChecked?: boolean;
  /** Callback when value changes */
  onChange?: (checked: boolean) => void;
  /** Disable interaction */
  disabled?: boolean;
  /** Visual size */
  size?: Size;
  /** Additional className for the root element */
  className?: string;
  /** ID for accessibility pairing with an external label */
  id?: string;
  /** Label text */
  label?: string;
}

const Switch = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  className,
  id,
  label,
  ...otherProps
}: SwitchProps): React.ReactElement => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);

  React.useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked, isControlled]);

  const value = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (!isControlled) setInternalChecked(false);
      onChange?.(false);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!isControlled) setInternalChecked(true);
      onChange?.(true);
    }
  };

  const Container = id ? 'label' : 'div';

  return (
    <Container className={styles.label} htmlFor={id}>
      {label && <span>{label}</span>}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        aria-disabled={disabled || undefined}
        aria-label={!id && label ? label : undefined}
        onClick={toggle}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className={classnames(
          styles.root,
          styles[size],
          value && styles.checked,
          disabled && styles.disabled,
          className
        )}
        {...otherProps}
      >
        <span className={styles.track} />
        <span className={styles.thumb} />
      </button>
    </Container>
  );
};

export default Switch;