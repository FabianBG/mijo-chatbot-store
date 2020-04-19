const validateBody = (body, validators) => {
  const errors = {};
  for (const key of Object.keys(validators)) {
    const err = validators[key](body[key]);
    if (err) errors[key] = err;
  }
  return errors;
};

module.exports = validateBody;
