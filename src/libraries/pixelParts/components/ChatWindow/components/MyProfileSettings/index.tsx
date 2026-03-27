import * as React from 'react';

import DefinitionList from '../../../DefinitionList';
import Switch from '../../../Switch';

import styles from './MyProfileSettings.module.scss';
 
export interface MyProfileSettingsProps {
    /**
     * Indicates whether the profile settings switch is checked.
     */
    checked: boolean;
    /**
     * Callback fired when the switch is toggled.
     * @default () => {}
     */
    onChange: (checked: boolean) => void;
    /**
     * Label for the profile settings switch.
     * @default Personalize your experience by sharing these fields:
     */
    label?: string;
    /**
     * Disclaimer text displayed below the profile data.
     */
    disclaimer?: string;
    /**
     * Profile data to display in the settings.
     */
    userProfile?: { [key: string]: string };
}

const MyProfileSettings = (props: MyProfileSettingsProps): React.ReactElement => {
    const { 
        checked,
        label = 'Personalize your experience by sharing these fields:',
        disclaimer,
        userProfile = {},
        onChange = () => {},
        ...otherProps
    } = props;

    const id = React.useMemo(() => Math.random().toString(36).substring(2, 15), []);

    return (
        <div className={styles.container} {...otherProps}>  
            <div className={styles.switchContainer}>
                <label htmlFor={id}>{label}</label>
                <Switch id={id} onChange={onChange} checked={checked} />
            </div>
            <DefinitionList className={styles.profileData} data={userProfile} />
            {disclaimer}
        </div>
    );
};

export default MyProfileSettings;