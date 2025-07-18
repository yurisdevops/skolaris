export function saveUid(uid: string) {
  localStorage.setItem("uidUser", uid);
}

export function getUid() {
  return localStorage.getItem("uidUser");
}

export function removeUid() {
  localStorage.removeItem("uidUSer");
}
