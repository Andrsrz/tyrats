<template lang='pug'>
section#vaccination-list
	ErrorMessage( v-if='noRecords' :message='errorMessage' )
	b-table#vaccination-table(
		v-if='!noRecords'
		:data='records'
		:bordered='isBordered'
		:mobile-cards='hasMobileCards'
		style='margin-top: 5px'
	)
		b-table-column#application-date(
			field='applicationDate'
			label='Application Date'
			v-slot='props'
		) {{ props.row.applicationDate }}
		b-table-column#shot(
			field='shot'
			label='Shot'
			v-slot='props'
		) {{ props.row.shot }}
		b-table-column#medic(
			field='medic'
			label='Medic'
			v-slot='props'
		) {{ props.row.medic }}
		b-table-column#next-date(
			field='nextDate'
			label='Next Application Date'
			v-slot='props'
		) {{ props.row.nextApplicationDate }}
</template>

<script lang='js'>
import ErrorMessage from '@/components/ErrorMessage.vue'

export default {
	name: 'VaccinationList',
	components: { ErrorMessage },
	props: {
		records: {
			type: Array,
			required: true
		}
	},
	data(){
		return{
			errorMessage: 'There are no Vaccination/Deworming Records for this pet. Add one!',
			noRecords: true
		}
	},
	watch: {
		records: function(){
			if(this.records.length <= 0)
				this.noRecords = true
			else
				this.noRecords = false
		}
	}
}
</script>
