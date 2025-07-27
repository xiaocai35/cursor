// 聚贤人力 - 微信视频号分享页面交互脚本

// 全局变量
let currentJobInfo = null;
let isGenerating = false;
let isPlaying = false;
let isMuted = false;
let isLandscape = true; // 当前视频格式
let currentGenerationType = '';

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取岗位信息
    loadJobInfo();
    
    // 初始化页面内容
    initializePage();
    
    // 初始化视频播放器
    initializeVideoPlayer();
});

// ==================== 数据加载 ====================

// 加载岗位信息
function loadJobInfo() {
    try {
        const jobInfoStr = sessionStorage.getItem('currentJobInfo');
        if (jobInfoStr) {
            currentJobInfo = JSON.parse(jobInfoStr);
        } else {
            currentJobInfo = getDefaultJobInfo();
        }
    } catch (error) {
        console.error('加载岗位信息失败:', error);
        currentJobInfo = getDefaultJobInfo();
    }
}

// 获取默认岗位信息
function getDefaultJobInfo() {
    return {
        title: '公寓宿舍 免费体检',
        company: '珠海伟创力',
        location: '广东省·珠海市',
        salary: '22元/时',
        tags: ['报销车票', '可借支', '包住', '免费体检', '空调宿舍'],
        benefits: [
            '发薪日期：华辉发薪日每月12号',
            '22元/小时=21+1元全勤奖金',
            '体检补贴：免费',
            '车票报销：200.00元'
        ],
        description: '招聘企业：两班倒、坐班、普通生产线(有空调)/无尘车间',
        workType: '普工、学徒、普通车间/无尘车间'
    };
}

// ==================== 页面初始化 ====================

// 初始化页面
function initializePage() {
    // 更新标题和内容显示
    updateTitleDisplay();
    updateContentDisplay();
    
    // 添加动画效果
    addAnimationEffects();
}

// 更新标题显示
function updateTitleDisplay() {
    const titleArea = document.getElementById('titleArea');
    if (currentJobInfo) {
        const title = generateWechatVideoTitle(currentJobInfo);
        titleArea.innerHTML = `<div class="text-base font-medium text-gray-800">${title}</div>`;
    }
}

// 更新内容显示
function updateContentDisplay() {
    const contentArea = document.getElementById('contentArea');
    if (currentJobInfo) {
        const content = generateWechatVideoContent(currentJobInfo);
        contentArea.innerHTML = `<div class="text-sm professional-text text-gray-700">${content}</div>`;
    }
}

// ==================== 内容生成 ====================

// 生成微信视频号标题
function generateWechatVideoTitle(jobInfo, style = 'professional') {
    const templates = {
        professional: generateProfessionalTitle,
        detailed: generateDetailedTitle,
        urgent: generateUrgentTitle,
        informative: generateInformativeTitle
    };
    
    const generator = templates[style] || templates.professional;
    return generator(jobInfo);
}

// 生成专业正式标题
function generateProfessionalTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `🏭 ${location}高薪工厂招聘：月薪过万，五险一金包住宿，无经验可培训（50个名额）`,
        `📢 ${jobInfo.company}招聘公告：${jobInfo.salary}生产操作员，福利优厚待遇丰厚`,
        `💼 ${location}制造业招聘：${jobInfo.salary}+五险一金+免费住宿，正规企业长期稳定`,
        `🎯 ${location}工厂直招：${jobInfo.title}岗位${jobInfo.salary}，包住宿管吃住培训上岗`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成详细全面标题
function generateDetailedTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `📋 ${location}${jobInfo.company}正式招聘：${jobInfo.title}${jobInfo.salary}，五险一金包住宿包培训，名额有限先到先得`,
        `🏢 知名企业${jobInfo.company}招聘：${location}生产基地${jobInfo.salary}招工，完善福利体系等你加入`,
        `💯 ${location}正规工厂招聘：${jobInfo.salary}生产操作员，五险一金+免费住宿+技能培训+职业发展`,
        `🌟 ${jobInfo.company}${location}分公司招聘：${jobInfo.salary}+完善福利+免费住宿+带薪培训，诚聘优秀人才`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成紧急招聘标题
function generateUrgentTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `⚡ 紧急招聘！${location}${jobInfo.company}急需${jobInfo.title}50人，${jobInfo.salary}五险一金包住宿`,
        `🚨 ${location}工厂紧急扩招：${jobInfo.salary}生产操作员，包住宿包培训，立即上岗`,
        `⏰ 限时招聘！${location}${jobInfo.company}急招员工50名，${jobInfo.salary}待遇优厚福利丰富`,
        `🔥 ${location}工厂急招：${jobInfo.salary}+五险一金+包住宿，无经验可培训，名额紧张`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成信息型标题
function generateInformativeTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `📊 ${location}制造业薪资调研：${jobInfo.company}${jobInfo.salary}招聘，行业薪资水平分析`,
        `📈 ${location}就业市场分析：${jobInfo.company}提供${jobInfo.salary}岗位，附完整福利待遇说明`,
        `🎓 ${location}工厂就业指南：${jobInfo.company}${jobInfo.salary}招聘详解，求职者必看`,
        `💡 ${location}求职攻略：${jobInfo.company}${jobInfo.salary}岗位深度解析，就业机会分享`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成微信视频号内容
function generateWechatVideoContent(jobInfo, style = 'professional') {
    const templates = {
        professional: generateProfessionalContent,
        detailed: generateDetailedContent,
        comprehensive: generateComprehensiveContent,
        structured: generateStructuredContent
    };
    
    const generator = templates[style] || templates.professional;
    return generator(jobInfo);
}

// 生成专业正式内容
function generateProfessionalContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `🔍 【招聘详情】<br><br>

📍 工作地点：${jobInfo.location}<br>
🏢 招聘企业：${jobInfo.company}<br>
👷 招聘岗位：${jobInfo.title}<br>
💰 薪资待遇：${jobInfo.salary}（月薪8000-12000元）<br>
⏰ 工作时间：白班制，8小时工作<br>
🎯 招聘人数：50人<br>
📅 入职时间：随时可入职<br><br>

👤 【岗位要求】<br>
• 年龄18-45岁，男女不限<br>
• 身体健康，无传染性疾病<br>
• 能够适应工厂工作环境<br>
• 工作认真负责，有团队合作精神<br>
• 无需相关工作经验，公司提供培训<br><br>

🎁 【薪资福利】<br>
✅ 基本工资：${jobInfo.salary}<br>
✅ 加班费：按国家标准1.5倍计算<br>
✅ 完善的五险一金保障<br>
✅ 免费员工宿舍（4人间，独立卫浴）<br>
✅ 餐补200元/月<br>
✅ 交通补贴100元/月<br>
✅ 带薪年假及法定节假日<br>
✅ 节日福利及生日礼品<br>
✅ 免费技能培训和职业发展机会<br><br>

🏭 【工作环境】<br>
公司拥有现代化的生产车间，环境整洁，设备先进。严格按照安全生产标准操作，为员工提供安全舒适的工作环境。车间配备空调系统，确保员工在适宜的温度下工作。<br><br>

🏠 【生活配套】<br>
员工宿舍位于工厂园区内，4人间标准配置，独立卫浴，24小时热水供应。宿舍区设有食堂、超市、娱乐室等配套设施，生活便利。<br><br>

📞 【应聘方式】<br>
如有应聘意向，请通过以下方式联系：<br>
• 私信留言，我们将及时回复<br>
• 评论区留下联系方式<br>
• 关注本账号获取更多招聘信息<br><br>

我们将在收到信息后24小时内与您联系，安排面试时间。面试通过者可直接安排入职相关手续。<br><br>

#${location.replace('市', '')}招聘 #工厂招聘 #${jobInfo.title} #高薪工作 #包住宿 #五险一金 #无经验可做 #求职招聘 #稳定工作 #职业发展`;
}

// 生成详细全面内容
function generateDetailedContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📋 【企业招聘公告】<br><br>

🏢 企业介绍：<br>
${jobInfo.company}成立于2005年，是一家专业从事电子产品制造的知名企业。公司在${location}设有大型生产基地，拥有先进的生产设备和完善的管理体系。企业秉承"以人为本，共同发展"的理念，为员工提供良好的工作环境和发展平台。<br><br>

