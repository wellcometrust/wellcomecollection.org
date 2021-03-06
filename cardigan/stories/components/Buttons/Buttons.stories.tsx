import { useState } from 'react';
import ButtonInline from '@weco/common/views/components/ButtonInline/ButtonInline';
import ButtonOutlined from '@weco/common/views/components/ButtonOutlined/ButtonOutlined';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import DropdownButton from '@weco/common/views/components/DropdownButton/DropdownButton';
import CheckboxRadio from '@weco/common/views/components/CheckboxRadio/CheckboxRadio';
import Control from '@weco/common/views/components/Buttons/Control/Control';
import ToolbarSegmentedControl from '@weco/common/views/components/ToolbarSegmentedControl/ToolbarSegmentedControl';

const ButtonInlineTemplate = args => <ButtonInline {...args} />;
export const buttonInline = ButtonInlineTemplate.bind({});
buttonInline.args = {
  disabled: false,
  text: 'Click me',
  isOnDark: false,
};
buttonInline.storyName = 'ButtonInline';

const ButtonOutlinedTemplate = args => <ButtonOutlined {...args} />;
export const buttonOutlined = ButtonOutlinedTemplate.bind({});
buttonOutlined.args = {
  disabled: false,
  icon: 'eye',
  text: 'Click me',
  isOnDark: false,
};
buttonOutlined.storyName = 'ButtonOutlined';

const ButtonSolidTemplate = args => <ButtonSolid {...args} />;
export const buttonSolid = ButtonSolidTemplate.bind({});
buttonSolid.args = {
  disabled: false,
  icon: 'eye',
  text: 'Click me',
  isBig: false,
};
buttonSolid.storyName = 'ButtonSolid';

const ControlTemplate = args => <Control {...args} />;
export const control = ControlTemplate.bind({});
control.args = {
  text: 'something for screenreaders',
  icon: 'chevron',
  extraClasses: 'control--light',
};
control.storyName = 'Control';

const ToolbarSegmentedControlTemplate = args => {
  const [activeId, setActiveId] = useState('page');

  return (
    <div style={{ padding: '50px', background: '#333' }}>
      <ToolbarSegmentedControl
        activeId={activeId}
        hideLabels={args.hideLabels}
        items={[
          {
            id: 'page',
            icon: 'digitalImage',
            label: 'Page',
            clickHandler: () => setActiveId('page'),
          },
          {
            id: 'grid',
            icon: 'gridView',
            label: 'Grid',
            clickHandler: () => setActiveId('grid'),
          },
        ]}
      />
    </div>
  );
};
export const toolbarSegmentedControl = ToolbarSegmentedControlTemplate.bind({});
toolbarSegmentedControl.args = {
  hideLabels: true,
};
toolbarSegmentedControl.storyName = 'ToolbarSegmentedControl';

const DropdownButtonTemplate = args => {
  return (
    <DropdownButton label={'Filters'} isInline={args.isInline} id="example">
      <div>
        <ul className="plain-list no-margin no-padding">
          <li>
            <CheckboxRadio
              id="1"
              type={`checkbox`}
              text="Manuscripts (1,856)"
            />
          </li>
          <li>
            <CheckboxRadio id="2" type={`checkbox`} text="Archives (1,784)" />
          </li>
          <li>
            <CheckboxRadio id="3" type={`checkbox`} text="Images (2,122)" />
          </li>
          <li>
            <CheckboxRadio id="4" type={`checkbox`} text="Books (12,465)" />
          </li>
        </ul>
      </div>
    </DropdownButton>
  );
};
export const dropdownButton = DropdownButtonTemplate.bind({});
dropdownButton.args = {
  isInline: false,
};
dropdownButton.storyName = 'DropdownButton';
