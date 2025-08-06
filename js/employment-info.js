// 在职信息填写页面 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initTime();
    initForm();
    initEventListeners();
    initMaxDate();
    initAddressData();
});

// 工厂和岗位的映射关系
const FACTORY_POSITIONS = {
    'factory1': [
        { value: 'operator1', text: '生产线操作工' },
        { value: 'qc1', text: '品质检验员' },
        { value: 'packer1', text: '包装工' },
        { value: 'maintenance1', text: '设备维护员' },
        { value: 'warehouse1', text: '仓库管理员' }
    ],
    'factory2': [
        { value: 'operator2', text: '包装机操作员' },
        { value: 'qc2', text: '质量控制员' },
        { value: 'cutter2', text: '切割工' },
        { value: 'loader2', text: '装卸工' },
        { value: 'inspector2', text: '巡检员' }
    ],
    'factory3': [
        { value: 'operator3', text: '纸品生产工' },
        { value: 'machine3', text: '机械操作员' },
        { value: 'qc3', text: '产品检验员' },
        { value: 'cleaner3', text: '清洁工' },
        { value: 'helper3', text: '生产助理' }
    ],
    'factory4': [
        { value: 'operator4', text: '造纸机操作工' },
        { value: 'chemical4', text: '化学助理' },
        { value: 'maintenance4', text: '机修工' },
        { value: 'qc4', text: '质检员' },
        { value: 'supervisor4', text: '班组长' }
    ],
    'factory5': [
        { value: 'weaver5', text: '织布工' },
        { value: 'dyer5', text: '染色工' },
        { value: 'qc5', text: '验布员' },
        { value: 'operator5', text: '纺织机操作员' },
        { value: 'finisher5', text: '后整理工' }
    ],
    'factory6': [
        { value: 'assembler6', text: '装配工' },
        { value: 'welder6', text: '焊接工' },
        { value: 'painter6', text: '喷漆工' },
        { value: 'qc6', text: '质量检验员' },
        { value: 'technician6', text: '技术员' }
    ],
    'factory7': [
        { value: 'driver7', text: '叉车司机' },
        { value: 'warehouse7', text: '仓储员' },
        { value: 'sorter7', text: '分拣员' },
        { value: 'loader7', text: '搬运工' },
        { value: 'clerk7', text: '库管员' }
    ],
    'factory8': [
        { value: 'operator8', text: '纺纱工' },
        { value: 'maintenance8', text: '设备保养员' },
        { value: 'qc8', text: '纱线检验员' },
        { value: 'cleaner8', text: '车间清洁工' },
        { value: 'assistant8', text: '技术助理' }
    ]
};

