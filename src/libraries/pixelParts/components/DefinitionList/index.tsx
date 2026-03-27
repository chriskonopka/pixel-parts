import * as React from 'react';
import styles from './DefinitionList.module.scss';

export interface DefinitionListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: { [key: string]: string };
}

const DefinitionList = ({ data, ...otherProps }: DefinitionListProps): React.ReactElement => {
  return (
    <div
      className={styles.definitionList}
      role="list"
      aria-label="Definition list"
      {...otherProps}
    >
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className={styles.definitionListItem}
          role="listitem"
        >
          <div role="term">{key}:</div>
          <div role="definition">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default DefinitionList;