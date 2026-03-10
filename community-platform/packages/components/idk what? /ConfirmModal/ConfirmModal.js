import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import 

export const ConfirmModal = (props) => {
  const {
    message,
    confirmButtonText,
    isOpen,
    width,
    confirmVariant = 'primary',
    cancelVariant = 'outline',
  } = props;

  return (
    <Modal
      onDismiss={() => props?.handleCancel()}
      isOpen={isOpen}
      width={width}
      sx={{
        bg: '#EEE7DB',
        border: '1px solid #CFC4B2',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
      }}
    >
      <Flex
        data-cy="Confirm.modal: Modal"
        sx={{
          alignItems: 'flex-start',
          flexDirection: 'column',
          padding: 3,
          gap: 3,
          justifyContent: 'flex-start',
          bg: '#EEE7DB',
        }}
      >
        <Text sx={{ alignSelf: 'stretch', fontWeight: 'bold' }}>
          {message}
        </Text>

        <Flex sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Button
            type="button"
            variant={cancelVariant}
            data-cy="Confirm.modal: Cancel"
            onClick={() => props?.handleCancel()}
          >
            Cancel
          </Button>

          <Button
            type="button"
            aria-label={`Confirm ${confirmButtonText} action`}
            data-cy="Confirm.modal: Confirm"
            variant={confirmVariant}
            onClick={() => props?.handleConfirm()}
          >
            {confirmButtonText}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};