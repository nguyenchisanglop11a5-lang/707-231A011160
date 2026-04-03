// script.js - dùng chung cho toàn bộ dự án

// ===== Danh sách sản phẩm & tìm kiếm =====
function renderProducts(products, containerId, searchInputId, errorId){
    const container = document.getElementById(containerId);
    const errorEl = document.getElementById(errorId);

    function showProducts(list){
        container.innerHTML = '';
        list.forEach(p => {
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `<img src="${p.img}" alt="${p.name}">
                             <h3>${p.name}</h3>
                             <p>Giá: $${p.price}</p>`;
            container.appendChild(div);
        });
        errorEl.textContent = list.length === 0 ? 'Không tìm thấy sản phẩm!' : '';
    }

    // Hiển thị toàn bộ ban đầu
    showProducts(products);

    // Xử lý tìm kiếm
    document.getElementById(searchInputId).addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        showProducts(filtered);
    });
}

// ===== Form đăng ký người dùng =====
function setupRegisterForm(formId, messageId){
    function isEmailValid(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isPasswordValid(pw){
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
    }

    const form = document.getElementById(formId);
    const msg = document.getElementById(messageId);

    form.addEventListener('submit', e=>{
        e.preventDefault();
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value;
        const agree = form.querySelector('#agree').checked;

        if(!isEmailValid(email)){
            msg.textContent = 'Email không hợp lệ';
            msg.className = 'error';
            return;
        }
        if(!isPasswordValid(password)){
            msg.textContent = 'Mật khẩu phải ít nhất 8 ký tự, có chữ hoa, thường và số';
            msg.className = 'error';
            return;
        }
        if(!agree){
            msg.textContent = 'Bạn phải đồng ý điều khoản';
            msg.className = 'error';
            return;
        }
        const user = {name,email,password};
        localStorage.setItem('user', JSON.stringify(user));
        msg.textContent = 'Đăng ký thành công!';
        msg.className = 'success';
        form.reset();
    });
}

// ===== Countdown Timer =====
function startCountdown(timerId, minutes=10){
    let time = minutes*60;
    const timerEl = document.getElementById(timerId);

    function updateTimer(){
        const m = Math.floor(time/60);
        const s = time%60;
        timerEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        if(time <= 60){
            timerEl.classList.add('urgent');
        }
        if(time <= 0){
            clearInterval(interval);
            alert('Hết thời gian!');
        }
        time--;
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
}