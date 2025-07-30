// Salva o UID do usuário no armazenamento local do navegador
export function saveUid(uid: string) {
  localStorage.setItem("uidUser", uid); // Grava o UID com a chave "uidUser"
}

// Recupera o UID salvo no armazenamento local
// Retorna `string` se existir ou `null` se não tiver sido armazenado
export function getUid() {
  return localStorage.getItem("uidUser");
}

// Remove o UID do armazenamento local
export function removeUid() {
  localStorage.removeItem("uidUSer"); // ⚠️ Atenção: a chave aqui está com erro de digitação ("uidUSer" com 'S' maiúsculo)
}
