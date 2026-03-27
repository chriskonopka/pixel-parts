import * as React from 'react';

import styles from './CitationSettings.module.scss';

import crossHairsIcon from '../../../../../../assets/images/crosshairs.svg';
import documentSearchIcon from '../../../../../../assets/images/document-search.svg';
import lightningBoltIcon from '../../../../../../assets/images/lightning-bolt.svg';
import checkMarkBlue from '../../../../../../assets/images/check-mark-blue.svg';

type SettingType = "Exact" | "Summary" | "None";

export interface Setting {
    title: string;
    description: string;
    iconUrl?: string;
    type: string;
    instructions: string;
}

export interface CitationSettingsProps {
    /**
     * Callback function to handle citation type selection.
     * @default () => {}
     */
    onClick: (selectedSetting: SettingType, index: number) => void;
    /**
     * Array of citation setting options to display.
     * @default []
     */
    settings: Setting[];
    /**
     * Currently selected citation type option.
     * @default Exact
     */
    selectedOption?: SettingType;
    /**
     * Additional text to display above the citation settings.
     */
    text?: string | React.ReactNode;
}

const fallbackIcons = {
    'Exact': crossHairsIcon,
    'Summary': documentSearchIcon,
    'None': lightningBoltIcon
};

const CitationSettings = (props: CitationSettingsProps): React.ReactElement => {
    const { 
        onClick = () => {}, 
        settings = [], 
        selectedOption = 'Exact',
        text,
        ...otherProps
    } = props;
    const [selectedOptionState, setSelectedOptionState] = React.useState<SettingType>(selectedOption);

    const handleOptionClick = (selectedSetting: SettingType, index: number) => {
        setSelectedOptionState(selectedSetting);
        onClick(selectedSetting, index);
    };

    React.useEffect(() => {
        setSelectedOptionState(selectedOption);
    }, [selectedOption]);

    return (
        <div className={styles.citationSettings} {...otherProps}>
            {text && <p className={styles.citationSettingsText}>{text}</p>}
            {settings.map((option, index) => {
                const isChecked = option.type === selectedOptionState;
                return (
                    <label className={styles.citationSettingsButton} htmlFor={`option-${index}`} key={option.title}>
                        <span className={styles.citationButtonContentContainer}>
                            <span className={styles.citationButtonContent}>
                                <span className={styles.citationButtonContentTitle}>
                                    <img 
                                        src={option.iconUrl || fallbackIcons[option.type]} 
                                        alt={option.title}
                                        width={20}
                                    />
                                    <span>{option.title}</span>
                                </span>
                                <span className={styles.citationButtonContentDescription}>
                                    {option.description}
                                </span>
                            </span>
                        </span>
                        <span className={styles.citationButtonCheckMark}>
                            {isChecked && <img src={checkMarkBlue} alt="check mark" width="24" />}
                        </span>
                        <input 
                            id={`option-${index}`}
                            className={styles.citationSettingsCheckbox} 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={() => handleOptionClick(option.type as SettingType, index)}
                        />
                    </label> 
                );
            })}
        </div>
    );
};

export default CitationSettings;