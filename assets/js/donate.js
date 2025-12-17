/* =================================================
   DONATE PAGE - MODAL FUNCTIONALITY
   ================================================= */

// Mobile Money Modal
function openMobileMoneyModal() {
  const modal = document.getElementById('mobileMoneyModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }
}

function closeMobileMoneyModal() {
  const modal = document.getElementById('mobileMoneyModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }
}

// PayPal Modal
function openPayPalModal() {
  const modal = document.getElementById('paypalModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePayPalModal() {
  const modal = document.getElementById('paypalModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Bank Transfer Modal
function openBankTransferModal() {
  const modal = document.getElementById('bankTransferModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBankTransferModal() {
  const modal = document.getElementById('bankTransferModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// PayPal Payment Actions
function proceedWithPayPal() {
  // Open PayPal send money page
  const paypalEmail = 'sycamoreroyal@gmail.com';
  window.open(`https://www.paypal.com/paypalme/${paypalEmail}`, '_blank');
  
  // Show confirmation message
  alert('You will be redirected to PayPal. Please use the email: sycamoreroyal@gmail.com');
}

function proceedWithCard() {
  // Redirect to PayPal donation page (you'll need to create this link in PayPal)
  // For now, opening PayPal homepage - replace with your actual donation link
  window.open('https://www.paypal.com/donate', '_blank');
  
  alert('You will be redirected to PayPal\'s secure payment gateway to complete your donation with a credit or debit card.');
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const modals = [
    document.getElementById('mobileMoneyModal'),
    document.getElementById('paypalModal'),
    document.getElementById('bankTransferModal')
  ];
  
  modals.forEach(modal => {
    if (modal && event.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const activeModal = document.querySelector('.payment-modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Optional: Track payment method selection for analytics
function trackPaymentMethod(method) {
  console.log('Payment method selected:', method);
  // Add your analytics tracking here (Google Analytics, etc.)
  // Example: gtag('event', 'select_payment_method', { method: method });
}

// Add tracking to modal open functions
const originalOpenMobileMoneyModal = openMobileMoneyModal;
openMobileMoneyModal = function() {
  trackPaymentMethod('mobile_money');
  originalOpenMobileMoneyModal();
};

const originalOpenPayPalModal = openPayPalModal;
openPayPalModal = function() {
  trackPaymentMethod('paypal');
  originalOpenPayPalModal();
};

const originalOpenBankTransferModal = openBankTransferModal;
openBankTransferModal = function() {
  trackPaymentMethod('bank_transfer');
  originalOpenBankTransferModal();
};