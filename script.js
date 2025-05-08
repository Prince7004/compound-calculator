// Wait for DOM to fully load

document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements from HTML

    const calculatorForm = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');
    const futureValueEI = document.getElementById('future-value');
    const interestEarnedEI = document.getElementById('interest-earned');

    // Add event listener for form submission
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get input values from form, convert string to int

        const principal = parseFloat(document.getElementById('principal').value);
        const rate = parseFloat(document.getElementById('rate').value)/ 100; 
        const time = parseFloat(document.getElementById('time').value);
        const compounds = parseInt(document.getElementById('compounds').value);

        // Calculate compound interest using defined formula below

        const futureValue = calculateCompoundInterest(principal, rate, time, compounds);
        const interestEarned = futureValue - principal;

        // Display results

        futureValueEI.textContent = formatCurrency(futureValue);
        interestEarnedEI.textContent = formatCurrency(interestEarned);

        // Show result div
        
        resultDiv.classList.remove('hidden');
    });

    // Function to calculate compound interest
    function calculateCompoundInterest(principal, rate, time, compounds) {
       
        // A = P(1 + r/n)^(nt)
        // final amount = principal(1+ annual interest rate/number of times interest compounded per year)^(number of times interest compounded per year*time in years)

        return principal * Math.pow(1 + (rate / compounds), compounds * time);
    }

    // Function to format currency output in USD
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
});