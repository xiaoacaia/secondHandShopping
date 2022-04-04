<script setup>
import { ref, computed } from 'vue'

const indexRef = ref([1, 2, 3])
const arr = [1, 2, 3, 4, 5]
const data = computed(() => indexRef.value.map(i => arr[i]))
console.log(data)  // [2, 3, 4]

setTimeout(() => {
  indexRef.value = [0]
  console.log(data)  // [1]
}, 100)


</script>

<template></template>