// 省市区数据
const ADDRESS_DATA = {
    '福建省': {
        '福州市': ['鼓楼区', '台江区', '仓山区', '马尾区', '晋安区', '长乐区', '闽侯县', '连江县', '罗源县', '闽清县', '永泰县', '平潭县'],
        '厦门市': ['思明区', '海沧区', '湖里区', '集美区', '同安区', '翔安区'],
        '泉州市': ['鲤城区', '丰泽区', '洛江区', '泉港区', '石狮市', '晋江市', '南安市', '惠安县', '安溪县', '永春县', '德化县', '金门县'],
        '三明市': ['梅列区', '三元区', '永安市', '明溪县', '清流县', '宁化县', '大田县', '尤溪县', '沙县', '将乐县', '泰宁县', '建宁县'],
        '莆田市': ['城厢区', '涵江区', '荔城区', '秀屿区', '仙游县'],
        '南平市': ['延平区', '建阳区', '邵武市', '武夷山市', '建瓯市', '光泽县', '松溪县', '政和县', '顺昌县', '浦城县'],
        '龙岩市': ['新罗区', '永定区', '漳平市', '长汀县', '上杭县', '武平县', '连城县'],
        '宁德市': ['蕉城区', '福安市', '福鼎市', '霞浦县', '古田县', '屏南县', '寿宁县', '周宁县', '柘荣县']
    },
    '广东省': {
        '广州市': ['荔湾区', '越秀区', '海珠区', '天河区', '白云区', '黄埔区', '番禺区', '花都区', '南沙区', '从化区', '增城区'],
        '深圳市': ['罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区', '龙华区', '坪山区', '光明区', '大鹏新区'],
        '东莞市': ['莞城街道', '南城街道', '东城街道', '万江街道', '石碣镇', '石龙镇', '茶山镇', '石排镇', '企石镇', '横沥镇', '桥头镇', '谢岗镇', '东坑镇', '常平镇', '寮步镇', '樟木头镇', '大朗镇', '黄江镇', '清溪镇', '塘厦镇', '凤岗镇', '大岭山镇', '长安镇', '虎门镇', '厚街镇', '沙田镇', '道滘镇', '洪梅镇', '麻涌镇', '望牛墩镇', '中堂镇', '高埗镇'],
        '佛山市': ['禅城区', '南海区', '顺德区', '三水区', '高明区'],
        '中山市': ['石岐区', '东区', '火炬开发区', '西区', '南区', '五桂山', '小榄镇', '黄圃镇', '民众镇', '东凤镇', '东升镇', '古镇镇', '沙溪镇', '坦洲镇', '港口镇', '三角镇', '横栏镇', '南头镇', '阜沙镇', '南朗镇', '三乡镇', '板芙镇', '大涌镇', '神湾镇']
    },
    '浙江省': {
        '杭州市': ['上城区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '临平区', '钱塘区', '富阳区', '临安区', '桐庐县', '淳安县', '建德市'],
        '宁波市': ['海曙区', '江北区', '北仑区', '镇海区', '鄞州区', '奉化区', '象山县', '宁海县', '余姚市', '慈溪市'],
        '温州市': ['鹿城区', '龙湾区', '瓯海区', '洞头区', '永嘉县', '平阳县', '苍南县', '文成县', '泰顺县', '瑞安市', '乐清市'],
        '嘉兴市': ['南湖区', '秀洲区', '嘉善县', '海盐县', '海宁市', '平湖市', '桐乡市']
    },
    '江苏省': {
        '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区', '六合区', '溧水区', '高淳区'],
        '苏州市': ['虎丘区', '吴中区', '相城区', '姑苏区', '吴江区', '常熟市', '张家港市', '昆山市', '太仓市'],
        '无锡市': ['锡山区', '惠山区', '滨湖区', '梁溪区', '新吴区', '江阴市', '宜兴市'],
        '常州市': ['天宁区', '钟楼区', '新北区', '武进区', '金坛区', '溧阳市']
    }
};

// 初始化时间显示
function initTime() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = timeStr;
}

// 初始化表单
function initForm() {
    // 预填充登录用户信息（如果有的话）
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo.name) {
        document.getElementById('employeeName').value = userInfo.name;
    }
    if (userInfo.phone) {
        document.getElementById('phoneNumber').value = userInfo.phone;
    }
}

// 初始化事件监听器
function initEventListeners() {
    // 工厂选择变化
    document.getElementById('factorySelect').addEventListener('change', handleFactoryChange);
    
    // 户籍地址选择变化
    document.getElementById('provinceSelect').addEventListener('change', handleProvinceChange);
    document.getElementById('citySelect').addEventListener('change', handleCityChange);
    
    // 表单提交
    document.getElementById('employmentForm').addEventListener('submit', handleFormSubmit);
    
    // 实时验证
    document.getElementById('employeeName').addEventListener('blur', validateName);
    document.getElementById('phoneNumber').addEventListener('blur', validatePhone);
    document.getElementById('hireDate').addEventListener('change', validateHireDate);
    
    // 输入格式化
    document.getElementById('phoneNumber').addEventListener('input', formatPhoneInput);
}

// 初始化最大日期（不能选择未来日期）
function initMaxDate() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    document.getElementById('hireDate').setAttribute('max', maxDate);
}

// 初始化地址数据
function initAddressData() {
    const provinceSelect = document.getElementById('provinceSelect');
    
    // 添加省份选项
    Object.keys(ADDRESS_DATA).forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    });
}

