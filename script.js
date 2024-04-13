document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    const resultDiv = document.getElementById('result');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideErrorIcons();
  
      const grossIncome = parseFloat(document.getElementById('grossIncome').value);
      const extraIncome = parseFloat(document.getElementById('extraIncome').value);
      const ageGroup = document.getElementById('ageGroup').value;
      const deductions = parseFloat(document.getElementById('deductions').value);
  
      if (isNaN(grossIncome)) {
        displayErrorIcon(document.getElementById('grossIncomeError'), 'Please enter a valid gross annual income!');
        return;
      }
  
      if (isNaN(extraIncome)) {
        displayErrorIcon(document.getElementById('extraIncomeError'), 'Please enter a valid extra income!');
        return;
      }
  
      if (isNaN(deductions)) {
        displayErrorIcon(document.getElementById('deductionsError'), 'Please enter a valid deductions amount!');
        return;
      }
  
      if (ageGroup === '') {
        displayErrorIcon(document.getElementById('ageGroupError'), 'Please select an age group!');
        return;
      }
  
      let tax = 0;
      const overallIncome = grossIncome + extraIncome - deductions;
  
      if (overallIncome > 800000) {
        switch (ageGroup) {
          case '<40':
            tax = 0.3 * (overallIncome - 800000);
            break;
          case '≥40 & <60':
            tax = 0.4 * (overallIncome - 800000);
            break;
          case '≥60':
            tax = 0.1 * (overallIncome - 800000);
            break;
          default:
            break;
        }
      }
  
      displayResult(overallIncome - tax);
      modal.style.display = 'block';
    });
  
    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function (e) {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    function displayResult(incomeAfterTax) {
      resultDiv.innerHTML = `Your overall income after tax deduction is Rs ${incomeAfterTax}`;
    }
  
    function hideErrorIcons() {
      const errorIcons = document.querySelectorAll('.error-icon');
      errorIcons.forEach(icon => icon.style.display = 'none');
    }
  
    function displayErrorIcon(icon, message) {
      icon.style.display = 'inline';
      icon.setAttribute('title', message);
    }
  });
  