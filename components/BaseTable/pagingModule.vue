<template>
  <div>
    {{ test }}
    <a-flex justify="space-between" wrap="wrap">
      <a-space>
        <span class="text">共 {{ pagination.total }} 条记录</span>
        <span class="text">第 {{ pagination.current }}/{{ pagination.totalPage }} 页</span>
      </a-space>
      <a-pagination 
        :current="pagination.current" 
        :pageSize="pagination.pageSize" 
        show-quick-jumper
        showSizeChanger
        :total="props.total" 
        @change="onChange"
        :pageSizeOptions="props.pageSizeOptions"
      />
    </a-flex>

  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
const props = defineProps({
  current: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizeOptions: {
    type: Array,
    default: () => {
      return ['10', '20', '30', '40']
    }
  }
})
const emit = defineEmits(['update:pageSize', 'update:current'])

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  totalPage: 0
})
const test = computed(() => {
  pagination.current = props.current
  pagination.pageSize = props.pageSize
  pagination.total = props.total
  pagination.totalPage = Math.ceil(pagination.total / pagination.pageSize)
  return null
})

const onChange = (page, pageSize) => {
  if(page !== pagination.current){
    emit('update:current', page)
  }
  if(pageSize !== pagination.pageSize){
    emit('update:pageSize', pageSize)
  }
}
</script>

<style scoped>
.text {
  font-size: 16px;
}
</style>