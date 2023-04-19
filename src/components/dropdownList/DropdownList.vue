<template>
  <div class="custom-select">
    <input
      type="text"
      v-model="selectedValue"
      @click="showDropdown"
      @blur="hideDropdown"
      @keydown.arrow-down="highlightNextOption"
      @keydown.arrow-up="highlightPreviousOption"
      @keydown.enter="selectOption"
      class="custom-select__input"
    />
    <ul v-show="dropdownVisible" class="custom-select__dropdown">
      <li
        v-for="(option, index) in items"
        :key="index"
        :class="{ 'custom-select__option': true, 'custom-select__option--active': index === highlightedIndex }"
        @click="selectOption(index)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, watch } from 'vue';

interface IProps {
  label?: string;
  modelValue: string;
  items: unknown[];
}

interface IEmit {
  (e: 'update:value', value: string): void;
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
    selectedValue.value = props.items[index];
    hideDropdown();
    // emit('update:value', selectedValue.value);
  }
}

watch(
  selectedValue,
  () => emit('update:value', selectedValue.value)
)

</script>

<!-- <script lang="ts">
import { ref, computed, defineEmits, defineProps } from 'vue';

interface IProps {
  label: string;
  value: string;
  items: unknown[];
}

interface Option {
  label: string;
  value: any;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
}

interface CustomSelectEmits {
  'update:value': (value: string) => void;
}

export default {
  props: defineProps<CustomSelectProps>({
    options: {
      type: Array as () => Option[],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }),

  emits: defineEmits<CustomSelectEmits>(['update:value']),

  setup(props, { emit }) {
    const selectedValue = ref(props.value);
    const dropdownVisible = ref(false);
    const highlightedIndex = ref(0);

    const filteredOptions = computed(() => {
      return props.options.filter(option => {
        return option.label.toLowerCase().includes(selectedValue.value.toLowerCase());
      });
    });

    function showDropdown() {
      dropdownVisible.value = true;
    }

    function hideDropdown() {
      dropdownVisible.value = false;
    }

    function highlightNextOption() {
      if (highlightedIndex.value < filteredOptions.value.length - 1) {
        highlightedIndex.value++;
      }
    }

    function highlightPreviousOption() {
      if (highlightedIndex.value > 0) {
        highlightedIndex.value--;
      }
    }

    function selectOption(index: number) {
      if (filteredOptions.value[index]) {
        selectedValue.value = filteredOptions.value[index].label;
        hideDropdown();
        emit('update:value', selectedValue.value);
      }
    }

    return {
      selectedValue,
      dropdownVisible,
      highlightedIndex,
      filteredOptions,
      showDropdown,
      hideDropdown,
      highlightNextOption,
      highlightPreviousOption,
      selectOption,
    };
  },
};
</script> -->

<style lang="scss" scoped>
@use './dropdownList.scss';
</style>
 
