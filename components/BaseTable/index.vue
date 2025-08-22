<template>
  <div class="tableMain">
    <div class="searchBox-wrapper" v-if="isShowSearchBox">
      <div
        :class="{
          'searchBox-unfold': isUnfold,
          'searchBox-pack-up': !isUnfold,
        }"
        class="searchBox"
        ref="searchBoxRef"
        v-if="isTwoLine"
      >
        <a-flex>
          <slot name="searchBox"></slot>
          <div style="flex: 1"></div>
        </a-flex>
      </div>
      <div
        class="showBtn"
        @click="toggleShow"
        v-show="isShowUnFold && isTwoLine && showToggleBtn"
      >
        <div style="white-space: nowrap">{{ isUnfold ? "收起" : "展开" }}</div>
        <DownOutlined v-if="!isUnfold" />
        <UpOutlined v-else />
      </div>
      <div
        class="searchBtnBox"
        v-if="isDefaultBtn"
        :style="{ marginTop: isTwoLine ? '18px' : '16px' }"
      >
        <a-flex wrap="wrap" :gap="16" style="justify-content: space-between">
          <a-flex :gap="16" wrap="wrap">
            <slot name="searchBtnBoxRear"></slot>
            <a-button
              :icon="h(SearchOutlined)"
              type="primary"
              v-if="isDefaultBtn"
              :loading="isLoading"
              @click="inquire"
              >查询</a-button
            >
            <a-button @click="reset" v-if="isDefaultBtn">重置</a-button>
          </a-flex>
          <a-flex :gap="16" wrap="wrap">
            <slot name="searchBtnBoxFront"></slot>
            <a-button
              style="width: 64px"
              @click="emit('export')"
              v-if="showExport"
              >导出</a-button
            >
          </a-flex>
        </a-flex>
      </div>
    </div>
    <div class="dataBox" :style="{ marginTop: isShowSearchBox ? '20px' : '0' }">
      <slot name="tableUp"></slot>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :scroll="{ x: tableWidth }"
        :pagination="false"
        :loading="isLoading"
        :row-selection="isSelected ? rowSelection : null"
        :rowKey="rowKey"
        :rowClassName="
          (_, index) => (index % 2 === 1 ? 'custom-row even-row' : 'custom-row')
        "
        :style="
          Object.assign(
            {},
            props.isCustomTheadBg
              ? { '--thead-bg': props.isCustomTheadBg }
              : {},
            props.rowBgColor ? { '--row-bg': props.rowBgColor } : {}
          )
        "
      >
        <template #bodyCell="{ column, record }">
          <slot name="bodyCell" :column="column" :record="record"></slot>
        </template>
      </a-table>
    </div>
    <div class="pagingBox" v-if="isPagination">
      <pagingModule
        :total="total"
        :pageSize="pageSize"
        :current="pageNum"
        :pageSizeOptions="pageSizeOptions"
        @update:pageSize="changePageSize"
        @update:current="changePageNum"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, h, computed, nextTick } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import pagingModule from "./pagingModule.vue";
