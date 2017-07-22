## SASS开发注意事项

### 文件目录

* `base`       
基于第三方库包含`reset`、`mixin`、`function`、`var`基础配置;基础配置决定页面主要UI

* `component`
常见组件划分`btn`、`form`、`table`等

* `includes`
主要包含一些ui组件的样式

* `layouts` 
通用布局包含、头部布局、底部布局；`layout.scss`、`heder.scss`、 `footer.sacss`、`aside.scss`

* `vender.scss` 
用于覆盖第三方库的`css`,如果能在UI库源码里面改，就在ui库源码里面改

* `common.scss`
不写入任何的样式，用于导入所有的'scss'

### 命名原则

* 连字符一律使用'-',不得使用驼峰命名以及下划线命名
* 通用全局功能性命名简`clearfix`、`pull-left`
* 状态类命名用`active`、`select`表示选中与未选中
* 常见命名应该按照约定俗成的命名(常见命名见后面)

### scss书写原则

* 不可以在id上应用css样式（重要）
* 


### 组件样式原则

### 常见命名规范
 