class Usuario {
  constructor(id, nome, email, senhaHash) {
    this.id = id; this.nome = nome; this.email = email; this.senhaHash = senhaHash;
  }

  static async hashSenha(senhaPlana) {
    const encoder = new TextEncoder();
    const data = encoder.encode(senhaPlana);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
}