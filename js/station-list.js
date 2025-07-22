// 聚贤人力 - 站点列表页面交互脚本

// 全局变量
let selectedStation = null;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializePage();
    
    // 检查是否有预选的站点
    checkPreselectedStation();
});

// 初始化页面
function initializePage() {
    // 获取确认按钮
    const confirmBtn = document.getElementById('confirmBtn');
    
    // 确保按钮初始状态为禁用
    updateConfirmButton();
    
    // 添加页面退出确认
    addPageLeaveConfirmation();
}

// 检查预选站点
function checkPreselectedStation() {
    // 从URL参数或本地存储中获取预选站点
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedStation = urlParams.get('selected') || localStorage.getItem('selectedStation');
    
    if (preselectedStation) {
        // 查找并选中对应的站点
        const stationItems = document.querySelectorAll('.station-item');
        stationItems.forEach(item => {
            const stationName = item.querySelector('.station-name').textContent;
            if (stationName === preselectedStation) {
                selectStationElement(item);
            }
        });
    }
}

// 选择站点
function selectStation(element, name, address, distance) {
    // 先清除所有选中状态
    clearAllSelections();
    
    // 选中当前站点
    selectStationElement(element);
    
    // 保存选中的站点信息
    selectedStation = {
        name: name,
        address: address,
        distance: distance,
        element: element
    };
    
    // 更新确认按钮状态
    updateConfirmButton();
    
    // 保存到本地存储
    localStorage.setItem('selectedStation', name);
    localStorage.setItem('selectedStationData', JSON.stringify(selectedStation));
    
    // 显示选择反馈
    showToast(`已选择：${name}`);
}

// 选中站点元素
function selectStationElement(element) {
    const radioButton = element.querySelector('.radio-button');
    radioButton.classList.add('selected');
    element.style.backgroundColor = '#fafafa';
}

// 清除所有选中状态
function clearAllSelections() {
    const radioButtons = document.querySelectorAll('.radio-button');
    const stationItems = document.querySelectorAll('.station-item');
    
    radioButtons.forEach(button => {
        button.classList.remove('selected');
    });
    
    stationItems.forEach(item => {
        item.style.backgroundColor = 'white';
    });
}

// 更新确认按钮状态
function updateConfirmButton() {
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (selectedStation) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = '确认选择';
    } else {
        confirmBtn.disabled = true;
        confirmBtn.textContent = '请选择门店';
    }
}

// 确认选择
function confirmSelection() {
    if (!selectedStation) {
        showToast('请先选择一个门店');
        return;
    }
    
    // 显示确认对话框
    showConfirmDialog();
}

// 显示确认对话框
function showConfirmDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
        <div class="bg-white rounded-lg mx-4 max-w-sm w-full">
            <div class="p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">确认选择门店</h3>
                <div class="mb-4">
                    <div class="font-medium text-gray-800">${selectedStation.name}</div>
                    <div class="text-sm text-gray-600 mt-1">${selectedStation.address}</div>
                    <div class="text-sm text-primary mt-1">距离：${selectedStation.distance}千米</div>
                </div>
                <div class="text-sm text-gray-500 mb-6">
                    确认后，我们将安排专车从该门店接送您到工厂。
                </div>
                <div class="flex space-x-3">
                    <button onclick="closeConfirmDialog()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                        取消
                    </button>
                    <button onclick="proceedWithSelection()" class="flex-1 px-4 py-2 primary-gradient text-white rounded-md">
                        确认
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // 添加点击外部关闭功能
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeConfirmDialog();
        }
    });
}

// 关闭确认对话框
function closeConfirmDialog() {
    const dialog = document.querySelector('.fixed.inset-0.bg-black');
    if (dialog) {
        dialog.remove();
    }
}

// 确认选择并跳转
function proceedWithSelection() {
    // 关闭对话框
    closeConfirmDialog();
    
    // 显示处理中状态
    showProcessingState();
    
    // 模拟处理延迟
    setTimeout(() => {
        // 保存选择到本地存储
        saveSelectionData();
        
        // 跳转到下一页面
        navigateToNextPage();
    }, 1500);
}

// 显示处理中状态
function showProcessingState() {
    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        正在处理...
    `;
    
    showToast('正在安排接送服务...');
}

// 保存选择数据
function saveSelectionData() {
    const selectionData = {
        station: selectedStation,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
    };
    
    localStorage.setItem('stationSelection', JSON.stringify(selectionData));
    localStorage.setItem('selectedStationName', selectedStation.name);
    localStorage.setItem('selectedStationAddress', selectedStation.address);
    localStorage.setItem('selectedStationDistance', selectedStation.distance);
}

// 跳转到下一页面
function navigateToNextPage() {
    // 根据来源页面决定跳转目标
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    const returnTo = urlParams.get('return') || 'factory-entry.html';
    
    // 构建跳转URL，带上选择的站点信息
    const params = new URLSearchParams({
        station: selectedStation.name,
        address: selectedStation.address,
        distance: selectedStation.distance
    });
    
    window.location.href = `${returnTo}?${params.toString()}`;
}

// 添加页面退出确认
function addPageLeaveConfirmation() {
    window.addEventListener('beforeunload', function(e) {
        if (selectedStation && !localStorage.getItem('stationSelection')) {
            e.preventDefault();
            e.returnValue = '您的选择尚未确认，确定要离开吗？';
        }
    });
}

// 显示提示信息
function showToast(message) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// 获取用户位置（可选功能）
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // 这里可以计算真实距离并更新显示
                console.log('用户位置:', lat, lng);
                updateDistancesBasedOnLocation(lat, lng);
            },
            function(error) {
                console.log('获取位置失败:', error);
                // 使用默认距离
            }
        );
    }
}

// 基于位置更新距离（示例函数）
function updateDistancesBasedOnLocation(userLat, userLng) {
    // 这里可以实现真实的距离计算
    // 目前使用模拟数据
    console.log('更新距离显示基于用户位置');
}

// 搜索功能（可扩展）
function enableSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterStations(searchTerm);
        });
    }
}

// 过滤站点
function filterStations(searchTerm) {
    const stationItems = document.querySelectorAll('.station-item');
    
    stationItems.forEach(item => {
        const stationName = item.querySelector('.station-name').textContent.toLowerCase();
        const stationAddress = item.querySelector('.station-address').textContent.toLowerCase();
        
        if (stationName.includes(searchTerm) || stationAddress.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 导出函数供全局使用
window.selectStation = selectStation;
window.confirmSelection = confirmSelection;
window.closeConfirmDialog = closeConfirmDialog;
window.proceedWithSelection = proceedWithSelection; 