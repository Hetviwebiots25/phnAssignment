
// Function to fetch states and districts data from an external API
async function fetchStatesAndDistricts() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

// Function to populate the states dropdown
function populateStatesDropdown(statesAndDistricts) {
    const stateDropdown = document.getElementById('state');
    stateDropdown.innerHTML = '<option value="" selected>Select State</option>' +
                              statesAndDistricts.states.map(state => `<option value="${state.state}">${state.state}</option>`).join('');
  
    stateDropdown.addEventListener('change', () => populateDistrictsDropdown(statesAndDistricts));
  }

// Function to populate the districts dropdown based on the selected state
function populateDistrictsDropdown(statesAndDistricts) {
  const stateDropdown = document.getElementById('state');
  const districtDropdown = document.getElementById('district');
  const selectedState = stateDropdown.value;

  districtDropdown.innerHTML = '<option value="" disabled selected>Select District</option>';

  const selectedStateObj = statesAndDistricts.states.find(stateObj => stateObj.state === selectedState);
  if (selectedStateObj) {
    districtDropdown.innerHTML += selectedStateObj.districts.map(district => `<option value="${district}">${district}</option>`).join('');
    districtDropdown.disabled = false;
  } else {
    districtDropdown.disabled = true;
  }
}

// Event listener for DOMContentLoaded to initialize the form
document.addEventListener('DOMContentLoaded', async () => {
  const statesAndDistricts = await fetchStatesAndDistricts();
  if (statesAndDistricts) {
    populateStatesDropdown(statesAndDistricts);
    populateDistrictsDropdown(statesAndDistricts);
    generateMathCaptcha();
  }
});

// Function to validate the name input
function validateName() {
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const regex = /^[a-zA-Z]+$/;

  if (!regex.test(nameInput.value)) {
    nameInput.value = nameInput.value.replace(/[^a-zA-Z]/g, '');
    nameError.textContent = 'Numerical value not allowed';
  } else {
    nameError.textContent = '';
  }
}

// Function to validate the email input
function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(emailInput.value)) {
    emailError.textContent = 'Invalid email format';
  } else {
    emailError.textContent = '';
  }
}

// Function to validate the mobile input
function validateMobile() {
  const mobileInput = document.getElementById('mobile');
  const regex = /^[0-9]{10}$/;

  if (!regex.test(mobileInput.value)) {
    mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '').slice(0, 10);
  }
}

// Function to validate the math captcha
function validateCaptcha() {
  const userCaptcha = parseInt(document.getElementById('userCaptcha').value, 10);
  const result = eval(document.getElementById('mathCaptcha').innerText);

  if (userCaptcha !== result) {
    document.getElementById('captchaError').innerText = 'Incorrect captcha. Please try again.';
    return false;
  }
  document.getElementById('captchaError').innerText = '';
  return true;
}

// Function to validate the entire form
function validateForm() {
  return validateCaptcha();
}

// Function to generate the initial math captcha on page load
function generateMathCaptcha() {
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  // Display the math captcha and store the result in a hidden input
  document.getElementById('mathCaptcha').innerText = `${num1} ${operator} ${num2}`;
}






// async function fetchStatesAndDistricts() {
//     try {
//         const response = await fetch('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//     }
// }

// // Function to populate states in the dropdown
// function populateStates(statesAndDistricts) {
//     const stateDropdown = document.getElementById('state');

//     statesAndDistricts.states.forEach(stateObj => {
//         const option = document.createElement('option');
//         option.value = stateObj.state;
//         option.text = stateObj.state;
//         stateDropdown.add(option);
//     });

//     // Trigger district population on state change
//     stateDropdown.addEventListener('change', function () {
//         populateDistricts(statesAndDistricts);
//     });
// }

// // Function to populate districts based on selected state
// function populateDistricts(statesAndDistricts) {
//     const stateDropdown = document.getElementById('state');
//     const districtDropdown = document.getElementById('district');
//     const selectedState = stateDropdown.value;

//     // Clear previous options
//     districtDropdown.innerHTML = '<option value="" disabled selected>Select District</option>';

//     // Populate districts based on selected state
//     const selectedStateObj = statesAndDistricts.states.find(stateObj => stateObj.state === selectedState);
//     if (selectedStateObj) {
//         selectedStateObj.districts.forEach(district => {
//             const option = document.createElement('option');
//             option.value = district;
//             option.text = district;
//             districtDropdown.add(option);
//         });

//         // Enable the district dropdown
//         districtDropdown.disabled = false;
//     } else {
//         // Disable the district dropdown if no state is selected
//         districtDropdown.disabled = true;
//     }
// }

// // Initialize the form
// window.onload = async function () {
//     const statesAndDistricts = await fetchStatesAndDistricts();
//     if (statesAndDistricts) {
//         populateStates(statesAndDistricts);
//         populateDistricts(statesAndDistricts);
//         generateCaptcha();
//     }
// };
// function validateName() {
//     const nameInput = document.getElementById('name');
//     const nameError = document.getElementById('nameError');
//     const regex = /^[a-zA-Z]+$/;

//     if (!regex.test(nameInput.value)) {
//         nameInput.value = nameInput.value.replace(/[^a-zA-Z]/g, '');
//         nameError.textContent = 'Numerical value not allowed'

//     } else {
//         nameError.textContent = '';
//     }
// }

// function validateEmail() {
//     const emailInput = document.getElementById('email');
//     const emailError = document.getElementById('emailError');
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!regex.test(emailInput.value)) {
//         emailError.textContent = 'Invalid email format';
//     } else {
//         emailError.textContent = '';
//     }
// }

// function validateMobile() {
//     const mobileInput = document.getElementById('mobile');
//     //const mobileError = document.getElementById('mobileError');
//     const regex = /^[0-9]{10}$/;

//     if (!regex.test(mobileInput.value)) {
//         mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '').slice(0, 10);
//     } //else {
//     //mobileError.textContent = '';
//     //}
// }

// function validateCaptcha() {
//     const userCaptcha = parseInt(document.getElementById('userCaptcha').value, 10);
//     const result = eval(document.getElementById('mathCaptcha').innerText);

//     if (userCaptcha !== result) {
//         document.getElementById('captchaError').innerText = 'Incorrect captcha. Please try again.';
//         return false;
//     }
//     document.getElementById('captchaError').innerText = '';
//     return true;
// }

// function validateForm() {
//     return validateCaptcha();
//     // Add additional validation logic if needed
//     //  return true; // Return true to submit the form, false to prevent submission
// }

// // Generate initial math captcha on page load
// function generateMathCaptcha() {
//     const operators = ['+', '-', '*'];
//     const operator = operators[Math.floor(Math.random() * operators.length)];
//     const num1 = Math.floor(Math.random() * 10) + 1;
//     const num2 = Math.floor(Math.random() * 10) + 1;

//     document.getElementById('mathCaptcha').innerText = `${num1} ${operator} ${num2}`;
// }

// generateMathCaptcha();