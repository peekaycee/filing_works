document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const otherNames = document.getElementById('otherNames').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const gender = document.getElementById('gender').value;
  const errors = [];

  if (
    !/^[a-zA-Z]+$/.test(firstName) ||
    !/^[a-zA-Z]+$/.test(lastName) ||
    firstName.length < 1 ||
    lastName.length < 1
  ) {
    errors.push(
      'First name and last name are required and cannot contain numbers.'
    );
  }

  if (email === '' || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Email is required and must be a valid email address.');
  }

  if (!/^\d{10}$/.test(phone)) {
    errors.push('Phone number must be 10 digits.');
  }

  if (gender === '') {
    errors.push('Gender is required.');
  }

  if (errors.length === 0) {
    var formData = {
      firstName: firstName,
      lastName: lastName,
      otherNames: otherNames,
      email: email,
      phone: phone,
      gender: gender,
    };

    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert(result);
      })
      .catch((error) => console.error('Error:', error));
  } else {
    document.getElementById('errors').innerHTML =
      '<ul><li>' + errors.join('</li><li>') + '</li></ul>';
  }
  reset();
});

function reset() {
  firstName.value = '';
  lastName.value = '';
  otherNames.value = '';
  email.value = '';
  phone.value = '';
  gender.value = '';
}
