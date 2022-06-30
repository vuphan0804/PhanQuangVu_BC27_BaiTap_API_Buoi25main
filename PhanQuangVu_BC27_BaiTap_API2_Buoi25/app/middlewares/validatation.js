function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}

function maxLength(value, limit) {
  if (value.length > limit) {
    return false;
  }

  return true;
}

function duplicateTest(value) {
  for (i = 0; i < clients.length; i++) {
    if (value === clients[i].taiKhoan) {
      return false;
    }
  }

  return true;
}
