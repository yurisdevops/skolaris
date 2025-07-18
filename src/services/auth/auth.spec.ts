import {
  Autenticado,
  Login,
  Logout,
  Registro,
  UsuarioAutenticado,
} from "../../utils/authUtils";

describe("Verificando se o usuário está autenticado", () => {
  it("retorna true quando o usuário está autenticado", () => {
    // Aqui assume-se que getAuth().currentUser já está configurado com um valor válido. Está configurado no arquivo AuthUtils.ts
    expect(Autenticado()).toBe(true);
  });

  it("retorna false quando o usuário não está autenticado", () => {
    // Simula o retorno de getAuth() com currentUser nulo
    const mockAuth = require("firebase/auth").getAuth as jest.Mock;
    mockAuth.mockReturnValueOnce({
      currentUser: null,
    });
    expect(Autenticado()).toBe(false);
  });
});

describe("Registro de Usuário", () => {
  it("deve registrar um usuário com sucesso", async () => {
    // Mock da função de registro do Firebase para interceptar sua chamada real
    const mockCreateUser = require("firebase/auth")
      .createUserWithEmailAndPassword as jest.Mock;

    // Simula o comportamento esperado da API do Firebase
    // Ao chamar createUserWithEmailAndPassword, retornamos uma Promise resolvida
    // com um objeto contendo os dados do usuário fictício
    mockCreateUser.mockResolvedValueOnce({
      user: {
        uid: "mockUserId",
        email: "mockUser@example.com",
      },
    });

    // Chama a função RegisterUser passando email e senha de teste
    // Em seguida verifica se ela retorna corretamente os dados simulados
    await expect(Registro("mockUser@example.com", "senha123")).resolves.toEqual(
      {
        uid: "mockUserId", // Verificação do UID retornado
        email: "mockUser@example.com", // Verificação do email retornado
      }
    );
  });
});

describe("Login do Usuário", () => {
  it("deve fazer o login de um usuário com sucesso", async () => {
    const mockUser = {
      uid: "mockUserId",
      email: "mockUser@example.com",
      displayName: "Mock User",
    };

    // Simula o retorno bem-sucedido da função de login
    const mockSignIn = require("firebase/auth")
      .signInWithEmailAndPassword as jest.Mock;

    mockSignIn.mockResolvedValueOnce({
      user: mockUser,
    });

    // Executa login e verifica se o email do resultado é o esperado
    const result = await Login("mockUser@example.com", "senha123");
    expect(result.email).toBe("mockUser@example.com");
  });
});

describe("Logout do Usuário", () => {
  it("deve fazer o logout do usuário com sucesso", async () => {
    const fakeAuth = {
      // Mock da função signOut para simular logout bem-sucedido
      signOut: jest.fn().mockResolvedValueOnce(undefined),
      currentUser: null,
    };

    // Mock de getAuth retornando o objeto fakeAuth
    const mockGetAuth = require("firebase/auth").getAuth as jest.Mock;
    mockGetAuth.mockReturnValueOnce(fakeAuth);

    // Verifica se o logout resolve como esperado
    await expect(Logout()).resolves.toBe(true);
  });
});

describe("Usuário Online", () => {
  it("deve retornar os dados do usuário autenticado", async () => {
    const mockUser = {
      uid: "mockUserId",
      email: "mockUser@example.com",
      displayName: "Mock User",
    };

    const mockOnStateChanged = jest.fn((callback) => {
      callback(mockUser);
      return jest.fn();
    });

    const mockAuth = require("firebase/auth").getAuth as jest.Mock;
    mockAuth.mockReturnValueOnce({
      onAuthStateChanged: mockOnStateChanged,
    });

    const result = await UsuarioAutenticado();

    expect(result).toEqual({
      email: "mockUser@example.com",
      uid: "mockUserId",
      displayName: "Mock User",
    });
  });
});
