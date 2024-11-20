export function passwordCheck(originPwd, confirmPassword) {
  if (originPwd === "" || confirmPassword === "") return;
  return originPwd === confirmPassword;
}