// 处理工厂选择变化
function handleFactoryChange() {
    const factorySelect = document.getElementById('factorySelect');
    const positionSelect = document.getElementById('positionSelect');
    const selectedFactory = factorySelect.value;
    
    // 清空岗位选择
    positionSelect.innerHTML = '<option value="">请选择岗位</option>';
    
    if (selectedFactory && FACTORY_POSITIONS[selectedFactory]) {
        // 启用岗位选择
        positionSelect.disabled = false;
        
        // 添加对应岗位选项
        FACTORY_POSITIONS[selectedFactory].forEach(position => {
            const option = document.createElement('option');
            option.value = position.value;
            option.textContent = position.text;
            positionSelect.appendChild(option);
        });
    } else {
        // 禁用岗位选择
        positionSelect.disabled = true;
        positionSelect.innerHTML = '<option value="">请先选择工厂</option>';
    }
    
    // 清除之前的错误信息
    hideError('factoryError');
    hideError('positionError');
}

// 处理省份选择变化
function handleProvinceChange() {
    const provinceSelect = document.getElementById('provinceSelect');
    const citySelect = document.getElementById('citySelect');
    const districtSelect = document.getElementById('districtSelect');
    const selectedProvince = provinceSelect.value;
    
    // 清空城市和区县选择
    citySelect.innerHTML = '<option value="">请选择城市</option>';
    districtSelect.innerHTML = '<option value="">请选择区县</option>';
    districtSelect.disabled = true;
    
    if (selectedProvince && ADDRESS_DATA[selectedProvince]) {
        // 启用城市选择
        citySelect.disabled = false;
        
        // 添加对应城市选项
        Object.keys(ADDRESS_DATA[selectedProvince]).forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        // 禁用城市选择
        citySelect.disabled = true;
        citySelect.innerHTML = '<option value="">请先选择省份</option>';
    }
    
    // 清除错误信息
    hideError('addressError');
}

// 处理城市选择变化
function handleCityChange() {
    const provinceSelect = document.getElementById('provinceSelect');
    const citySelect = document.getElementById('citySelect');
    const districtSelect = document.getElementById('districtSelect');
    const selectedProvince = provinceSelect.value;
    const selectedCity = citySelect.value;
    
    // 清空区县选择
    districtSelect.innerHTML = '<option value="">请选择区县</option>';
    
    if (selectedProvince && selectedCity && ADDRESS_DATA[selectedProvince][selectedCity]) {
        // 启用区县选择
        districtSelect.disabled = false;
        
        // 添加对应区县选项
        ADDRESS_DATA[selectedProvince][selectedCity].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    } else {
        // 禁用区县选择
        districtSelect.disabled = true;
        districtSelect.innerHTML = '<option value="">请先选择城市</option>';
    }
    
    // 清除错误信息
    hideError('addressError');
}

// 验证姓名
function validateName() {
    const name = document.getElementById('employeeName').value.trim();
    const nameRegex = /^[\u4e00-\u9fa5]{2,20}$/;
    
    if (!name) {
        showError('nameError', '请输入姓名');
        return false;
    }
    
    if (!nameRegex.test(name)) {
        showError('nameError', '请输入2-20位中文姓名');
        return false;
    }
    
    hideError('nameError');
    return true;
}

// 验证手机号
function validatePhone() {
    const phone = document.getElementById('phoneNumber').value.trim();
    const phoneRegex = /^1[3-9]\d{9}$/;
    
    if (!phone) {
        showError('phoneError', '请输入手机号码');
        return false;
    }
    
    if (!phoneRegex.test(phone)) {
        showError('phoneError', '请输入正确的11位手机号码');
        return false;
    }
    
    hideError('phoneError');
    return true;
}

// 验证入职时间
function validateHireDate() {
    const hireDate = document.getElementById('hireDate').value;
    
    if (!hireDate) {
        showError('dateError', '请选择入职时间');
        return false;
    }
    
    const selectedDate = new Date(hireDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
        showError('dateError', '入职时间不能为未来日期');
        return false;
    }
    
    hideError('dateError');
    return true;
}

// 验证户籍地址
function validateAddress() {
    const province = document.getElementById('provinceSelect').value;
    const city = document.getElementById('citySelect').value;
    const district = document.getElementById('districtSelect').value;
    
    if (!province) {
        showError('addressError', '请选择省份');
        return false;
    }
    
    if (!city) {
        showError('addressError', '请选择城市');
        return false;
    }
    
    if (!district) {
        showError('addressError', '请选择区县');
        return false;
    }
    
    hideError('addressError');
    return true;
}

