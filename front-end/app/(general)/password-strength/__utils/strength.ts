export function checkPasswordStrength(password: string) {
  const strength = {
    weak: 0,
    medium: 0,
    strong: 0,
  };

  // Check password length
  if (password.length < 12) {
    strength.weak++;
  } else if (password.length >= 12 && password.length <= 16) {
    strength.medium++;
  } else {
    strength.strong++;
  }

  // Check for uppercase letters
  if (/(.*[A-Z]){2,}/.test(password)) {
    strength.strong++;
  } else if (/[A-Z]/.test(password)) {
    strength.medium++;
  } else {
    strength.weak++;
  }

  // Check for lowercase letters
  if (/(.*[a-z]){2,}/.test(password)) {
    strength.strong++;
  } else if (/[a-z]/.test(password)) {
    strength.medium++;
  } else {
    strength.weak++;
  }

  // Check for numbers
  if (/(.*[0-9]){2,}/.test(password)) {
    strength.strong++;
  } else if (/[0-9]/.test(password)) {
    strength.medium++;
  } else {
    strength.weak++;
  }

  // Check for special characters
  if (
    /(.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){2,}/.test(password)
  ) {
    strength.strong++;
  } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    strength.medium++;
  } else {
    strength.weak++;
  }

  // Check for sequences
  if (
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789/.test(
      password,
    )
  ) {
    strength.weak++;
  }

  // Check for alternating case
  if (/([a-z][A-Z]|[A-Z][a-z])/.test(password)) {
    strength.strong++;
  } else {
    strength.weak++;
  }

  // Determine password strength
  if (strength.strong >= 5) {
    return 'strongest';
  } else if (strength.strong >= 3) {
    return 'strong';
  } else if (strength.medium >= 2) {
    return 'medium';
  } else {
    return 'weak';
  }
}
