import { mount } from '@vue/test-utils';
import Text from '../Text.vue';
import { describe, it, expect } from 'vitest';

describe('Text', () => {
  const props = {
    text: 'abc'
  };

  it('should be rendered', () => {
    const wrapper = mount(Text);

    expect(wrapper).not.toBeNull();
  });

  it('should be rendered with appropriate props', () => {
    const wrapper = mount(Text, { props });

    expect(wrapper.text()).toBe(props.text);
  });
});
