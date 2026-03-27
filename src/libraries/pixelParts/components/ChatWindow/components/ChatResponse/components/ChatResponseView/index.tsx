import * as React from 'react';
import parse, { domToReact } from 'html-react-parser';
import serialize from 'dom-serializer';
import { useMediaQuery } from 'react-responsive';
import { DismissRegular } from '@fluentui/react-icons';

import Button from '../../../../../Button';
import Modal from '../../../../../Modal';
import FlexBox from '../../../../../FlexBox';
import FlexBoxItem from '../../../../../FlexBoxItem';
import CopyButton from '../../../../../CopyButton';

import expandIcon from '../../../../../../../../assets/images/expand.svg';
import collapseIcon from '../../../../../../../../assets/images/collapse.svg';

import styles from './ChatResponseView.module.scss';

const ChatResponseView = ({ html, pdfViewer }: { html: string, pdfViewer?: any }) => {
  const [activeTableIndex, setActiveTableIndex] = React.useState<number | null>(null);
  const [activeTabs, setActiveTabs] = React.useState<('table' | 'document')[]>(['table']);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  const toggleModalFor = (idx: number) => {
    setActiveTableIndex((prev) => (prev === idx ? null : idx));
  };

  let tableIdx = -1;

  React.useEffect(() => {
    if (!activeTableIndex || isSmallScreen) {
      setActiveTabs(['table']);
    }
  }, [activeTableIndex, isSmallScreen]);

  const options = React.useMemo(() => {
    return {
      replace: (node: any) => {
        if (node?.type === 'tag' && node.name === 'a' && node.attribs?.['data-cite']) {
          return (
            <a
              {...node.attribs}
              onClick={(e) => {
                e.preventDefault();        
                setActiveTabs(
                  isSmallScreen ? ['document'] : ['table', 'document']
                );
              }}
            >
              {domToReact(node.children, options as any)}
            </a>
          );
        }
        
        if (node?.type === 'tag' && node.name === 'table') {
          tableIdx += 1;
          const idx = tableIdx;
          const isOpen = activeTableIndex === idx;

          const table = <table>{domToReact(node.children, options as any)}</table>;

          const cleanedHtml = serialize(node).replace(
            /<a\b[^>]*\bdata-cite\b[^>]*>[\s\S]*?<\/a>/gi,
            ''
          );

          const actionButtons = (
            <FlexBox justifyContent="flex-end" spacing={10}>
              <CopyButton
                content={cleanedHtml}
                confirmation={{ duration: 1000, message: 'Copied', type: 'basic' }}
              />
              <button
                className={styles.actionButton}
                type="button"
                onClick={() => toggleModalFor(idx)}
                aria-label={isOpen ? 'Collapse table view' : 'Expand table view'}
              >
                <img
                  src={isOpen ? collapseIcon : expandIcon}
                  width="14"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </FlexBox>
          );

          return (
            <div className={styles.tableContainer}>
              {actionButtons}
              {table}
              {isOpen && (
                <Modal zIndex={20} minWidth="95%">
                  {actionButtons}
                  {isSmallScreen && (
                    <FlexBox spacing={15} margin="0 0 10px">
                      <Button 
                        isActive={activeTabs.includes('table')}
                        variant="white"
                        text="Table" 
                        onClick={() => setActiveTabs(['table'])}
                      />
                      <Button 
                        disabled={!pdfViewer}
                        isActive={activeTabs.includes('document')}
                        variant="white"
                        text="Document" 
                        onClick={() => setActiveTabs(['document'])}
                      />
                    </FlexBox>
                  )}
                  <FlexBox spacing={30} classNames={styles.modalContent}>
                    {activeTabs.includes('table') && (
                      <FlexBoxItem>
                        {table}
                      </FlexBoxItem>
                    )}
                    {(activeTabs.includes('document') && pdfViewer) && (
                      <FlexBoxItem flexGrow={1} classNames={styles.pdfViewer}>
                        {!isSmallScreen && (
                          <FlexBox justifyContent="flex-end" margin="0 0 10px">
                            <Button 
                              icon={<DismissRegular style={{ fontSize: 11, color: 'black' }} aria-hidden="true" focusable={false} />}
                              text="Close" 
                              onClick={() => setActiveTabs(['table'])}
                              variant="transparent"
                            />
                          </FlexBox>
                        )}
                        <div className={styles.viewerContainer}>
                          {pdfViewer}
                        </div>
                      </FlexBoxItem>
                    )}
                  </FlexBox>
                </Modal>
              )}
            </div>
          );
        }

        return undefined;
      },
    };
  }, [activeTableIndex, toggleModalFor]);

  return <>{parse(html, options)}</>;
};

export default ChatResponseView;