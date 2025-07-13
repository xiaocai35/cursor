# 聚贤人力 - 蓝领招聘平台

这是一个专为蓝领工人设计的求职招聘平台前端界面实现，提供完整的求职、入职、薪资管理功能。

## 项目特点

- 🎨 响应式设计，移动端优先（414px 宽度设计）
- 🎯 使用Tailwind CSS提供现代化样式支持
- 💜 统一的紫色主题色彩方案 (#8A33D1)
- 📱 符合移动端用户体验设计
- 💾 本地存储数据持久化
- ⚡ 优化的加载状态和用户反馈

## 核心功能模块

### 1. 求职招聘功能
- **首页** (`index.html`) - 职位列表展示和搜索功能
- **职位详情页** (`job-detail.html`) - 详细岗位信息、薪资福利
- **职位报名** (`job-signup-initial.html`) - 职位申请初始页面
- **报名成功** (`signup-success.html`) - 报名确认页面
- **我的工作** (`my-job.html`) - 个人工作状态管理

### 2. 用户认证系统
- **实名认证** (`real-name-auth.html`) - 用户实名认证流程
- **身份验证** (`identity-verify.html`) - 身份信息验证
- **完善信息** (`complete-info.html`) - 用户信息完善页面

### 3. 个人中心功能
- **个人资料** (`profile.html`) - 用户个人信息管理
- **推荐奖励** (`referral-reward.html`) - 推荐好友奖励系统

### 4. 财务管理系统 ⭐️

#### 4.1 工资预支功能
- **我的预支** (`advance-salary.html`) - 工资预支申请系统
  - 用户状态展示（姓名、职位、工作天数）
  - 智能预支资格检查（入职满7天、月度限制）
  - 三种状态处理：
    - ✅ 符合条件：显示300元预支额度，可申请
    - ⏳ 未满7天：显示剩余天数，按钮禁用
    - 🚫 已申请：显示下月可用时间，按钮禁用
  - 完整申请流程：确认弹窗 → 提交处理 → 成功反馈
  - 预支历史记录展示（状态追踪）
  - 自动生成申请ID和处理时间模拟

#### 4.2 提现记录功能
- **提现记录** (`withdraw-records.html`) - 提现历史管理
  - 统一的记录卡片设计
  - 提现状态标识（成功/处理中/失败）
  - 支付方式图标展示
  - 筛选功能（全部/成功/处理中/失败）
  - 优化的加载状态

#### 4.3 支付方式管理
- **添加银行卡** (`add-bank-card.html`) - 银行卡绑定
  - 完整的表单验证系统
  - Luhn算法银行卡号验证
  - 自动银行识别（工商、建设、招商、中国、农业、交通）
  - 卡号格式化（每4位空格分隔）
  - 中文姓名、手机号、身份证号验证
  - 必要条款同意检查

- **添加支付宝** (`add-alipay.html`) - 支付宝账户绑定
  - 账户类型选择（手机号/邮箱）
  - 动态表单切换
  - 分别验证手机号和邮箱格式
  - 实名信息验证

- **添加微信** (`add-wechat.html`) - 微信账户绑定
  - 绑定方式选择（手机号/二维码上传）
  - 图片上传功能（JPG/PNG，最大5MB）
  - 实时图片预览
  - 手机号验证
  - 文件类型和大小验证

### 5. 企业功能
- **工厂入驻** (`factory-entry.html`) - 企业入驻申请
- **企业信息** (`company-info.html`) - 企业详细信息展示

## 技术实现

### 前端技术栈
- **HTML5** - 语义化标签结构
- **Tailwind CSS** - 实用优先的CSS框架
- **JavaScript ES6+** - 现代JavaScript特性
- **LocalStorage** - 本地数据持久化

### 核心JavaScript模块
- `js/main.js` - 主要功能和导航逻辑
- `js/job-detail.js` - 职位详情页交互
- `js/profile.js` - 个人资料管理
- `js/identity-verify.js` - 身份验证逻辑
- `js/advance-salary.js` - 工资预支核心逻辑
- `js/withdraw-records.js` - 提现记录管理
- `js/add-bank-card.js` - 银行卡添加验证
- `js/add-alipay.js` - 支付宝绑定逻辑
- `js/add-wechat.js` - 微信绑定处理

### 设计规范
- **移动端优先**: 414px 最大宽度设计
- **主题色彩**: 紫色系 (#8A33D1) 为主色调
- **一致性**: 统一的按钮、卡片、表单设计
- **响应式**: 适配不同屏幕尺寸
- **用户体验**: 加载状态、成功反馈、错误处理

## 数据持久化

### LocalStorage 数据结构
```javascript
// 工资预支记录
advanceApplications: [
  {
    id: "ADV_20241201_001",
    amount: 300,
    applyDate: "2024-12-01",
    status: "approved",
    processDate: "2024-12-01"
  }
]

// 支付方式信息
paymentMethods: {
  bankCards: [...],
  alipay: [...],
  wechat: [...]
}

// 用户状态信息
userStatus: {
  hireDate: "2024-11-15",
  monthlyApplications: {...}
}
```

## 业务逻辑特点

### 工资预支业务规则
1. **资格条件**: 入职满7天后可申请
2. **金额限制**: 每次固定300元
3. **频次限制**: 每月只能申请一次
4. **状态管理**: 申请 → 审核 → 发放 → 完成

### 支付方式验证
- **银行卡**: Luhn算法验证 + 银行识别
- **支付宝**: 手机号/邮箱格式验证
- **微信**: 手机号验证 + 图片上传验证

## 启动方式

```bash
# 直接打开主页面
open index.html

# 或者使用本地服务器
python -m http.server 8000
# 访问 http://localhost:8000
```

## 项目结构

```
聚贤人力UI/
├── index.html              # 首页
├── profile.html            # 个人中心
├── advance-salary.html     # 工资预支 ⭐️
├── withdraw-records.html   # 提现记录
├── add-bank-card.html      # 添加银行卡
├── add-alipay.html         # 添加支付宝
├── add-wechat.html         # 添加微信
├── job-detail.html         # 职位详情
├── real-name-auth.html     # 实名认证
├── css/
│   └── styles.css          # 样式文件
├── js/
│   ├── main.js            # 主要逻辑
│   ├── advance-salary.js   # 预支功能 ⭐️
│   ├── withdraw-records.js # 提现记录
│   ├── add-bank-card.js    # 银行卡逻辑
│   ├── add-alipay.js       # 支付宝逻辑
│   ├── add-wechat.js       # 微信逻辑
│   └── profile.js          # 个人资料
└── images/                 # 图片资源
```

## 最新更新

### v2.0.0 (2024-12-01)
- ✨ 新增工资预支功能，支持智能资格检查
- 🔄 重新设计提现记录页面，优化用户体验
- 💳 完善支付方式管理（银行卡、支付宝、微信）
- 🎨 统一紫色主题设计，提升视觉一致性
- 📱 优化移动端响应式设计
- 💾 完善本地数据持久化方案

---

*专为蓝领工人打造的一站式求职招聘平台* 