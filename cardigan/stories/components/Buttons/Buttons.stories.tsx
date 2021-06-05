import ButtonInline from '@weco/common/views/components/ButtonInline/ButtonInline';
import ButtonOutlined from '@weco/common/views/components/ButtonOutlined/ButtonOutlined';
import ButtonSolid from '@weco/common/views/components/ButtonSolid/ButtonSolid';
import Control from '@weco/common/views/components/Buttons/Control/Control';

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
