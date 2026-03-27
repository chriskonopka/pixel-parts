import * as React from "react";
import classnames from 'classnames';
import styles from './Accordion.module.scss';

export interface AccordionProps extends React.HTMLProps<HTMLDivElement> {
    /** The content of the accordion, typically AccordionItem components. */
    children: React.ReactNode;
    /** Additional class names to apply to the accordion for custom styling */ 
    classNames?: string;
    /** The visual style variant of the accordion. */
    variant?: 'gray' | 'navy';
    /** The index of the accordion item that should be open by default. */
    defaultOpenIndex?: number
}

const Accordion = (props: AccordionProps): React.ReactElement => {
    const {
        children,
        classNames,
        variant = 'gray',
        defaultOpenIndex = 0,
        ...others
    } = props;

    return (
           <div
                className={classnames(styles.accordion, styles[variant], classNames)}
                {...others}
            >
            {React.Children.map(children, (child, index) => {
                const isOpen = React.isValidElement<{ isOpen?: boolean }>(child) 
                    ? child.props.isOpen || defaultOpenIndex === index
                    : defaultOpenIndex === index;

                return React.cloneElement(child as React.ReactElement<any>, { 
                    key: index, 
                    labelText: (index + 1).toString(),
                    isOpen
                });
            })}
        </div>
    );
};

export default Accordion;