export async function registerUser(data) {
  const response = await fetch("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Erro ao cadastrar usuário.");
  }
  return await response.json();
}

export async function loginUser(email, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Erro ao fazer login.");
  }
  return await response.json();
}

export async function loginWithGoogle(email, nome, sobrenome) {
  const response = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nome, sobrenome }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Erro ao fazer login com Google.");
  }
  return await response.json();
}