💼 岗位详情：<br>
• 职位名称：${jobInfo.title}<br>
• 工作性质：全职<br>
• 工作地点：${jobInfo.location}<br>
• 薪资范围：${jobInfo.salary}（月收入8000-12000元）<br>
• 工作班次：白班制，周一至周六，每天8小时<br>
• 休息制度：月休4天，享受国家法定节假日<br>
• 招聘人数：50人（男女不限）<br><br>

📝 工作内容：<br>
• 按照生产工艺要求完成产品组装<br>
• 严格按照质量标准进行产品检验<br>
• 维护工作区域的整洁和安全<br>
• 配合团队完成生产任务<br>
• 参与技能培训和质量改进活动<br><br>

🎯 任职要求：<br>
• 年龄：18-45周岁<br>
• 学历：初中及以上<br>
• 经验：无需工作经验，提供岗前培训<br>
• 身体：身体健康，无传染性疾病<br>
• 能力：具备基本的沟通协调能力<br>
• 态度：工作认真负责，有团队合作精神<br><br>

💰 薪资福利体系：<br>
【基础薪资】<br>
• 基本工资：${jobInfo.salary}<br>
• 岗位津贴：根据岗位级别发放<br>
• 绩效奖金：根据个人表现发放<br>
• 加班费：平时1.5倍，周末2倍，节假日3倍<br><br>

【社会保障】<br>
• 五险一金：养老、医疗、失业、工伤、生育保险+住房公积金<br>
• 商业保险：额外购买意外伤害保险<br><br>

【生活福利】<br>
• 免费住宿：4人间宿舍，独立卫浴，空调热水<br>
• 餐饮补贴：每月200元餐补<br>
• 交通补贴：每月100元交通补贴<br>
• 通讯补贴：每月50元话费补贴<br><br>

【节日福利】<br>
• 生日礼品：员工生日当月发放生日礼品<br>
• 节日福利：春节、中秋等传统节日发放节日礼品<br>
• 年终奖金：根据公司效益和个人表现发放<br><br>

【发展机会】<br>
• 技能培训：定期组织技能培训和职业发展培训<br>
• 晋升通道：班长→组长→主管→经理<br>
• 学历提升：支持员工继续教育和学历提升<br><br>

📞 应聘流程：<br>
1. 在线报名：通过私信或评论留下联系方式<br>
2. 电话面试：HR将在24小时内电话联系<br>
3. 现场面试：安排到厂区进行现场面试<br>
4. 体检入职：面试通过后安排体检和入职手续<br>
5. 岗前培训：提供为期3-5天的岗前培训<br><br>

📧 联系方式：<br>
• 微信私信：直接私信本账号<br>
• 评论留言：在评论区留下您的联系方式<br>
• 关注获取：关注本账号获取最新招聘信息<br><br>

我们承诺：所有招聘信息真实有效，不收取任何费用，为求职者提供公平公正的就业机会。<br><br>

#正规企业招聘 #${location.replace('市', '')}工作机会 #制造业就业 #工厂直招 #高薪稳定工作`;
}

// 生成全面综合内容
function generateComprehensiveContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📢 【2024年度校园及社会招聘】<br><br>

🎯 招聘概况<br>
企业名称：${jobInfo.company}<br>
招聘岗位：${jobInfo.title}<br>
工作地点：${jobInfo.location}<br>
薪资待遇：${jobInfo.salary}（年薪10-15万元）<br>
招聘人数：50名<br>
学历要求：初中及以上<br>
经验要求：无需工作经验<br><br>

🏢 企业实力<br>
${jobInfo.company}是一家集研发、生产、销售为一体的现代化企业，专注于电子产品制造领域已有近20年历史。公司在${location}建有占地面积15万平方米的现代化生产基地，拥有员工3000余人，年产值超过10亿元。<br><br>

公司通过了ISO9001质量管理体系认证、ISO14001环境管理体系认证，获得了多项行业荣誉，是${location}重点扶持的高新技术企业。<br><br>

💼 岗位详细说明<br>
【工作职责】<br>
1. 按照标准操作程序完成产品生产任务<br>
2. 严格执行质量控制标准，确保产品质量<br>
3. 维护设备正常运行，及时报告异常情况<br>
4. 遵守安全生产规程，确保生产安全<br>
5. 参与持续改进活动，提高生产效率<br>
6. 配合完成其他相关工作任务<br><br>

