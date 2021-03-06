import Modal from '@weco/common/views/components/Modal/Modal';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import { useState, useRef } from 'react';

const Template = () => {
  const [isActive, setIsActive] = useState(false);
  const openButtonRef = useRef(null);

  return (
    <div style={{ padding: '50px' }}>
      <ButtonSolid
        ref={openButtonRef}
        text={'Show modal'}
        clickHandler={() => setIsActive(true)}
      />
      <Modal
        id={'test'}
        openButtonRef={openButtonRef}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <p>This is a modal window.</p>
      </Modal>
    </div>
  );
};

export const basic = Template.bind({});
basic.args = {};
basic.storyName = 'Modal';
