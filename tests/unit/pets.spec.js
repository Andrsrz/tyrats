import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import Buefy from 'buefy';
import Pets from '@/views/Pets.vue';
import PetsList from '@/components/PetsList.vue';

/* We import createLocalVue to load Buefy and don't
 * have warnings due to its own components. */
const localVue = createLocalVue();
localVue.use(Buefy);

/* Dummy User */
store.state.user = {
	_id: '',
	username: '',
	type: {},
	token: ''
}

const wrapper = shallowMount(Pets, { store, localVue });

describe('Pets Component', () => {
	it('Should have a PetList Component', () => {
		const petsListComponent = wrapper.findComponent(PetsList);
		expect(petsListComponent.exists()).toBeTruthy();
	});
});