【能力要求】<br>
• 具备基本的学习能力和理解能力<br>
• 能够适应生产节奏和工作强度<br>
• 具有良好的团队协作精神<br>
• 工作细心认真，责任心强<br>
• 能够接受倒班工作安排<br><br>

💰 薪酬福利详解<br>
【薪资构成】<br>
基本工资：${jobInfo.salary}（保底收入）<br>
绩效奖金：500-2000元/月（根据表现）<br>
加班工资：平时1.5倍，周末2倍，节假日3倍<br>
年终奖金：1-3个月工资（根据公司效益）<br><br>

【保险福利】<br>
社会保险：五险一金（养老、医疗、失业、工伤、生育保险+公积金）<br>
商业保险：团体意外险、重大疾病险<br>
年度体检：免费年度健康体检<br><br>

【生活保障】<br>
住宿条件：4人间宿舍，配备空调、热水器、洗衣机<br>
用餐安排：员工食堂，菜品丰富，价格优惠<br>
交通安排：厂区班车，覆盖市区主要区域<br><br>

【福利待遇】<br>
带薪休假：年假、病假、婚假、产假等<br>
节日福利：春节、端午、中秋等节日礼品<br>
员工活动：年会、旅游、运动会等团建活动<br>
培训发展：岗前培训、在职培训、技能提升培训<br><br>

🏭 工作环境<br>
生产车间：恒温恒湿，配备先进的空气净化系统<br>
设备设施：采用国际先进的自动化生产设备<br>
安全保障：完善的安全防护措施和应急处理机制<br>
文化氛围：积极向上的企业文化，和谐的人际关系<br><br>

🎓 培训发展<br>
新员工培训：为期一周的岗前培训，包括安全培训、技能培训<br>
在职培训：定期技能提升培训，管理能力培训<br>
职业发展：清晰的晋升通道和职业发展规划<br>
学历提升：支持员工继续教育，学费报销<br><br>

📞 报名方式<br>
现场报名：${jobInfo.location}xx路xx号（具体地址私信获取）<br>
电话咨询：招聘热线（私信获取联系方式）<br>
在线报名：私信本账号或评论留言<br><br>

报名时请携带：身份证原件及复印件、学历证明、健康证明<br><br>

我们承诺：<br>
✅ 所有招聘信息真实有效<br>
✅ 不收取任何形式的费用<br>
✅ 保护求职者个人信息安全<br>
✅ 提供公平公正的就业机会<br><br>

#${location.replace('市', '')}招聘 #制造业就业 #工厂直招 #高薪工作 #职业发展`;
}

// 生成结构化内容
function generateStructuredContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📊 【招聘信息总览】<br><br>

🏢 企业概况<br>
━━━━━━━━━━━━━━━━━━━━━<br>
公司名称：${jobInfo.company}<br>
成立时间：2005年<br>
企业性质：外商独资企业<br>
员工规模：3000+人<br>
年营业额：10亿+元<br>
行业地位：行业领军企业<br><br>

📋 岗位信息<br>
━━━━━━━━━━━━━━━━━━━━━<br>
🎯 职位名称：${jobInfo.title}<br>
📍 工作地点：${jobInfo.location}<br>
💰 薪资水平：${jobInfo.salary}（月均10000+）<br>
👥 招聘人数：50人<br>
📅 入职时间：随时入职<br>
🕐 工作时间：8小时/天，月休4天<br><br>

👤 任职条件<br>
━━━━━━━━━━━━━━━━━━━━━<br>
年龄要求：18-45周岁<br>
学历要求：初中及以上<br>
经验要求：无需工作经验<br>
技能要求：基础操作能力<br>
身体要求：身体健康<br>
其他要求：责任心强，团队协作<br><br>

💰 薪酬体系<br>
━━━━━━━━━━━━━━━━━━━━━<br>
基础工资：${jobInfo.salary}<br>
绩效奖金：500-2000元/月<br>
加班工资：1.5-3倍工资<br>
年终奖金：1-3个月工资<br>
月均收入：8000-12000元<br>
年总收入：10-15万元<br><br>

