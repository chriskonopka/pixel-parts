import * as React from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * The label prop is the text displayed next to the checkbox.
   */
  label: string;
  
  /**
   * The checked prop determines if the checkbox is checked.
   */
  checked: boolean;
  
  /**
   * The onChange prop is the function called when the checkbox state changes.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked?: boolean) => void;
  
  /**
   * The disabled prop determines if the checkbox is disabled.
   */
  disabled?: boolean;

  /**
   * The id prop is the unique identifier for the checkbox.
   */
  id: string;
}

const Checkbox = ({ label, checked, onChange, disabled = false, id, ...rest }: CheckboxProps): React.ReactElement => {
  return (
    <div className={styles.checkboxContainer} {...rest}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(event) => onChange(event, event.target.checked)}
        disabled={disabled}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>{label}</label>
    </div>
  );
};

export default Checkbox;