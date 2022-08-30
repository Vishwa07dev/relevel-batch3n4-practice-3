module.exports = {
  userTypes: {
    admin: "ADMIN",
    user: "USER",
  },
  userStatuses: {
    pending: "PENDING",
    blocked: "BLOCKED",
    approved: "APPROVED",
  },
  emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  passwordRegex: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};