🎁 福利待遇<br>
━━━━━━━━━━━━━━━━━━━━━<br>
社会保险：✅ 五险一金全覆盖<br>
住宿条件：✅ 免费4人间宿舍<br>
用餐补贴：✅ 200元/月餐补<br>
交通补贴：✅ 100元/月交通费<br>
带薪假期：✅ 年假+法定假期<br>
节日福利：✅ 节日礼品+生日礼品<br>
培训发展：✅ 免费技能培训<br>
职业发展：✅ 完善晋升通道<br><br>

🏭 工作环境<br>
━━━━━━━━━━━━━━━━━━━━━<br>
车间环境：恒温恒湿，空气净化<br>
生产设备：国际先进自动化设备<br>
安全保障：完善的安全防护体系<br>
文化氛围：和谐友好的工作环境<br><br>

📞 联系方式<br>
━━━━━━━━━━━━━━━━━━━━━<br>
报名方式：私信本账号<br>
咨询时间：工作日9:00-18:00<br>
面试安排：收到简历后24小时内联系<br>
入职流程：面试→体检→培训→正式入职<br><br>

📈 发展前景<br>
━━━━━━━━━━━━━━━━━━━━━<br>
晋升路径：员工→班长→组长→主管→经理<br>
技能发展：定期技能培训和认证<br>
学历提升：支持继续教育，学费报销<br>
职业规划：个性化职业发展指导<br><br>

🔥 招聘优势<br>
━━━━━━━━━━━━━━━━━━━━━<br>
✅ 薪资待遇优厚，福利完善<br>
✅ 工作环境舒适，管理规范<br>
✅ 培训体系完善，发展空间大<br>
✅ 生活配套齐全，省心省力<br>
✅ 企业实力雄厚，工作稳定<br><br>

欢迎有志之士加入我们的团队！<br><br>

#${location.replace('市', '')}招聘 #工厂直招 #高薪稳定 #职业发展 #正规企业`;
}

// ==================== 重新生成功能 ====================

// 重新生成标题
function regenerateTitle() {
    if (isGenerating) return;
    currentGenerationType = 'title';
    showRegenerateModal();
}

// 重新生成内容
function regenerateContent() {
    if (isGenerating) return;
    currentGenerationType = 'content';
    showRegenerateModal();
}

// 重新生成视频
function regenerateVideo() {
    if (isGenerating) return;
    currentGenerationType = 'video';
    showVideoRegenerateOptions();
}

// 显示重新生成选项弹窗
function showRegenerateModal() {
    const modal = document.getElementById('regenerateModal');
    modal.classList.remove('hidden');
}

// 隐藏重新生成选项弹窗
function hideRegenerateModal() {
    const modal = document.getElementById('regenerateModal');
    modal.classList.add('hidden');
}

// 确认重新生成
function confirmRegenerate() {
    hideRegenerateModal();
    
    // 获取用户选择的选项
    const style = document.querySelector('input[name="contentStyle"]:checked')?.value || 'professional';
    const highlights = Array.from(document.querySelectorAll('input[name="highlights"]:checked'))
                           .map(cb => cb.value);
    const videoType = document.querySelector('input[name="videoType"]:checked')?.value || 'corporate';
    const videoFormat = document.querySelector('input[name="videoFormat"]:checked')?.value || 'landscape';
    
    // 开始生成
    startGeneration(currentGenerationType, { style, highlights, videoType, videoFormat });
}

// 显示视频重新生成选项
function showVideoRegenerateOptions() {
    showToast('正在准备视频生成选项...');
    
    setTimeout(() => {
        startGeneration('video', {
            type: 'corporate',
            duration: 150,
            format: 'landscape'
        });
    }, 1000);
}

// 开始生成过程
function startGeneration(type, options) {
    isGenerating = true;
    showGeneratingModal();
    
    // 更新按钮状态
    updateButtonState(type, 'generating');
    
    // 模拟生成过程
    simulateGeneration(type, options);
}

// 显示生成中弹窗
function showGeneratingModal() {
    const modal = document.getElementById('generatingModal');
    modal.classList.remove('hidden');
    
    // 开始进度条动画
    startProgressAnimation();
}

// 隐藏生成中弹窗
function hideGeneratingModal() {
    const modal = document.getElementById('generatingModal');
    modal.classList.add('hidden');
}

