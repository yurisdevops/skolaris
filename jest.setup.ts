jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => {
    return {
      currentUser: {
        uid: "mockUser",
        email: "mocked@example.com",
        displayName: "Test User",
      },
    };
  }),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));