//是否展示 展开收起按钮
const isShowUnFold = ref(true);
//控制搜索框是否展开
const isUnfold = ref(true);
//选择行的key
const selectedRowKeys = ref([]);
//选择行的一整行数据
const selectedData = ref([]);
//搜索框dom
const searchBoxRef = ref(false);
const props = defineProps({
  // 是否显示导出按钮
  showExport: {
    type: Boolean,
    default: true,
  },
  showExport1: {
    type: Boolean,
    default: true,
  },
  showExport2: {
    type: Boolean,
    default: true,
  },
  // 是否显示收起/展开按钮
  showToggleBtn: {
    type: Boolean,
    default: true,
  },
  // 列数据
  columns: {
    type: Array,
    default: () => [],
    required: true,
  },
  //总条数
  total: {
    type: Number,
    default: 0,
  },
  //每一页的数据条数
  pageSize: {
    type: Number,
    default: 10,
  },
  //当前页码
  pageNum: {
    type: Number,
    default: 1,
  },
  //每页条数选择数组
  pageSizeOptions: {
    type: Array,
    default: () => ["5", "10", "15", "20", "30", "40"],
  },
  //表格数据
  tableData: {
    type: Array,
    default: () => [],
    required: true,
  },
  //开启选择的时候的key，当isOptional为true的时候 必填
  rowKey: {
    type: String,
    default: "",
  },
  //是否可选择
  isSelected: {
    type: Boolean,
    default: false,
  },
  //是否多选
  isMultiple: {
    type: Boolean,
    default: false,
  },
  //是否开启两行选择项(如果开启单行选择项，请用这个searchBtnBoxFront插槽代替这个searchBox插槽)
  isTwoLine: {
    type: Boolean,
    default: true,
  },
  //是否展示搜索框（关闭搜索框相关的插槽都不能使用）
  isShowSearchBox: {
    type: Boolean,
    default: true,
  },
  //是否显示默认搜索按钮（就是搜索,重置,展开收起按钮）
  isDefaultBtn: {
    type: Boolean,
    default: true,
  },
  //是否展示分页控制器
  isPagination: {
    type: Boolean,
    default: true,
  },
  //加载表格数据
  inquireData: {
    type: Function,
    default: () => Promise,
  },
  //重置搜索框
  reset: {
    type: Function,
    default: () => Promise,
  },
  //切换每页条数
  changePageSize: {
    type: Function,
    default: (val) => Promise,
  },
  //切换页面
  changePageNum: {
    type: Function,
    default: (val) => Promise,
  },
  isCustomTheadBg: {
    type: String,
    default: "",
  },
  rowBgColor: {
    type: String,
    default: "",
  },
});
const isLoading = ref(false);
const emit = defineEmits(["selectRows", "export"]);

//展开和收起搜索框
const toggleShow = () => {
  isUnfold.value = !isUnfold.value;
};

//查询数据
const inquire = async () => {
  await props.inquireData("child");
};

//重置
const reset = async () => {
  await props.reset();
  inquire();
};

//修改pageSize
const changePageSize = (val) => {
  props.changePageSize(val);
};

//修改pageNum
const changePageNum = (val) => {
  props.changePageNum(val);
};

//计算表格宽度
const tableWidth = computed(() => {
  let width = 0;
  props.columns.forEach((item) => {
    if (!item.fixed) width += item.width;
  });
  return width;
});

//选择行数据的处理
const rowSelection = {
  onSelect: (record, selected) => {
    if (props.rowKey) {
      const key = record[props.rowKey];
      const index = selectedRowKeys.value.findIndex((item) => item === key);
      if (props.isMultiple) {
        addOrDeleteRow(selected, index, record);
      } else {
        selectedRowKeys.value = [record[props.rowKey]];
        selectedData.value = [record];
        triggerSelectRowsEmit();
      }
    } else {
      throw new Error("请设置rowKey属性");
    }
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    // 修复全选后再次点击全选不能全部取消的问题
    if (props.rowKey) {
      if (!selected) {
        // 取消全选时，清空所有已选
        selectedRowKeys.value = [];
        selectedData.value = [];
        triggerSelectRowsEmit();
      } else {
        // 全选
        selectedRows.forEach((item) => {
          const key = item[props.rowKey];
          const index = selectedRowKeys.value.findIndex(
            (item1) => item1 === key
          );
          addOrDeleteRow(selected, index, item);
        });
      }
    } else {
      throw new Error("请设置rowKey属性");
    }
  },
  type: props.isMultiple ? "checkbox" : "radio",
  selectedRowKeys: selectedRowKeys,
};

//用于添加或删除行数据
const addOrDeleteRow = (selected, index, record) => {
  if (selected && index === -1) {
    selectedRowKeys.value.push(record[props.rowKey]);
    selectedData.value.push(record);
  } else if (!selected) {
    if (index !== -1) {
      selectedRowKeys.value.splice(index, 1);
      selectedData.value.splice(index, 1);
    }
  }
  triggerSelectRowsEmit();
};