// 开始进度条动画
function startProgressAnimation() {
    const progressBar = document.getElementById('progressBar');
    const timeLeft = document.getElementById('timeLeft');
    let progress = 0;
    let time = 30;
    
    const interval = setInterval(() => {
        progress += Math.random() * 4 + 2;
        time -= 1;
        
        if (progress >= 100) {
            progress = 100;
            time = 0;
            clearInterval(interval);
        }
        
        progressBar.style.width = `${progress}%`;
        timeLeft.textContent = Math.max(0, time);
        
        if (progress >= 100) {
            setTimeout(() => {
                hideGeneratingModal();
                completeGeneration();
            }, 500);
        }
    }, 1000);
}

// 模拟生成过程
function simulateGeneration(type, options) {
    setTimeout(() => {
        if (type === 'title') {
            const newTitle = generateWechatVideoTitle(currentJobInfo, options.style);
            const titleArea = document.getElementById('titleArea');
            titleArea.innerHTML = `<div class="text-base font-medium text-gray-800">${newTitle}</div>`;
            titleArea.classList.add('fade-in');
        } else if (type === 'content') {
            const newContent = generateWechatVideoContent(currentJobInfo, options.style);
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = `<div class="text-sm professional-text text-gray-700">${newContent}</div>`;
            contentArea.classList.add('fade-in');
        } else if (type === 'video') {
            const videoArea = document.getElementById('videoArea');
            // 更新视频格式信息
            if (options.videoFormat) {
                isLandscape = options.videoFormat === 'landscape';
                updateVideoFormat();
            }
            videoArea.classList.add('fade-in');
        }
        
        // 恢复按钮状态
        updateButtonState(type, 'completed');
        
        isGenerating = false;
    }, 30000);
}

// 完成生成
function completeGeneration() {
    showToast('✅ 内容生成完成！');
}

// 更新按钮状态
function updateButtonState(type, state) {
    let button;
    
    if (type === 'title') {
        button = document.getElementById('regenerateTitleBtn');
    } else if (type === 'content') {
        button = document.getElementById('regenerateContentBtn');
    } else if (type === 'video') {
        button = document.getElementById('regenerateVideoBtn');
    }
    
    if (!button) return;
    
    switch (state) {
        case 'generating':
            button.disabled = true;
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 generating" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                生成中...
            `;
            break;
        case 'completed':
            button.disabled = false;
            const iconMap = {
                'title': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
                'content': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
                'video': 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
            };
            
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconMap[type]}" />
                </svg>
                重新生成
            `;
            break;
    }
}

// ==================== 复制和保存功能 ====================

// 复制标题和描述
function copyTitleAndContent() {
    const titleArea = document.getElementById('titleArea');
    const contentArea = document.getElementById('contentArea');
    
    const title = titleArea.textContent || titleArea.innerText;
    const content = contentArea.textContent || contentArea.innerText;
    
    const fullText = `${title}\n\n${content}`;
    
    // 使用现代剪贴板API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(fullText).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(fullText);
        });
    } else {
        fallbackCopy(fullText);
    }
}

// 备用复制方法
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        showToast('复制失败，请手动复制内容');
    } finally {
        document.body.removeChild(textArea);
    }
}

// 显示复制成功
function showCopySuccess() {
    showToast('✅ 标题和描述复制成功！');
    
    setTimeout(() => {
        showSuccessModal('copy');
    }, 1000);
}

// 保存视频
function saveVideo() {
    showToast('正在保存视频到相册...');
    
    setTimeout(() => {
        showToast('✅ 视频保存成功！');
        
        setTimeout(() => {
            showSuccessModal('save');
        }, 1000);
    }, 2000);
}

// 显示成功引导弹窗
function showSuccessModal(type) {
    let title, content, actionText;
    
    if (type === 'copy') {
        title = '✅ 标题和描述复制成功！';
        content = `
            <p class="mb-4">💡 接下来：</p>
            <ol class="text-left space-y-1">
                <li>1. 保存下方视频到相册</li>
                <li>2. 打开微信进入视频号</li>
                <li>3. 点击发表视频</li>
                <li>4. 粘贴刚复制的内容</li>
            </ol>
        `;
        actionText = '📹 前往微信视频号';
    } else {
        title = '✅ 视频保存成功！';
        content = `
            <p class="mb-4">📱 微信视频号发布流程：</p>
            <ol class="text-left space-y-1">
                <li>1. 打开微信→发现→视频号</li>
                <li>2. 点击右上角相机图标</li>
                <li>3. 选择"发表视频"</li>
                <li>4. 上传刚保存的视频</li>
                <li>5. 粘贴已复制的标题和描述</li>
                <li>6. 添加话题标签并发布</li>
            </ol>
        `;
        actionText = '📹 立即前往微信';
    }
    
    showCustomModal(title, content, actionText, openWechatVideo);
}

