const SHEET_WEBAPP_URL = window.DC_CONFIG.SHEET_WEBAPP_URL;
const PAYMENT_URL = window.DC_CONFIG.PAYMENT_URL;

const goPayBtn = document.getElementById('goPayBtn');
const successBox = document.getElementById('successBox');
const errorBox = document.getElementById('errorBox');

function data(){
  return {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    area: document.getElementById('area').value.trim(),
    service: document.getElementById('service').value,
    when: document.getElementById('when').value,
    notes: document.getElementById('notes').value.trim()
  };
}

async function submitAndPay(){
  successBox.classList.add('hidden');
  errorBox.classList.add('hidden');
  const b = data();
  if(!b.name || !b.phone || !b.email || !b.area || !b.service || !b.when){
    errorBox.textContent = "Please fill in all required fields.";
    errorBox.classList.remove('hidden');
    return;
  }
  try{
    goPayBtn.disabled = true;
    const res = await fetch(SHEET_WEBAPP_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ booking: b, source: 'DhofarCareBlueFlow' })
    });
    if(!res.ok){
      const tx = await res.text();
      throw new Error(tx || 'Failed to save booking');
    }
    successBox.classList.remove('hidden');
    const qp = new URLSearchParams({ name: b.name, service: b.service, when: b.when });
    window.location.href = PAYMENT_URL + (PAYMENT_URL.includes('?') ? '&' : '?') + qp.toString();
  }catch(err){
    errorBox.textContent = "Error: " + err.message;
    errorBox.classList.remove('hidden');
  }finally{
    goPayBtn.disabled = false;
  }
}

goPayBtn.addEventListener('click', submitAndPay);