const triggerSelectRowsEmit = () => {
  if (props.isMultiple) {
    emit("selectRows", selectedRowKeys.value, selectedData.value);
  } else {
    if (selectedRowKeys.value.length === 0) {
      emit("selectRows", null, null);
    } else {
      emit("selectRows", selectedRowKeys.value[0], selectedData.value[0]);
    }
  }
};

//设置是否有折叠按钮
const setIsShowUnFold = () => {
  if (searchBoxRef.value.scrollHeight === 32) {
    isShowUnFold.value = false;
  } else if (searchBoxRef.value.scrollHeight > 32) {
    isShowUnFold.value = true;
  }
};

//防抖函数
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

//初始化选择的数据
const initSelectedData = (selectedList) => {
  if (props.rowKey) {
    selectedRowKeys.value = selectedList.map((item) => item[props.rowKey]);
    selectedData.value = selectedList;
  } else {
    throw new Error("请设置rowKey属性");
  }
};

onMounted(() => {
  setIsShowUnFold();
  window.addEventListener("resize", debounce(setIsShowUnFold, 100));
  // window.addEventListener('resize', debounce(setIsShowUnFold))
});

defineExpose({
  inquire, //加载数据方法
  initSelectedData, //初始化选中数据
  isLoading, //加载状态
});
</script>

<style scoped lang="less">
@ant-prefix: ant;

.searchBox-wrapper {
  background: #fff;
  padding: 10px;
  margin: 7px;
  border-radius: 15px;
  position: relative;
}

.searchBox {
  display: flex;
  gap: 16px;
  width: 90%;
}

.searchBox-pack-up {
  height: 32px;
  overflow-y: hidden;
}

.searchBox-unfold {
  height: auto;
}

.searchBtnBox {
  margin-top: 20px;
}

.showBtn {
  color: #1677ff;
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  width: 10%;
  justify-content: end;
}

.showBtn.ant-space-align-center {
  align-items: flex-start !important;
  margin-top: 6px;
}

.dataBox {
  margin-top: 20px;
  background: #fff;
  border-radius: 15px;
  padding: 10px;
  margin: 0 7px;
}

.even-row {
  background: #f2f2f2;
}

:deep(.@{ant-prefix}-table-row:nth-child(odd)) {
  background-color: var(--row-bg, #f2f2f2);
}

:deep(.@{ant-prefix}-table-row:nth-child(odd))
  .@{ant-prefix}-table-cell-fix-right {
  background-color: var(--row-bg, #f2f2f2) !important;
}

:deep(.@{ant-prefix}-table-tbody > tr:hover),
:deep(.@{ant-prefix}-table-tbody > tr:nth-child(even):hover),
:deep(.@{ant-prefix}-table-tbody > tr:nth-child(even):hover > td) {
  background-color: #d1d1d1 !important;
}

:deep(.@{ant-prefix}-table-tbody > tr:hover > td) {
  background-color: #d1d1d1 !important;
}

:deep(.@{ant-prefix}-table-tbody > tr:nth-child(odd):hover),
:deep(.@{ant-prefix}-table-tbody > tr:nth-child(odd):hover > td) {
  background-color: #d1d1d1 !important;
}

:deep(.@{ant-prefix}-table-thead > tr > th) {
  background-color: var(--thead-bg, #f2f2f2);
}

:deep(.@{ant-prefix}-form-item) {
  margin-bottom: 0 !important;
}

.ball {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.pagingBox {
  margin: 10px 7px;
  background: #fff;
  border-radius: 15px;
  padding: 10px;
}

:deep(.ant-pagination-options-size-changer .ant-select-selector) {
  width: 100px !important;
}

.cell-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
  vertical-align: bottom;
}
</style>