// 格式化手机号输入
function formatPhoneInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^\d]/g, '');
}

// 显示错误信息
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // 给对应的输入框添加错误样式
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
}

// 隐藏错误信息
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
        
        // 移除对应输入框的错误样式
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
}

// 处理表单提交
function handleFormSubmit(event) {
    event.preventDefault();
    
    // 验证所有必填字段
    const isValidForm = validateForm();
    
    if (!isValidForm) {
        showToast('请检查并完善表单信息', 'error');
        return;
    }
    
    // 显示加载提示
    showLoadingModal();
    
    // 收集表单数据
    const formData = collectFormData();
    
    // 模拟提交过程
    setTimeout(() => {
        hideLoadingModal();
        saveEmploymentInfo(formData);
        showSuccessModal();
    }, 2000);
}

// 验证整个表单
function validateForm() {
    let isValid = true;
    
    // 验证工厂选择
    const factory = document.getElementById('factorySelect').value;
    if (!factory) {
        showError('factoryError', '请选择工厂');
        isValid = false;
    }
    
    // 验证岗位选择
    const position = document.getElementById('positionSelect').value;
    if (!position) {
        showError('positionError', '请选择岗位');
        isValid = false;
    }
    
    // 验证其他字段
    if (!validateName()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validateHireDate()) isValid = false;
    if (!validateAddress()) isValid = false;
    
    return isValid;
}

// 收集表单数据
function collectFormData() {
    const factorySelect = document.getElementById('factorySelect');
    const positionSelect = document.getElementById('positionSelect');
    const provinceSelect = document.getElementById('provinceSelect');
    const citySelect = document.getElementById('citySelect');
    const districtSelect = document.getElementById('districtSelect');
    
    return {
        factory: {
            value: factorySelect.value,
            text: factorySelect.options[factorySelect.selectedIndex].text
        },
        position: {
            value: positionSelect.value,
            text: positionSelect.options[positionSelect.selectedIndex].text
        },
        employeeName: document.getElementById('employeeName').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        hireDate: document.getElementById('hireDate').value,
        address: {
            province: provinceSelect.value,
            city: citySelect.value,
            district: districtSelect.value,
            fullAddress: `${provinceSelect.value}${citySelect.value}${districtSelect.value}`
        },
        submitTime: new Date().toISOString(),
        status: 'pending' // 待审核
    };
}

// 保存在职信息到本地存储
function saveEmploymentInfo(formData) {
    try {
        localStorage.setItem('employmentInfo', JSON.stringify(formData));
        
        // 同时更新用户信息
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        userInfo.name = formData.employeeName;
        userInfo.phone = formData.phoneNumber;
        userInfo.factory = formData.factory;
        userInfo.position = formData.position;
        userInfo.hireDate = formData.hireDate;
        userInfo.address = formData.address;
        userInfo.employmentStatus = 'submitted'; // 已提交在职信息
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        console.log('在职信息已保存:', formData);
    } catch (error) {
        console.error('保存在职信息失败:', error);
    }
}

// 显示加载模态框
function showLoadingModal() {
    document.getElementById('loadingModal').style.display = 'flex';
}

// 隐藏加载模态框
function hideLoadingModal() {
    document.getElementById('loadingModal').style.display = 'none';
}

// 显示成功模态框
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

// 显示提示信息
function showToast(message, type = 'info') {
    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm z-50 transition-opacity duration-300`;
    
    if (type === 'error') {
        toast.className += ' bg-red-500';
    } else if (type === 'success') {
        toast.className += ' bg-green-500';
    } else {
        toast.className += ' bg-blue-500';
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.style.opacity = '1', 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// 页面导航函数
function goBack() {
    window.history.back();
}

function goToProfile() {
    window.location.href = 'profile.html';
}

// 工具函数：获取已保存的在职信息
function getEmploymentInfo() {
    try {
        const info = localStorage.getItem('employmentInfo');
        return info ? JSON.parse(info) : null;
    } catch (error) {
        console.error('获取在职信息失败:', error);
        return null;
    }
}

// 检查是否已提交在职信息
function hasSubmittedEmploymentInfo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return userInfo.employmentStatus === 'submitted';
} 