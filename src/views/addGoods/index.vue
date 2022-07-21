<template>
  <div>
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps
        :active="active - 0"
        finish-status="success"
        align-center
        style="margin-bottom: 20px"
      >
        <el-step
          :title="item"
          v-for="(item, index) in goodsOption"
          :key="index"
        ></el-step>
      </el-steps>
      <el-form :model="addGoodsForm" :rules="rules" ref="addForm">
        <el-tabs tab-position="left" @tab-click="toggleTabs">
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input
                type="number"
                v-model.number="addGoodsForm.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                type="number"
                v-model="addGoodsForm.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                type="number"
                v-model="addGoodsForm.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                :options="CategoriesList"
                :props="{ value: 'cat_id', label: 'cat_name' }"
                style="display: block; width: 250px"
                v-model="addGoodsForm.goods_cat"
                @change="changeChoose"
              />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item
              v-for="(item, index) in attrs"
              :key="index"
              :label="item.attr_name"
              @click.native="clickCheckBox(item, index)"
            >
              <el-row :gutter="20" v-show="!showCheckBox.includes(index)">
                <el-col :span="24">
                  <el-checkbox
                    border
                    v-for="(item1, index) in item.attr_vals.split(' ')"
                    :key="index"
                    :label="item1"
                    checked
                    @change="delChecked(item, index)"
                  ></el-checkbox>
                </el-col>
              </el-row>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item
              v-for="item in goodsProps"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              action="#"
              list-type="picture"
              :on-change="handleChange"
              :file-list="fileList"
              :http-request="upLoad"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <quill-editor
              class="ql-editor"
              v-model="content"
              ref="QuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
            ></quill-editor>
            <el-button
              type="primary"
              style="margin-left: 15px"
              @click="addGoods"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getAllCategories, getGoodsAttr } from '@/api/categories'
import { addGoods } from '@/api/goods'
export default {
  created () {
    this.getAllCategories()
  },
  data () {
    return {
      active: 0,
      addGoodsForm: {
        goods_name: '', // 商品名称
        goods_cat: '', // 以为','分割的分类列表
        goods_price: 0, // 价格
        goods_number: 0, // 数量
        goods_weight: 0, // 重量
        goods_introduce: '', // 介绍
        pics: [], // 上传的图片临时路径（对象）
        attrs: [] // 商品的参数（数组），包含 动态参数 和 静态属性
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2~8个字符', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '分类列表不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' }
        ]
      },
      goodsOption: ['基本信息', '商品参数', '商品属性', '商品图片', '商品内容', '完成'],
      CategoriesList: [], // 商品分类列表
      // chooseValue: [], // 选中的商品分类
      attrs: [], // 商品参数
      cat_id: '',
      showCheckBox: [], // 用于决定每一个form-item下的多选框是否显示
      goodsProps: [], // 商品属性
      fileList: [], // 上传的文件列表
      // 富文本编辑器
      content: '',
      editorOption: {
        placeholder: '请在这里输入',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], // 引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: 'ordered' }, { list: 'bullet' }], // 列表
              [{ script: 'sub' }, { script: 'super' }], // 上下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ direction: 'rtl' }], // 文本方向
              [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: [] }], // 字体
              [{ align: [] }], // 对齐方式
              ['clean'], // 清除字体样式
              ['image'] // 上传图片
              // ['image','video','link']    //上传图片、上传视频、上传文件
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 调用iview图片上传
                  document.querySelector('.upload-demo .ivu-btn').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    async getAllCategories () {
      this.CategoriesList = await getAllCategories()
    },
    async toggleTabs (el) {
      this.active = el.index
      if (el.index === '1') {
        // 商品参数
        const id = this.cat_id ? this.cat_id : 6
        this.attrs = await getGoodsAttr(id, 'many')
        // const res = await getGoodsAttr(id, 'many')
        // // eslint-disable-next-line no-return-assign
        // this.attrs = res.map(item => item.checked = true)
      } else if (el.index === '2') {
        // 商品属性
        const id = this.cat_id ? this.cat_id : 6
        this.goodsProps = await getGoodsAttr(id, 'only')
      } else if (el.index === '3') {
        // 商品图片

      } else {
        // 商品内容
      }
    },
    changeChecked (t) {
      console.log(t)
    },
    delChecked (item, index) {
      // console.log(item, index)
      this.attrs.forEach(obj => {
        if (obj === item) {
          const arr = obj.attr_vals.split(' ')
          arr.splice(index, 1)
          obj.attr_vals = arr.join(' ')
        }
      })
      // console.log(1)
    },
    clickCheckBox (item, index) {
      if (item.attr_vals === '') {
        this.showCheckBox.push(index)
      }
    },
    handleChange (file, fileList) {
      // console.log(file, fileList)
      this.fileList = fileList.map(item => item)
    },
    upLoad (params) {
      console.log(params)
    },
    // 获取富文本编辑器的内容
    onEditorChange (e) {
      // console.log(e, '内容改变事件')
      this.addGoodsForm.goods_introduce = e.html
    },
    async addGoods () {
      try {
        await this.$refs.addForm.validate()
        this.addGoodsForm.attrs = [...this.attrs, ...this.goodsProps]
        await addGoods(this.addGoodsForm)
        this.$message.success('添加商品成功')
        this.$router.push('/goods')
      } catch (err) {
        this.$message.error('请填写必填项')
      }
    },
    // 选择分类
    changeChoose (val) {
      console.log(val)
      this.addGoodsForm.goods_cat = val.join(',')
      // console.log(this.addGoodsForm.goods_cat)
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
:deep(.el-form-item__label) {
  display: block;
}
:deep(.ql-container) {
  height: 300px;
}
</style>
