export const patterns = {

  name: /^[A-Za-z]{2,30}$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  phone: /^[0-9+\-\s()]{7,20}$/,

  address: /^[A-Za-z0-9\s.,#-]{5,100}$/,

  city: /^[A-Za-z\s]{2,50}$/,

  state: /^[A-Za-z\s]{2,50}$/,

  zipCode: /^[0-9]{4,10}$/,

};

export const validateField = (field: string, value: string) => {

  if (!value) return false;

  switch (field) {

    case "firstName":
    case "lastName":
      return patterns.name.test(value);

    case "email":
      return patterns.email.test(value);

    case "phone":
      return patterns.phone.test(value);

    case "address":
      return patterns.address.test(value);

    case "city":
      return patterns.city.test(value);

    case "state":
      return patterns.state.test(value);

    case "zipCode":
      return patterns.zipCode.test(value);

    default:
      return true;
  }

};