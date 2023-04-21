<template>
  <div class="custom-select">
    <input
      type="text"
      v-model="selectedValue"
      @click="showDropdown"
      @keydown.arrow-down="highlightNextOption"
      @keydown.arrow-up="highlightPreviousOption"
      @keydown.enter="selectOption(highlightedIndex)"
      class="custom-select__input"
    />
    <ul v-show="dropdownVisible" class="custom-select__dropdown">
      <li
        v-for="(option, index) in items"
        :key="index"
        :class="{ 'custom-select__option': true, 'custom-select__option--active': index === highlightedIndex }"
        @click.stop="selectOption(index)"
      >
        {{ itemLabel(option) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, watch } from 'vue';

interface IProps {
  itemLabel: (value: any) => string;
  modelValue: string;
  items: unknown[];
}

interface IEmit {
  (e: 'update:value', value: string): void;
  (e: 'select', value: any): void;
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmit>()

const selectedValue = ref(props.modelValue);
const dropdownVisible = ref(false);
const highlightedIndex = ref(0);

function showDropdown() {
  dropdownVisible.value = true;
}

function hideDropdown() {
  dropdownVisible.value = false;
}

function highlightNextOption() {
  if (highlightedIndex.value < props.items.length - 1) {
    highlightedIndex.value++;
  }
}

function highlightPreviousOption() {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
}

function selectOption(index: number) {
  if (props.items[index]) {
    emit('select', props.items[index]);
    hideDropdown();
  }
}

watch(
  selectedValue,
  () => emit('update:value', selectedValue.value)
)

</script>

<style lang="scss" scoped>
@use './dropdownList.scss';
</style>
 
