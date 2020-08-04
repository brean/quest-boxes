import { shallowMount } from '@vue/test-utils';
import Overview from '@/components/Overview.vue';

describe('Overview.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Overview, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
