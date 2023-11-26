<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Form</title>

    <!-- Include external stylesheet -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/form-style.css') }}">
</head>

<body>
    <!-- Enquiry Form -->
    <form method="post" action="{{ url('/enquiry') }}" onsubmit="return validateForm()">
        <!-- CSRF Token -->
        @csrf
        <h2>Enquiry Form</h2>

        <!-- Name Input -->
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" oninput="validateName()" required>
        <span id="nameError" class="error"></span>

        <!-- Email Input -->
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" oninput="validateEmail()" required>
        <span id="emailError" class="error"></span>

        <!-- Mobile Input -->
        <label for="mobile">Mobile:</label>
        <input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" oninput="validateMobile()" required>
        <span id="mobileError" class="error">{{ $errors->first('mobile') }}</span>

        <!-- State Dropdown -->
        <label for="state">State:</label>
        <select id="state" name="state" onchange="populateDistricts()">
            <!-- States will be populated dynamically using JavaScript -->
            @if(isset($statesAndDistricts->states))
                @foreach($statesAndDistricts->states as $stateObj)
                    <option value="{{ $stateObj->state }}">{{ $stateObj->state }}</option>
                @endforeach
            @endif
        </select>
        <span id="stateError" class="error">{{ $errors->first('state') }}</span>

        <!-- District Dropdown -->
        <label for="district">District:</label>
        <select id="district" name="district" disabled>
            <!-- Districts will be populated dynamically using JavaScript based on selected state -->
        </select>
        <span id="districtError" class="error">{{ $errors->first('district') }}</span>

        <!-- Math Captcha -->
        <div class="captcha">
            <label class="captcha-label" for="mathCaptcha">Captcha: </label>
            <div id="mathCaptcha" class="captcha-input"></div>
            <input type="number" id="userCaptcha" name="userCaptcha" class="captcha-input" required>
        </div>
        <span id="captchaError" class="error"></span>

        <!-- Submit Button -->
        <button type="submit">Submit</button>

        <!-- Display success message if available -->
        @if(session('success'))
            <div>{{ session('success') }}</div>
        @endif
    </form>

    <!-- Include external JavaScript file -->
    <script src="{{ asset('js/form-script.js') }}"></script>
</body>
</html>