// 打开微信视频号
function openWechatVideo() {
    showToast('正在尝试打开微信...');
    
    try {
        // 尝试打开微信应用
        window.location.href = 'weixin://';
    } catch (error) {
        showToast('请手动打开微信应用');
    }
}

// ==================== 视频播放器功能 ====================

// 初始化视频播放器
function initializeVideoPlayer() {
    // 模拟视频播放状态
    isPlaying = false;
    isMuted = false;
    isLandscape = true;
    
    // 添加播放器事件监听
    updatePlayIcon();
    updateSoundIcon();
}

// 播放视频
function playVideo() {
    if (!isPlaying) {
        togglePlay();
    }
}

// 切换播放状态
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayIcon();
    
    if (isPlaying) {
        showToast('开始播放');
        startVideoProgress();
    } else {
        showToast('暂停播放');
    }
}

// 切换静音状态
function toggleMute() {
    isMuted = !isMuted;
    updateSoundIcon();
    showToast(isMuted ? '已静音' : '取消静音');
}

// 切换视频方向
function toggleOrientation() {
    isLandscape = !isLandscape;
    updateVideoFormat();
    showToast(isLandscape ? '切换到横屏格式' : '切换到竖屏格式');
}

// 切换全屏
function toggleFullscreen() {
    showToast('全屏播放');
    // 这里可以添加全屏播放的逻辑
}

// 更新播放图标
function updatePlayIcon() {
    const playIcon = document.getElementById('playIcon');
    if (isPlaying) {
        playIcon.innerHTML = `
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        `;
    } else {
        playIcon.innerHTML = `
            <path d="M8 5v14l11-7z"/>
        `;
    }
}

// 更新声音图标
function updateSoundIcon() {
    const soundIcon = document.getElementById('soundIcon');
    if (isMuted) {
        soundIcon.innerHTML = `
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        `;
    } else {
        soundIcon.innerHTML = `
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        `;
    }
}

// 更新视频格式显示
function updateVideoFormat() {
    const videoInfo = document.querySelector('.video-info');
    const formatText = isLandscape ? '1920x1080/1080x1920' : '1080x1920/1920x1080';
    videoInfo.innerHTML = `
        <div class="text-sm font-medium mb-1">🏢 企业宣传+岗位介绍</div>
        <div class="text-xs opacity-75">2分30秒 • ${formatText}</div>
    `;
}

// 开始视频进度
function startVideoProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    let progress = 0;
    let seconds = 0;
    
    const interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        
        progress += 100 / 150; // 150秒总时长 (2分30秒)
        seconds += 1;
        
        if (progress >= 100) {
            progress = 100;
            seconds = 150;
            isPlaying = false;
            updatePlayIcon();
            clearInterval(interval);
            showToast('播放完成');
        }
        
        progressFill.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(seconds);
    }, 1000);
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ==================== 工具函数 ====================

// 显示提示消息
function showToast(message) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-message fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50 fade-in';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0');
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

// 显示自定义弹窗
function showCustomModal(title, content, actionText, actionCallback) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
    modal.innerHTML = `
        <div class="flex items-center justify-center h-full px-4">
            <div class="bg-white rounded-lg w-full max-w-sm p-6 text-center">
                <h3 class="text-lg font-medium text-gray-800 mb-4">${title}</h3>
                <div class="text-sm text-gray-600 mb-6">${content}</div>
                <div class="flex space-x-3">
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700">
                        取消
                    </button>
                    <button class="flex-1 bg-wechatGreen text-white rounded-lg py-2" onclick="this.closest('.fixed').remove(); (${actionCallback.toString()})()">
                        ${actionText}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 8000);
}

// 添加动画效果
function addAnimationEffects() {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
} 