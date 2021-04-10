import React from 'react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import addSVG from '@plone/volto/icons/circle-plus.svg';
import { blockHasValue } from '@plone/volto/helpers';
import { Icon, BlockChooser } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  addBlock: {
    id: 'Add block',
    defaultMessage: 'Add block',
  },
});

const MutateBlockButton = ({
  block,
  allowedBlocks,
  data,
  onMutateBlock,
  onInsertBlock,
  blocksConfig,
  size = '19px',
  className = 'block-add-button',
}) => {
  const intl = useIntl();
  const { disableNewBlocks } = data;
  const [addNewBlockOpened, setAddNewBlockOpened] = React.useState(false);

  const blockChooserRef = React.useRef();

  const handleClickOutside = React.useCallback((e) => {
    if (
      blockChooserRef.current &&
      doesNodeContainClick(blockChooserRef.current, e)
    )
      return;
    setAddNewBlockOpened(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  return (
    <>
      {!disableNewBlocks && !blockHasValue(data) && (
        <Button
          icon
          basic
          title={intl.formatMessage(messages.addBlock)}
          onClick={() => setAddNewBlockOpened(true)}
          className={className}
        >
          <Icon name={addSVG} className={className} size={size} />
        </Button>
      )}
      {addNewBlockOpened && (
        <BlockChooser
          onMutateBlock={
            onMutateBlock
              ? (id, value) => {
                  setAddNewBlockOpened(false);
                  onMutateBlock(id, value);
                }
              : null
          }
          onInsertBlock={
            onInsertBlock
              ? (id, value) => {
                  setAddNewBlockOpened(false);
                  onInsertBlock(id, value);
                }
              : null
          }
          currentBlock={block}
          allowedBlocks={allowedBlocks}
          blocksConfig={blocksConfig}
          ref={blockChooserRef}
        />
      )}
    </>
  );
};

export default MutateBlockButton;
