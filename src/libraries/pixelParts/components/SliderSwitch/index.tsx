import * as React from "react";
import classnames from "classnames";
import * as _ from "lodash";

import { getTextWidth } from "./helpers/textHelper";

import styles from "./SliderSwitch.module.scss";

export interface SliderSwitchProps {
  /**
   * Whether the switch is checked or not.
   */
  checked: boolean;
  /**
   * Callback function to handle change in switch state.
   */
  onChange: (checked: boolean) => void;
  /**
   * The text label to display next to the switch.
   */
  text?: string;
  /**
   * The source URL for the button icon.
   */
  buttonIconSrc: string;
  /**
   * Optional accessibility label for screen readers.
   */
  accessibilityLabel?: string;
  /**
   * Optional flag to disable the switch.
   */
  disabled?: boolean;
}

const SliderSwitch = ({
  checked,
  onChange,
  text,
  buttonIconSrc,
  accessibilityLabel,
  disabled = false,
}: SliderSwitchProps) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [textMaxWidth, setTextMaxWidth] = React.useState(0);

  const id = _.uniqueId("sliderSwitch_");

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  React.useEffect(() => {
    setTextMaxWidth(getTextWidth(text));
  }, [text]);

  return (
    <div className={styles.switchContainer}>
      <label
        aria-label={!text ? accessibilityLabel : undefined}
        htmlFor={id}
        className={classnames(styles.switch, {
          [styles.isChecked]: isChecked,
          [styles.isDisabled]: disabled,
          [styles.compact]: !text,
        })}
        style={
          {
            "--textMaxWidth": `${textMaxWidth}px`,
          } as React.CSSProperties
        }
      >
        <input
          disabled={disabled}
          aria-labelledby={id}
          aria-checked={isChecked}
          className={styles.switchInput}
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.switchButton}>
          <img
            className={styles.switchIcon}
            src={buttonIconSrc}
            aria-hidden="true"
          />
        </span>
        <span className={styles.switchLabelText}>{text}</span>
      </label>
      {accessibilityLabel && (
        <div className={styles.accessibilityLabelPopup} role="tooltip">
          {accessibilityLabel}
        </div>
      )}
    </div>
  );
};

export default SliderSwitch;
