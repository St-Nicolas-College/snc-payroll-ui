<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <template #activator="{ props }">
        <v-btn color="primary" variant="elevated" class="mr-4" size="small" v-bind="props" @click="openDialog">
          <v-icon start>mdi-plus</v-icon> Add
        </v-btn>
        <!-- <v-btn v-bind="props" variant="elevated" flat size="small" color="blue">
        <v-icon start>mdi-pencil</v-icon> Edit
      </v-btn> -->
      </template>

      <v-card>
        <v-card-title class="d-flex align-center">
          Log Item Acquisition
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" flat icon><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid" @submit.prevent="handleSubmit">
            <v-select v-model="form.borrower" :rules="[rules.required]" :items="borrowers" item-title="name"
              item-value="id" label="Acquired By" return-object required />
            <v-text-field v-model="form.quantity" :rules="[rules.required, rules.numeric, rules.positive]"
              label="Quantity" type="number" min="1" required />
            <v-textarea v-model="form.remarks" label="Remarks" rows="2" />
            <v-date-input prepend-icon="" prepend-inner-icon="$calendar" v-model="form.acquired_at"
            :display-format="format" label="Date input"></v-date-input>
            <v-autocomplete v-model="form.tag_id" :items="availableTags" item-title="tag_number" item-value="documentId"
              label="Select Tag Number" return-object></v-autocomplete>
            <v-btn type="submit" color="primary" class="mt-4" block>Save</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const { triggerToast } = useToast()
const baseUrl = useRuntimeConfig().public.strapiBaseURL
const props = defineProps({
  itemId: [String, Number],
  totalItemQuantity: Number,
  totalAcquired: Number
})
const rules = {
  required: (v) => !!v || 'Required',
  numeric: (v) => !isNaN(Number(v)) || 'Must be a number',
  positive: (v) => Number(v) > 0 || 'Must be greater than 0',
}
const emit = defineEmits(['saved'])
const dialog = ref(false)
const loading = ref(false)
const borrowers = ref([])
const form = reactive({
  borrower: null,
  quantity: 1,
  remarks: '',
  acquired_at: '',
  tag_id: null
})

const openDialog = () => {
  dialog.value = true
  fetchBorrowers()
  fetchAvailableTags()
}

const fetchBorrowers = async () => {
  const res = await $fetch(`${baseUrl}/api/borrowers`, {
    headers: { Authorization: `Bearer ${token.value}` }
  })
  borrowers.value = res.data
}

const handleSubmit = async () => {
   emit('saved')
}
</script>

<style>

</style>